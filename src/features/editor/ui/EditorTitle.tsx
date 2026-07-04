"use client";

import React from "react";

type EditorTitleProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function EditorTitle({
  value,
  onChange,
  placeholder = "Article title",
  className = "",
}: EditorTitleProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={
        "w-full bg-transparent px-0 py-4 text-5xl font-bold outline-none placeholder:text-muted-foreground " +
        className
      }
    />
  );
}