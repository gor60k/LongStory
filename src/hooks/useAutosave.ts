import { useEffect } from "react";
import { Editor } from "@tiptap/react";

const STORAGE_KEY = "longstory-draft";

export function useAutosave(editor: Editor | null) {
	// LOAD
	useEffect(() => {
		if (!editor) return;

		const saved = localStorage.getItem(STORAGE_KEY);

		if (saved) {
			try {
				const json = JSON.parse(saved);
				editor.commands.setContent(json);
			} catch (e) {
				console.error("Failed to load draft", e);
			}
		}
	}, [editor]);

	// SAVE
	useEffect(() => {
		if (!editor) return;

		const handler = () => {
			const json = editor.getJSON();
			localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
		};

		// debounce save
		const interval = setInterval(handler, 1000);

		return () => clearInterval(interval);
	}, [editor]);
}