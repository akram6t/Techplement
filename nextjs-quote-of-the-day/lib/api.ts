'use s  erver'

import axios from "axios";
import { handleClientError } from "./api-error";
import { loginSchema, signupSchema } from "./zod";
import { ApiClientResponse } from "@/types";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (
  _prevState: ApiClientResponse,
  formData: FormData,
): Promise<ApiClientResponse> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await loginSchema.parseAsync({ email, password }); // Validate input using Zod schema
    const response = await apiClient.post("/api/auth", {
      action: "login",
      email,
      password,
    });
    return { data: response.data.data };
  } catch (error: unknown) {
    return handleClientError(error);
  }
};

export const signup = async (
  _prevState: ApiClientResponse,
  formData: FormData,
): Promise<ApiClientResponse> => {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signupSchema.parseAsync({ name, email, password }); // Validate input using Zod schema
    const response = await apiClient.post("/api/auth", {
      action: "signup",
      name,
      email,
      password,
    });
    return { data: response.data.data };
  } catch (error: unknown) {
    return handleClientError(error);
  }
};

export const checkSession = async (): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get("/api/auth/session");
    return { data: response.data.data };
  } catch (error) {
    return handleClientError(error);
  }
};

// FOR QUOTES

export const getQuoteOfToday = async (type?: string): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get(`/api/quotes/today?type=${type}`);
    return { data: response.data.data };
  } catch (error) {
    return handleClientError(error);
  }
}

export const getAllQuoteTypes = async (): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get("/api/quotes/quote-types");
    return { data: response.data.data };
  } catch (error) {
    return handleClientError(error);
  }
}

export const getAllAuthors = async (page: number, limit: number): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get(`/api/quotes/authors?page=${page}&limit=${limit}`, {

    });
    return { data: response.data.data };
  } catch (error) {
    return handleClientError(error);
  }
}

export const getAllQuotesByAuthor = async (author: string, page: number, limit: number): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get(`/api/quotes/quotes-by-author?author=${author}&page=${page}&limit=${limit}`);
    return { data: response.data.data };
  } catch (error) {
    return handleClientError(error);
  }
}

export const saveQuote = async (): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.post('/api/quotes/save-quote');
    return { data: response.data.data }
  }catch(error){
    return handleClientError(error);
  }
}

export const getQuoteState = async (): Promise<ApiClientResponse> => {
  try {
    const response = await apiClient.get('/api/quotes/states');    
    return { data: response.data.data }
  }catch(error){
    return handleClientError(error);
  }
}