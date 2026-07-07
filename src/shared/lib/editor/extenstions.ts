import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { ImageUpload } from '@/shared/lib/editor/ImageUpload';

export const editorExtensions = [
	StarterKit.configure({
		heading: {
			levels: [1, 2, 3],
		},
	}),
	Image,
	ImageUpload,
];