"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getArticle } from "@/lib/articles";

export default function ArticlePage() {
	const { id } = useParams<{ id: string }>();

	const [loaded, setLoaded] = useState(false);

	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		content: "<p>Loading...</p>",
	});

	useEffect(() => {
		if (!editor || !id) return;

		const article = getArticle(id);

		if (article) {
			editor.commands.setContent(article.content);
		}

		setLoaded(true);
	}, [editor, id]);

	if (!loaded) {
		return (
				<div className="mx-auto max-w-3xl px-6 py-20 text-muted-foreground">
					Loading...
				</div>
		);
	}

	return (
			<main className="min-h-screen">
				<article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg max-w-none">
					<EditorContent editor={editor} />
				</article>
			</main>
	);
}