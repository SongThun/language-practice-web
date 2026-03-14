import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Language Practice
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Build your vocabulary, practice writing, and get AI-powered feedback.
          A multi-language platform for learners who want to actively use the
          words they learn.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/signup"
            className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
