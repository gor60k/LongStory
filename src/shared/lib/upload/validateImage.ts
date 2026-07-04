export function validateImage(file: File): string | null {
	if (!file.type.startsWith('image/')) {
		return "Загружать можно только изображения";
	}

	if (file.size > 10 * 1024 * 1024) {
		return "Изображение должно быть меньше 10MB";
	}

	return null
}