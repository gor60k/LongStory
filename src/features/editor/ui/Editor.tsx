"use client";

import { useEffect, useState } from "react";

import {
	Article,
	getArticle,
} from "@/shared/lib/storage/articles";

import ArticleEditor from "./ArticleEditor";


type EditorProps = {
	articleId?: string;
};


export default function Editor({
																 articleId,
															 }: EditorProps) {

	const [article, setArticle] = useState<Article | null>(null);

	const [loaded, setLoaded] = useState(false);


	useEffect(() => {

		if (!articleId) {
			setLoaded(true);
			return;
		}


		const loadedArticle = getArticle(articleId);

		setArticle(loadedArticle ?? null);
		setLoaded(true);

	}, [articleId]);


	if (!loaded) {
		return null;
	}


	return (
			<ArticleEditor
					article={article}
			/>
	);
}