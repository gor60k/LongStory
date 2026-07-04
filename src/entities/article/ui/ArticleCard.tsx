import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/shared/Button";

interface ArticleCardProps {
	id: string;
	title: string;
	createdAt: number;
	onDelete: (id: string) => void;
}

export function ArticleCard({
															id,
															title,
															createdAt,
															onDelete,
														}: ArticleCardProps) {
	return (
			<article className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md">
				<Link href={`/article/${id}`}>
					<h2 className="mb-2 text-xl font-semibold hover:underline">
						{title || "Без названия"}
					</h2>
				</Link>

				<p className="mb-4 text-sm text-muted-foreground">
					{new Date(createdAt).toLocaleDateString()}
				</p>

				<div className="flex items-center gap-2">
					<Button asChild variant="outline" size="sm">
						<Link href={`/editor/${id}`}>
							<Pencil className="mr-2 h-4 w-4" />
							Редактировать
						</Link>
					</Button>

					<Button
							variant="destructive"
							size="sm"
							onClick={() => onDelete(id)}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Удалить
					</Button>
				</div>
			</article>
	);
}