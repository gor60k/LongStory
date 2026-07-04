"use client";

import { useRef } from "react";
import type { Editor } from "@tiptap/react";
import { Image as ImageIcon } from "lucide-react";

import { validateImage } from '@/shared/lib/upload/validateImage';
import { insertImage } from '@/features/editor/utils/insertImage';

type ImageButtonProps = {
	editor: Editor | null;
};

export default function ImageButton({ editor }: ImageButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleChange = async (
			event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];

		if (!file || !editor) return;

		validateImage(file)

		if (!editor) {
			console.warn("Editor не готов");
			return;
		}

		try {
			const src = await insertImage(editor, file);
		} catch (error) {
			console.error("Failed to upload image:", error);
		} finally {
			// Чтобы можно было повторно выбрать тот же файл
			event.target.value = "";
		}
	};

	console.log(editor);

	return (
			<>
				<button
						type="button"
						onClick={handleClick}
						className="rounded-md p-2 transition hover:bg-muted"
						title="Insert image"
				>
					<ImageIcon className="h-4 w-4" />
				</button>

				<input
						ref={inputRef}
						type="file"
						accept="image/png,image/jpeg,image/webp,image/gif"
						className="hidden"
						onChange={handleChange}
				/>
			</>
	);
}