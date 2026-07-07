import { useEffect, useState } from "react";

import {
	getEditorSettings,
	saveEditorSettings,
} from "@/shared/lib/storage/editorSettings";

export function useEditorSettings() {
	const [settings, setSettings] = useState(getEditorSettings);

	useEffect(() => {
		saveEditorSettings(settings);
	}, [settings]);

	const setAutoSave = (value: boolean) => {
		setSettings((prev) => ({
			...prev,
			autoSave: value,
		}));
	};

	return {
		settings,
		autoSave: settings.autoSave,
		setAutoSave,
	};
}