import { useEffect } from "react";
import { Editor } from "@tiptap/react";

const STORAGE_KEY = "longstory-draft";

export function useDraftLoader(editor: Editor | null) {
	useEffect(() => {
		if (!editor) return;

		const saved = localStorage.getItem(STORAGE_KEY);

		if (!saved) return;

		try {
			editor.commands.setContent(JSON.parse(saved));
		} catch (error) {
			console.error("Failed to load draft", error);
		}
	}, [editor]);
}