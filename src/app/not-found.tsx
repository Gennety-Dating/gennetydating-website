import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midnight text-white px-4">
      <h1 className="text-7xl font-bold mb-4 text-magenta">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-magenta text-white font-semibold hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
