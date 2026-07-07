"use client";


import { useState } from "react";

import EditorTitle from "@/features/editor/ui/EditorTitle";
import EditorToolbar from "@/features/editor/ui/EditorToolbar";
import EditorContent from "@/features/editor/ui/EditorContent";

import {
	Article,
} from "@/shared/lib/storage/articles";

import {
	useRichEditor,
} from "@/hooks/useRichEditor";


type Props = {
	article: Article | null;
};


export default function ArticleEditor({
																				article,
																			}: Props) {

	const [title, setTitle] = useState(
			article?.title ?? ""
	);


	const editor = useRichEditor({
		content: article?.content ?? "<p></p>",
	});


	return (
			<main>

				<EditorTitle
						value={title}
						onChange={setTitle}
				/>


				<EditorToolbar
						editor={editor}
				/>


				<EditorContent
						editor={editor}
				/>

			</main>
	);
}