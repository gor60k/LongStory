import { Extension, type Editor } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

import { insertImage } from "@/features/editor/utils/insertImage";

export const ImageUpload = Extension.create({
	name: "imageUpload",

	addProseMirrorPlugins() {
		const editor = this.editor;

		return [
			new Plugin({
				props: {
					handleDrop(view, event) {
						console.log("DROP");
						return handle(view, event, editor);
					},

					handlePaste(view, event) {
						return handle(view, event, editor);
					},
				},
			}),
		];
	},
});

async function handle(
		view: EditorView,
		event: DragEvent | ClipboardEvent,
		editor: Editor,
) {
	const files =
			event.dataTransfer?.files ??
			event.clipboardData?.files;

	if (!files?.length) return false;

	const images = Array.from(files).filter(file =>
			file.type.startsWith("image/")
	);

	if (!images.length) return false;

	event.preventDefault();

	const coords =
			"clientX" in event
					? view.posAtCoords({
						left: event.clientX,
						top: event.clientY,
					})
					: null;

	const pos = coords?.pos ?? view.state.selection.from;

	for (const file of images) {
		await insertImage(editor, file, pos);
	}

	return true;
}