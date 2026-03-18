"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          welcome back, {user?.email}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/words" className="group">
          <Card className="transition-colors hover:ring-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">words</CardTitle>
              <CardDescription>
                manage your vocabulary. add new words, organize by tags, and
                track your progress.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/practice" className="group">
          <Card className="transition-colors hover:ring-primary/30">
            <CardHeader>
              <CardTitle className="text-primary">practice</CardTitle>
              <CardDescription>
                start a writing session. use your words in context and get ai
                feedback on your writing.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Card className="opacity-60">
          <CardHeader>
            <CardTitle className="text-muted-foreground">stats</CardTitle>
            <CardDescription>
              track your learning progress over time. coming soon.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
