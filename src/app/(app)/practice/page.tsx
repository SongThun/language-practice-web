"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SessionStep = "select" | "examples" | "write" | "evaluate";

const STEPS: SessionStep[] = ["select", "examples", "write", "evaluate"];

function isAfterStep(current: SessionStep, target: SessionStep): boolean {
  return STEPS.indexOf(current) > STEPS.indexOf(target);
}

function StepIndicator({ currentStep }: { currentStep: SessionStep }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((s, index) => (
        <div key={s} className="flex items-center gap-2">
          {index > 0 && (
            <div
              className={cn(
                "h-px w-8",
                currentStep === s || isAfterStep(currentStep, s)
                  ? "bg-primary"
                  : "bg-border"
              )}
            />
          )}
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors",
              currentStep === s
                ? "bg-primary text-primary-foreground"
                : isAfterStep(currentStep, s)
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <span
            className={cn(
              "text-sm",
              currentStep === s
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function SelectStep({ onNext }: { onNext: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>select words to practice</CardTitle>
        <CardDescription>
          the system will pick words based on your spaced repetition
          schedule. you can also select words manually.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            number of words
          </label>
          <select className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
            <option>3</option>
            <option>5</option>
            <option>7</option>
            <option>10</option>
          </select>
        </div>
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">
            add words to your knowledge base first, then come back to
            practice.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={onNext}>generate examples</Button>
          <Button variant="outline" onClick={() => {}} disabled>
            re-roll selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ExamplesStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>example sentences</CardTitle>
        <CardDescription>
          ai-generated examples to inspire your writing. study these, then
          write your own sentences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          examples will appear here once words are selected and the api is
          connected.
        </div>
        <div className="flex gap-3">
          <Button onClick={onNext}>start writing</Button>
          <Button variant="outline" onClick={onBack}>
            back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function WriteStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>write using your words</CardTitle>
        <CardDescription>
          write sentences or a short story incorporating the selected words.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          rows={8}
          placeholder="start writing here..."
          className="bg-background"
        />
        <div className="flex gap-3">
          <Button onClick={onNext}>submit for evaluation</Button>
          <Button variant="outline" onClick={onBack}>
            back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EvaluateStep({ onRestart }: { onRestart: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>evaluation results</CardTitle>
        <CardDescription>
          ai feedback on your grammar and vocabulary usage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          evaluation results will appear here once the api is connected.
        </div>
        <div className="flex gap-3">
          <Button onClick={onRestart}>practice again</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PracticePage() {
  const [step, setStep] = useState<SessionStep>("select");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">writing practice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          practice using your vocabulary in context
        </p>
      </div>

      <StepIndicator currentStep={step} />

      {step === "select" && (
        <SelectStep onNext={() => setStep("examples")} />
      )}
      {step === "examples" && (
        <ExamplesStep
          onNext={() => setStep("write")}
          onBack={() => setStep("select")}
        />
      )}
      {step === "write" && (
        <WriteStep
          onNext={() => setStep("evaluate")}
          onBack={() => setStep("examples")}
        />
      )}
      {step === "evaluate" && (
        <EvaluateStep onRestart={() => setStep("select")} />
      )}
    </div>
  );
}
