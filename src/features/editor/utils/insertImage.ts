import type { Editor } from "@tiptap/react";

import { uploadImage } from "@/shared/lib/upload/uploadImage";
import { validateImage } from "@/shared/lib/upload/validateImage";

export async function insertImage(
		editor: Editor,
		file: File,
		position?: number
) {
	const error = validateImage(file);

	if (error) {
		throw new Error(error);
	}

	const src = await uploadImage(file);

	const chain = editor.chain().focus();

	if (position !== undefined) {
		editor
				.chain()
				.focus()
				.insertContentAt(position, {
					type: "image",
					attrs: {
						src,
						alt: file.name,
					},
				})
				.run();

		return;
	}

	editor
			.chain()
			.focus()
			.setImage({
				src,
				alt: file.name,
			})
			.run();
}