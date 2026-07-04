"use client";

import { EditorContent as TiptapContent, Editor } from "@tiptap/react";

type Props = {
  editor: Editor | null;
};

export default function EditorContent({ editor }: Props) {
  if (!editor) {
    return (
      <div className="min-h-[400px] animate-pulse rounded-lg border p-6 text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  return <TiptapContent editor={editor} />;
}