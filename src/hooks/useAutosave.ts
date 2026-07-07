import { Editor } from "@tiptap/react";

import { useDraftAutosave } from "./useDraftAutosave";
import { useDraftLoader } from "./useDraftLoader";

export function useAutosave(
  editor: Editor | null,
  enabled = true,
) {
  useDraftLoader(editor);
  useDraftAutosave(editor, enabled);
}