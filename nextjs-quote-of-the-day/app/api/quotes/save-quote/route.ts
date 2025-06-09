import { NextRequest, NextResponse } from "next/server";
import { RedisClient } from "@/lib/upstash";
import { getSecondsUntilMidnight, getUniqueDateKey } from "@/lib/helpers";
import { Quote, QuoteState } from "@/types/quote";
import { getAuthCookie, verifyToken } from "@/lib/auth";
import { User } from "@/types";

export async function POST(request: NextRequest) {
    try {
        const token = await getAuthCookie();
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const user = await verifyToken(token) as User;
        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const type = request?.nextUrl?.searchParams.get('type') as string || "";

        const redis = new RedisClient();
        const eachDayUniqueKey = getUniqueDateKey();
        const quoteKey = `quotes:${eachDayUniqueKey}-${type}`;
        const savedSetKey = `saved:${eachDayUniqueKey}-${type}`;
        const stateKey = `states:${eachDayUniqueKey}`;

        // Use Redis transaction to ensure atomic operations
        // const multi = redis.multi();
        
        // Check if quote exists
        const cachedQuote = await redis.get(quoteKey) as Quote;
        if (!cachedQuote) {
            return NextResponse.json(
                { error: "Quote not found" },
                { status: 404 },
            );
        }

        // Check if user already saved the quote
        const isUserAlreadySaved = await redis.sismember(savedSetKey, user.id);        
        
        if (isUserAlreadySaved) {
            // Remove user from saved set
            await redis.srem(savedSetKey, user.id);
            await redis.hincrby(stateKey, "totalTodaySaved", -1)
            cachedQuote.isSavedByUser = false;
        } else {
            // Add user to saved set
            await redis.sadd(savedSetKey, user.id);
            await redis.expire(savedSetKey, getSecondsUntilMidnight());
            await redis.hincrby(stateKey, "totalTodaySaved", 1)
            cachedQuote.isSavedByUser = true;
        }

        // Get updated count
        const updatedSaveCount = await redis.scard(savedSetKey);
        cachedQuote.totalSaves = updatedSaveCount;

        // Update the quote with new save status and count
        await redis.set(quoteKey, JSON.stringify(cachedQuote), {
            ex: getSecondsUntilMidnight() // Make sure to set expiration here too
        });

        return NextResponse.json(
            { 
                data: {
                    ...cachedQuote,
                    totalSaves: updatedSaveCount,
                    isSavedByUser: !isUserAlreadySaved
                } 
            },
            { status: 200 },
        );

    } catch (error) {
        console.error("Save quote error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}