const SETTINGS_KEY = "editorSettings";

export type EditorSettings = {
  autoSave: boolean;
};

const DEFAULT_SETTINGS: EditorSettings = {
  autoSave: true,
};

export function getEditorSettings(): EditorSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(raw),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveEditorSettings(settings: Partial<EditorSettings>) {
  const next = {
    ...getEditorSettings(),
    ...settings,
  };

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));

  return next;
}