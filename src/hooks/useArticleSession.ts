import { useEffect, useState } from "react";
import { getArticle } from "@/shared/lib/storage/articles";

export type ArticleSession = {
	id: string | null;
	title: string;
	content: any;
	isNew: boolean;
	loading: boolean;
};

const emptySession: ArticleSession = {
	id: null,
	title: "",
	content: {
		type: "doc",
		content: [
			{
				type: "paragraph",
			},
		],
	},
	isNew: true,
	loading: true,
};

export function useArticleSession(articleId?: string) {
	const [session, setSession] = useState<ArticleSession>(emptySession);

	useEffect(() => {
		if (!articleId) {
			setSession(emptySession);
			return;
		}

		const article = getArticle(articleId);

		if (!article) {
			setSession({
				...emptySession,
				id: articleId,
				isNew: false,
			});
			return;
		}

		setSession({
			id: article.id,
			title: article.title ?? "",
			content: article.content ?? emptySession.content,
			isNew: false,
			loading: false,
		});
	}, [articleId]);

	return session;
}