"use client";

import { login } from "@/lib/api";
import {
  ChangeEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { updateSession } = useAuth();
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(login, {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      dispatch(formData);
    });
  };

  // Handle successful signup with useEffect
  useEffect(() => {
    if (state?.data?.user) {
      toast.success("Login successful!");
      updateSession().then(() => {
        router.push('/');
      })
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              // value={user.email}
              // onChange={onHandleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              // value={user.password}
              // onChange={onHandleChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {/* forgot password */}
          <div className="mb-4">
            <a
              href="/auth/forgot-password"
              className="text-sm text-purple-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {isPending ? "Loading..." : "Login"}
          </button>

          {state.error && <p className="mt-2 text-red-500">{state.error}</p>}

          <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-purple-400 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
