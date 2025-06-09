import { NextRequest, NextResponse } from "next/server";
import { RapidClient } from "@/lib/rapid-api";
import { RedisClient } from "@/lib/upstash";
import { generateUniqeId, getSecondsUntilMidnight, getUniqueDateKey } from "@/lib/helpers";
import { Quote, QuoteState } from "@/types/quote";
import { getAuthCookie, verifyToken } from "@/lib/auth";
import { User } from "@/types";

export async function GET(request: NextRequest) {
    try {

        let userId = null;

        const token = await getAuthCookie();
        if (token) {
            const user = await verifyToken(token) as User;
            userId = user.id;
        }

        const quoteType = request?.nextUrl?.searchParams.get('type') as string || "";

        const redis = new RedisClient();
        const eachDayUniqeKey = getUniqueDateKey();
        const quoteKey = `quotes:${eachDayUniqeKey}-${quoteType}`;
        const savedSetKey = `saved:${eachDayUniqeKey}-${quoteType}`;
        const stateKey = `states:${eachDayUniqeKey}`;

        const cachedQuote = await redis.get(quoteKey) as Quote;        

        if (cachedQuote) {
            if(userId){
                const isSelfSaved = await redis.sismember(savedSetKey, String(userId));
                cachedQuote.isSavedByUser = isSelfSaved !== 0
            }else{
                cachedQuote.isSavedByUser = false;
            }
            // const parseQuote = JSON.parse(cachedQuote);        
            await redis.hincrby(stateKey, "totalTodayViews", 1);

            return NextResponse.json(
                { data: cachedQuote },
                { status: 200 },
            );

        }

        const rapidClient = new RapidClient();
        const { error, data } = await rapidClient.generateQuote(quoteType);

        if (error) {
            return NextResponse.json(
                { error: error },
                { status: 500 },
            );
        }

        await redis.set(quoteKey, JSON.stringify(data), { ex: getSecondsUntilMidnight() });

        // for managing state
        await redis.hmset(stateKey, {
            totalTodaySaved: 0,
            totalTodayViews: 0
        } as QuoteState)

        return NextResponse.json(
            { data },
            { status: 200 },
        );

    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}