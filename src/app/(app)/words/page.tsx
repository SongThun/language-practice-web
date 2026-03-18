"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WordsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("");
  const [definition, setDefinition] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send to API
    console.log({ word, language, definition, tags: tags.split(",").map((t) => t.trim()).filter(Boolean) });
    setWord("");
    setLanguage("");
    setDefinition("");
    setTags("");
    setShowAddForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">words</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            your personal vocabulary knowledge base
          </p>
        </div>
        <Button
          variant={showAddForm ? "outline" : "default"}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "cancel" : "add word"}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>add a new word</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="word">word or phrase</Label>
                  <Input
                    id="word"
                    type="text"
                    required
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    placeholder="e.g., ubiquitous"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">language</Label>
                  <Input
                    id="language"
                    type="text"
                    required
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="e.g., english"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="definition">definition or translation</Label>
                <Textarea
                  id="definition"
                  rows={2}
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  placeholder="your own definition or translation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">tags</Label>
                <Input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="comma-separated, e.g., academic, formal"
                />
              </div>
              <Button type="submit">save word</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search and filter bar */}
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="search words..."
          className="flex-1"
        />
        <select className="rounded-lg border border-input bg-card px-3 py-1.5 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring">
          <option value="">all languages</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
        <p className="text-sm text-muted-foreground">
          no words yet. click &quot;add word&quot; to start building your
          vocabulary.
        </p>
      </div>
    </div>
  );
}
