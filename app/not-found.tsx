"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 text-white">
      {/* Glow effects */}
      <div className="absolute left-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute bottom-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[120px]" />

      {/* Main Card */}
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/10 bg-white/10 p-10 shadow-[0_0_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Floating 404 */}
        <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-center text-8xl font-black tracking-tight text-transparent md:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-center text-3xl font-bold md:text-4xl">
          Lost in the digital universe 🚀
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-center text-slate-300">
          The page you’re looking for doesn’t exist, got moved, or took a coffee
          break ☕.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => router.push("/register")}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 active:scale-95"
          >
            🏠 Go Dashboard
          </button>

          <button
            onClick={() => router.back()}
            className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            ← Go Back
          </button>
        </div>

        {/* Bottom Text */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Error code: 404 • Page not found
        </p>
      </div>
    </div>
  );
}
