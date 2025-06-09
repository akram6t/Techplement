import { ApiClientResponse } from "@/types";
import axios, { AxiosError } from "axios";
import { ZodError } from "zod";

export const handleClientError = (error: unknown): ApiClientResponse => {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    // Return the first validation error message
    const firstError = error.errors[0];
    const field = firstError.path.join('.');
    return { 
      error: `Invalid ${field}: ${firstError.message.toLowerCase()}`
    };
  }

  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with error status
      const responseData = axiosError.response.data as any;
      
      // Try to extract server-provided error message
      if (typeof responseData === 'object' && responseData.error) {
        return { error: responseData.error };
      }
      if (typeof responseData === 'string') {
        return { error: responseData };
      }
      
      // Fallback messages based on status code
      switch (axiosError.response.status) {
        case 400: return { error: "Invalid request" };
        case 401: return { error: "Please sign in to continue" };
        case 403: return { error: "You don't have permission for this action" };
        case 404: return { error: "Resource not found" };
        case 429: return { error: "Too many requests, please try again later" };
        default: return { error: "Request failed" };
      }
    } 
    
    if (axiosError.request) {
      return { error: "Server is not responding, please try again later" };
    }
    
    return { error: "Network error, please check your connection" };
  }

  // Handle generic Error instances
  if (error instanceof Error) {
    return { error: error.message };
  }

  // Fallback for unknown error types
  return { error: "Something went wrong, please try again" };
}