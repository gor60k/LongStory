"use client";

import { Editor } from "@tiptap/react";
import { Bold, Italic, Heading1, Heading2, List, Quote } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import ImageButton from '@/features/editor/ui/Toolbar/ImageButton';

type Props = {
	editor: Editor | null;
};

export default function EditorToolbar({ editor }: Props) {
	if (!editor) return null;

	const buttonClass = (active: boolean) =>
			cn(
					"p-2 rounded-md hover:bg-muted transition",
					active && "bg-muted text-primary"
			);

	return (
			<div className="flex items-center gap-1 rounded-lg border p-2">
				{/* Bold */}
				<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={buttonClass(editor.isActive("bold"))}
						type="button"
				>
					<Bold size={18} />
				</button>

				{/* Italic */}
				<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={buttonClass(editor.isActive("italic"))}
						type="button"
				>
					<Italic size={18} />
				</button>

				{/* H1 */}
				<button
						onClick={() =>
								editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						className={buttonClass(editor.isActive("heading", { level: 1 }))}
						type="button"
				>
					<Heading1 size={18} />
				</button>

				{/* H2 */}
				<button
						onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={buttonClass(editor.isActive("heading", { level: 2 }))}
						type="button"
				>
					<Heading2 size={18} />
				</button>

				{/* Bullet list */}
				<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={buttonClass(editor.isActive("bulletList"))}
						type="button"
				>
					<List size={18} />
				</button>

				{/* Quote */}
				<button
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={buttonClass(editor.isActive("blockquote"))}
						type="button"
				>
					<Quote size={18} />
				</button>

				<ImageButton editor={editor} />
			</div>
	);
}