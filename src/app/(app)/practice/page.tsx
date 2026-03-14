"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SessionStep = "select" | "examples" | "write" | "evaluate";

export default function PracticePage() {
  const [step, setStep] = useState<SessionStep>("select");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Writing Practice</h1>
        <p className="mt-1 text-sm text-gray-600">
          Practice using your vocabulary in context
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2">
        {(["select", "examples", "write", "evaluate"] as const).map(
          (s, index) => (
            <div key={s} className="flex items-center gap-2">
              {index > 0 && (
                <div
                  className={`h-px w-8 ${
                    step === s || isAfterStep(step, s)
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                />
              )}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  step === s
                    ? "bg-indigo-600 text-white"
                    : isAfterStep(step, s)
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm ${
                  step === s ? "font-medium text-gray-900" : "text-gray-500"
                }`}
              >
                {stepLabel(s)}
              </span>
            </div>
          )
        )}
      </div>

      {/* Step content */}
      {step === "select" && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Select words to practice
          </h2>
          <p className="text-sm text-gray-600">
            The system will pick words based on your spaced repetition schedule.
            You can also select words manually.
          </p>
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of words
              </label>
              <select className="rounded-md border border-gray-300 px-3 py-2 text-sm">
                <option>3</option>
                <option>5</option>
                <option>7</option>
                <option>10</option>
              </select>
            </div>
          </div>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-sm text-gray-500">
              Add words to your knowledge base first, then come back to
              practice.
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setStep("examples")}>
              Generate examples
            </Button>
            <Button variant="secondary">Re-roll selection</Button>
          </div>
        </div>
      )}

      {step === "examples" && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Example sentences
          </h2>
          <p className="text-sm text-gray-600">
            AI-generated examples to inspire your writing. Study these, then
            write your own sentences.
          </p>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            Examples will appear here once words are selected and the API is
            connected.
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setStep("write")}>Start writing</Button>
            <Button variant="secondary" onClick={() => setStep("select")}>
              Back
            </Button>
          </div>
        </div>
      )}

      {step === "write" && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Write using your words
          </h2>
          <p className="text-sm text-gray-600">
            Write sentences or a short story incorporating the selected words.
          </p>
          <Textarea
            rows={8}
            placeholder="Start writing here..."
          />
          <div className="flex gap-3">
            <Button onClick={() => setStep("evaluate")}>
              Submit for evaluation
            </Button>
            <Button variant="secondary" onClick={() => setStep("examples")}>
              Back
            </Button>
          </div>
        </div>
      )}

      {step === "evaluate" && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Evaluation results
          </h2>
          <p className="text-sm text-gray-600">
            AI feedback on your grammar and vocabulary usage.
          </p>
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            Evaluation results will appear here once the API is connected.
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setStep("select")}>Practice again</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const stepOrder: SessionStep[] = ["select", "examples", "write", "evaluate"];

function isAfterStep(current: SessionStep, target: SessionStep): boolean {
  return stepOrder.indexOf(current) > stepOrder.indexOf(target);
}

function stepLabel(step: SessionStep): string {
  switch (step) {
    case "select":
      return "Select";
    case "examples":
      return "Examples";
    case "write":
      return "Write";
    case "evaluate":
      return "Evaluate";
  }
}
