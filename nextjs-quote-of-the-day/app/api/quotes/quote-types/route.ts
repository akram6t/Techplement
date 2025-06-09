import { NextRequest, NextResponse } from "next/server";
import { RapidClient } from "@/lib/rapid-api";
import { RedisClient } from "@/lib/upstash";

export async function GET(request: NextRequest) {
    try {

        const quoteTypesKey = "types";

        const redis = new RedisClient();
        const cachedTypes = await redis.get(quoteTypesKey);
        if(cachedTypes){
            return NextResponse.json(
                { data: cachedTypes },
                { status: 200 },
            );   
        }

        const rapidClient = new RapidClient();

        const { error, data } = await rapidClient.quoteTypes();
        await redis.set(quoteTypesKey, JSON.stringify(data.types));

        if (error) {
            return NextResponse.json(
                { error: error },
                { status: 500 },
            );
        }

        // console.log("types:", data);
        

        return NextResponse.json(
            { data: data.types },
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