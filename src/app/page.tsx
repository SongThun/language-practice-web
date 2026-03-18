import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          language practice
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          build your vocabulary, practice writing, and get ai-powered feedback.
          a multi-language platform for active learners.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/signup">
            <Button size="lg">get started</Button>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
