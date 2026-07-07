import { useEditor } from "@tiptap/react";
import { useEffect, useRef } from "react";

import { editorExtensions } from "@/shared/lib/editor/extenstions";

type UseRichEditorProps = {
	content?: string | object;
	editable?: boolean;
	onUpdate?: Parameters<typeof useEditor>[0]["onUpdate"];
};

export function useRichEditor({
																content,
																editable = true,
																onUpdate,
															}: UseRichEditorProps) {

	return useEditor({
		extensions: editorExtensions,
		content,
		editable,
		onUpdate,
	});
}