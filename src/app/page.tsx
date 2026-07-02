"use client";

import Link from "next/link";
import { getArticles, deleteArticle } from "@/lib/articles";
import { useEffect, useState } from "react";

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

					{articles.map((a: any) => (
						<div
							key={a.id}
							className="flex items-center justify-between rounded border p-4 hover:bg-muted"
						>
							<div className="min-w-0">
								<div className="font-semibold truncate">
									{a.title || "Untitled"}
								</div>
								<div className="text-sm text-muted-foreground">
									{new Date(a.createdAt).toLocaleString()}
								</div>
							</div>
							<div className="flex items-center gap-3 shrink-0">
								<Link
										href={`/article/${a.id}`}
										className="text-sm text-muted-foreground hover:text-foreground"
								>
									View
								</Link>

								<Link
										href={`/editor/${a.id}`}
										className="text-sm text-blue-500 hover:underline"
								>
									Edit
								</Link>

								<button
										onClick={() => {
												if (confirm("Удалить эту статью?")) {
													handleDelete(a.id);
												}
											}
										}
										className="text-sm text-red-500 hover:underline"
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
	);
}