"use client";

import { signup } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ChangeEvent, startTransition, useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(signup, {});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle signup logic here
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      dispatch(formData);
    });
  };

  // Handle successful signup with useEffect
  useEffect(() => {
    if (state?.data?.user) {
      toast.success("Signup successful!");
      router.push("/auth/login");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              name="name"
              // value={user.name}
              // onChange={onHandleChange}
              type="text"
              id="name"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
              // value={user.password}
              // onChange={onHandleChange}
              type="password"
              id="password"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {isPending ? "Creating..." : "Signup"}
          </button>

          {state.error && <p className="mt-2 text-red-600">{state.error}</p>}
          <p className="mt-4 text-sm text-gray-400">
            Already have an account?
            <button className="text-purple-400 hover:underline"></button>
          </p>
        </form>
      </div>
    </div>
  );
}
