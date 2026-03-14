"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
          <h1 className="text-2xl font-bold text-gray-900">Words</h1>
          <p className="mt-1 text-sm text-gray-600">
            Your personal vocabulary knowledge base
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Cancel" : "Add word"}
        </Button>
      </div>

      {showAddForm && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add a new word
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="word"
                  className="block text-sm font-medium text-gray-700"
                >
                  Word or phrase
                </label>
                <Input
                  id="word"
                  type="text"
                  required
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="e.g., ubiquitous"
                />
              </div>
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <Input
                  id="language"
                  type="text"
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  placeholder="e.g., English"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="definition"
                className="block text-sm font-medium text-gray-700"
              >
                Definition or translation
              </label>
              <Textarea
                id="definition"
                rows={2}
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Your own definition or translation"
              />
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <Input
                id="tags"
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Comma-separated, e.g., academic, formal"
              />
            </div>
            <Button type="submit">Save word</Button>
          </form>
        </div>
      )}

      {/* Search and filter bar */}
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search words..."
          className="flex-1"
        />
        <select className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <option value="">All languages</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
        <p className="text-sm text-gray-500">
          No words yet. Click &quot;Add word&quot; to start building your
          vocabulary.
        </p>
      </div>
    </div>
  );
}
