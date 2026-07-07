import type { Editor } from "@tiptap/core";

import {
	type Article,
	upsertArticle,
	getArticle,
} from "@/shared/lib/storage/articles";

export type SaveArticleParams = {
	id: string;
	title: string;
	editor: Editor;
};

export function saveArticle({id, title, editor}: SaveArticleParams): Article {
	const existing = getArticle(id);

	const article: Article = {
		id,
		title: title.trim() || "Без названия",
		content: editor.getJSON(),
		createdAt: existing?.createdAt ?? Date.now(),
	};

	upsertArticle(article);

	return article;
}