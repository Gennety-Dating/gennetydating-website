"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-8 text-center max-w-md">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-[#8B253B] text-white font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
