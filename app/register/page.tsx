"use client";

import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/redux/services/authApi";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const user = z.object({
    username: z.string().min(3, "Username too short"),

    email: z.string().email("Invalid email"),

    password: z.string().min(3, "Password too short"),
  });

  type User = z.infer<typeof user>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(user),
  });

  const submitted = async (data: User) => {
    try {
      await registerUser(data).unwrap();

      console.log("success");

      router.push("/login");
    } catch (error) {
      console.log(error);
      console.log("register failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Create Account 🚀
          </h1>

          <p className="mt-2 text-slate-300">Register to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submitted)} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Username
            </label>

            <input
              id="username"
              {...register("username")}
              placeholder="Enter username"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
            />

            {errors.username && (
              <p className="mt-2 text-sm text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Register 🚀"}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-slate-300">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer font-semibold text-cyan-400 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
