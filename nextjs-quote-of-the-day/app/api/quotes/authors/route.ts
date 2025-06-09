import { NextRequest, NextResponse } from "next/server";
import { RapidClient } from "@/lib/rapid-api";

export async function GET(request: NextRequest) {
    try {

        const string_page = request?.nextUrl?.searchParams.get('page') as string || "1";
        const string_limit = request?.nextUrl?.searchParams.get('limit') as string || "10";

        const page = parseInt(string_page);
        const limit = parseInt(string_limit);

        const rapidClient = new RapidClient();

        const { error, data } = await rapidClient.authors(page, limit);

        if (error) {
            return NextResponse.json(
                { error: error },
                { status: 500 },
            );
        }

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