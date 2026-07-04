"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import { getArticle } from "@/shared/lib/storage/articles";
import { useRichEditor } from '@/hooks/useRichEditor';

export default function ArticlePage() {
	const { id } = useParams<{ id: string }>();

	const [loaded, setLoaded] = useState(false);

	const article = getArticle(id);

	const editor = useRichEditor({
		editable: false,
		content: "<p>Loading...</p>"
	})

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
				<article className="mx-auto px-6 py-6 prose prose-lg max-w-1/2">
					<div className="text-sm text-muted-foreground">
						{new Date(article?.createdAt || "").toLocaleString()}
					</div>
					<EditorContent editor={editor} />
				</article>
			</main>
	);
}