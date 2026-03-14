"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.email}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/words"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-900">Words</h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your vocabulary. Add new words, organize by tags, and track
            your progress.
          </p>
        </Link>

        <Link
          href="/practice"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-900">Practice</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start a writing session. Use your words in context and get AI
            feedback on your writing.
          </p>
        </Link>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Stats</h2>
          <p className="mt-2 text-sm text-gray-600">
            Track your learning progress over time. Coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
