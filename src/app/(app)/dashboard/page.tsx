"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dashboardCards = [
  { href: "/words", title: "words", description: "manage your vocabulary. add new words, organize by tags, and track your progress.", enabled: true },
  { href: "/practice", title: "practice", description: "start a writing session. use your words in context and get ai feedback on your writing.", enabled: true },
  { href: "#", title: "stats", description: "track your learning progress over time. coming soon.", enabled: false },
];

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
        {dashboardCards.map((card) =>
          card.enabled ? (
            <Link key={card.href} href={card.href} className="group">
              <Card className="transition-colors hover:ring-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <Card key={card.title} className="opacity-60">
              <CardHeader>
                <CardTitle className="text-muted-foreground">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
