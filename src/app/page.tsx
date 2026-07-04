"use client";

import Link from "next/link";
import { getArticles, deleteArticle } from "@/shared/lib/storage/articles";
import { useEffect, useState } from "react";
import { ArticleCard } from '@/entities/article/ui/ArticleCard';

export default function Home() {
	const [articles, setArticles] = useState([]);

	const handleDelete = (id: string) => {
		const updated = deleteArticle(id);
		setArticles(updated);
	};

	useEffect(() => {
		setArticles(getArticles());
	}, []);

	return (
			<main className="mx-auto max-w-3xl px-6 py-16">
				<h1 className="text-4xl font-bold">LongStory</h1>

				<Link
						href="/editor"
						className="mt-6 inline-block text-blue-500"
				>
					+ New article
				</Link>

				<div className="mt-10 space-y-4">
					{articles.length === 0 && (
							<p className="text-muted-foreground">
								No articles yet
							</p>
					)}

					{articles.map((article: any) => (
						<ArticleCard
								key={article.id}
								id={article.id}
								title={article.title}
								createdAt={article.createdAt}
								onDelete={handleDelete}
							/>
					))}
				</div>
			</main>
	);
}