export async function uploadImage(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				reject(new Error("Invalid image result"));
			}
		};

		reader.onerror = () => {
			reject(new Error("FileReader failed"));
		};

		reader.readAsDataURL(file);
	});
}