"use client";

import { useParams } from "next/navigation";
import Editor from '@/features/editor/ui/Editor';

export default function EditArticlePage() {
	const { id } = useParams<{ id: string }>();

	return (
			<main className="min-h-screen bg-background">
				<Editor articleId={id}/>
			</main>
	);
}