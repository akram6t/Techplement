import { NextRequest, NextResponse } from "next/server";
import { RapidClient } from "@/lib/rapid-api";
import { RedisClient } from "@/lib/upstash";
import { generateUniqeId, getSecondsUntilMidnight, getUniqueDateKey } from "@/lib/helpers";
import { Quote, QuoteState } from "@/types/quote";
import { getAuthCookie, verifyToken } from "@/lib/auth";
import { User } from "@/types";

export async function GET(request: NextRequest) {
    try {
        const redis = new RedisClient();
        const eachDayUniqueKey = getUniqueDateKey();
        const stateKey = `states:${eachDayUniqueKey}`;

        const state = await redis.hgetall(stateKey) as QuoteState;
        if(!state){
            const obj:QuoteState = {
                totalTodaySaved: 0,
                totalTodayViews: 0
            }

            return NextResponse.json(
                { data:  obj},
                { status: 200 },
            );
        }

        return NextResponse.json(
            { data:  state},
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