import { useEditor } from '@tiptap/react';
import { editorExtensions } from '@/shared/lib/editor/extenstions';

type UseRichEditorProps = {
	content?: string | object;
	editable?: boolean;
	onUpdate?: Parameters<typeof useEditor>[0]['onUpdate'];
};

export function useRichEditor({content = "<p>Просто начни писать</p>", editable = true, onUpdate}: UseRichEditorProps) {
	const editor = useEditor({
		extensions: editorExtensions,
		content,
		editable,
		onUpdate,
	});

	return editor;
}