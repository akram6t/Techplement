import { ApiClientResponse } from "@/types";
import axios, { Axios } from "axios";
import { handleClientError } from "./api-error";


const RAPID_API_BASE_URL = process.env.RAPID_API_BASE_URL!;
const RAPID_API_KEY = process.env.RAPID_API_KEY!;
const RAPID_API_HOST = process.env.RAPID_API_HOST!;

export class RapidClient {
    private client: Axios

    constructor(){
        this.client = axios.create({
            baseURL: RAPID_API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        })
    }

    async generateQuote(quotetype?: string): Promise<ApiClientResponse> {
        try{
            if(quotetype !== ""){
                const response = await this.client.get(`/quotes/random?type=${quotetype}`);
                return { data: response.data }
            }else{
                const response = await this.client.get(`/quotes`);
                return { data: response.data }
            }
        }
        catch(err){
            console.log("Rapid api error:", err)
            return handleClientError(err)
        }
    }

    async quoteTypes(): Promise<ApiClientResponse> {
        try{
                const response = await this.client.get(`/type`);
                return { data: response.data }
        }
        catch(err){
            console.log("Rapid api error:", err)
            return handleClientError(err)
        }
    }

    async authors(page: number, limit: number): Promise<ApiClientResponse> {
        try{
                const response = await this.client.get(`/author?page=${page}&limit=${limit}`);
                return { data: response.data }
        }
        catch(err){
            console.log("Rapid api error:", err)
            return handleClientError(err)
        }
    }

    async quotesByAuthor(author: string, page: number, limit: number): Promise<ApiClientResponse> {
        try{
                const response = await this.client.get(`/quotes/author/${author}?page=${page}&limit=${limit}`);
                return { data: response.data }
        }
        catch(err){
            console.log("Rapid api error:", err)
            return handleClientError(err)
        }
    }

}