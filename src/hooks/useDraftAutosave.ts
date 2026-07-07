import { useEffect } from "react";
import { Editor } from "@tiptap/react";

const STORAGE_KEY = "longstory-draft";

export function useDraftAutosave(
		editor: Editor | null,
		enabled = true,
		interval = 1000,
) {
	useEffect(() => {
		if (!editor || !enabled) return;

		const saveDraft = () => {
			localStorage.setItem(
					STORAGE_KEY,
					JSON.stringify(editor.getJSON()),
			);
		};

		const timer = window.setInterval(saveDraft, interval);

		return () => window.clearInterval(timer);
	}, [editor, enabled, interval]);
}