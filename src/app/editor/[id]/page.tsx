"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { getArticle, upsertArticle } from "@/lib/articles";
import EditorContent from "@/components/editor/EditorContent";
import EditorToolbar from "@/components/editor/EditorToolbar";
import EditorTitle from "@/components/editor/EditorTitle";

export default function EditArticlePage() {
	const { id } = useParams<{ id: string }>();

	const [title, setTitle] = useState("");

	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Loading...</p>",
	});

	// LOAD ARTICLE
	useEffect(() => {
		if (!editor || !id) return;

		const article = getArticle(id);

		if (article) {
			setTitle(article.title || "");
			editor.commands.setContent(article.content);
		}
	}, [editor, id]);

	// AUTO SAVE
	useEffect(() => {
		if (!editor || !id) return;

		const interval = setInterval(() => {
			upsertArticle({
				id,
				title,
				content: editor.getJSON(),
				createdAt: Date.now(),
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [editor, id, title]);

	return (
			<main className="mx-auto max-w-3xl px-6 py-12">
				<EditorTitle value={title} onChange={setTitle} />

				<EditorToolbar editor={editor} />

				<div className="mt-8 rounded border p-4">
					<EditorContent editor={editor} />
				</div>
			</main>
	);
}