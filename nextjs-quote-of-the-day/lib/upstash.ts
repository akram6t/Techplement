import { Redis, SetCommandOptions } from "@upstash/redis";

const UPSTASH_URL = process.env.UPSTASH_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_TOKEN;

export class RedisClient {
    private client: Redis;

    constructor() {
        if (!UPSTASH_URL || !UPSTASH_TOKEN) {
            throw new Error("Upstash Redis credentials not configured");
        }

        this.client = new Redis({
            url: UPSTASH_URL,
            token: UPSTASH_TOKEN
        });
    }

    // Basic Key-Value operations
    async set<T>(key: string, val: T, opt?: SetCommandOptions): Promise<unknown> {
        return await this.client.set(key, val, opt);
    }

    async get<T>(key: string): Promise<T | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<number> {
        return await this.client.del(key);
    }

    // Set operations
    async sadd(key: string, member: string | number): Promise<number> {
        return await this.client.sadd(key, member);
    }

    async scard(key: string): Promise<number> {
        return await this.client.scard(key);
    }

    async sismember(key: string, member: string | number): Promise<number> {
        return await this.client.sismember(key, member);
    }

    async smembers(key: string): Promise<string[]> {
        return await this.client.smembers(key);
    }

    async srem(key: string, member: string | number): Promise<number> {
        return await this.client.srem(key, member);
    }

    async expire(key: string, seconds: number): Promise<number> {
        return await this.client.expire(key, seconds);
    }

    // HashMap (Hash) operations
    async hset(key: string, field: string, value: any): Promise<number> {
        return await this.client.hset(key, { [field]: value });
    }

    async hmset(key: string, data: Record<string, any>): Promise<unknown> {
        return await this.client.hset(key, data);
    }

    async hget<T>(key: string, field: string): Promise<T | null> {
        return await this.client.hget(key, field);
    }

    async hgetall(key: string): Promise<unknown> {
        return await this.client.hgetall(key);
    }

    async hexists(key: string, field: string): Promise<number> {
        return await this.client.hexists(key, field);
    }

    async hincrby(key: string, field: string, increment: number): Promise<number> {
        return await this.client.hincrby(key, field, increment);
    }
}