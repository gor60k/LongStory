"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import { useMemo } from "react";
import { upsertArticle } from "@/lib/articles";
import { useAutosave } from '@/hooks/useAutosave';
import StarterKit from "@tiptap/starter-kit";

import EditorTitle from "@/components/editor/EditorTitle";
import EditorToolbar from "@/components/editor/EditorToolbar";
import EditorContent from "@/components/editor/EditorContent";

export default function Editor() {
	const [title, setTitle] = useState("");
	const articleId = useMemo(() => crypto.randomUUID(), []);

	const [saveStatus, setSaveStatus] = useState<
			"idle" | "saving" | "saved" | "error"
	>("idle");
	const isDirty = saveStatus === "idle";

	const router = useRouter();

	const handleSave = async () => {
		if (!editor) return;

		try {
			setSaveStatus("saving");

			await upsertArticle({
				id: articleId,
				title,
				content: editor.getJSON(),
				createdAt: Date.now(),
			});

			setSaveStatus("saved");

			setTimeout(() => {
				setSaveStatus("idle");
			}, 1500);
		} catch (e) {
			setSaveStatus("error");
		}
	};
	const handleExit = () => {
		handleSave();
		router.push("/");
	};

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
			}),
		],
		content: "<p>Start writing...</p>",
		onUpdate: () => {setSaveStatus("idle")},
	});

	useAutosave(editor);

	return (
			<main>
				<div className="mx-auto max-w-3xl px-6 py-12">
					<header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
						<div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">

							{/* LEFT */}
							<button
									onClick={handleExit}
									className="text-sm text-muted-foreground hover:text-foreground"
							>
								← Back
							</button>

							{/* CENTER */}
							<div className="text-sm font-medium">
								LongStory
							</div>

							{/* RIGHT */}
							<div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">
        {saveStatus === "saving" && "Saving..."}
				{saveStatus === "saved" && "Saved"}
				{saveStatus === "idle" && "Editing"}
      </span>

								<button
										onClick={handleSave}
										className="rounded bg-black px-3 py-1 text-xs text-white"
								>
									Publish
								</button>
							</div>

						</div>
					</header>
					<EditorTitle value={title} onChange={setTitle} />

					<button
							onClick={handleSave}
							disabled={saveStatus === "saving"}
							className="rounded bg-black px-3 py-1 text-white disabled:opacity-50"
					>
						{saveStatus === "saving" && "Saving..."}
						{saveStatus === "saved" && "Saved ✓"}
						{saveStatus === "error" && "Error"}
						{saveStatus === "idle" && "Save"}
					</button>

					<EditorToolbar editor={editor} />

					<div className="mt-8 rounded-lg border p-4">
						<EditorContent editor={editor} />
					</div>
				</div>
			</main>
	);
}