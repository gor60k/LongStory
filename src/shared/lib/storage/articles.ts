export type Article = {
	id: string;
	title: string;
	content: any;
	createdAt: number;
};

const KEY = "longstory-articles";

// получить все статьи
export function getArticles(): Article[] {
	if (typeof window === "undefined") return [];

	const raw = localStorage.getItem(KEY);
	return raw ? JSON.parse(raw) : [];
}

// сохранить все статьи
export function saveArticles(articles: Article[]) {
	localStorage.setItem(KEY, JSON.stringify(articles));
}

// получить одну статью
export function getArticle(id: string): Article | undefined {
	return getArticles().find((a) => a.id === id);
}

// создать или обновить статью
export function upsertArticle(article: Article) {
	const articles = getArticles();

	const index = articles.findIndex((a) => a.id === article.id);

	if (index !== -1) {
		articles[index] = article;
	} else {
		articles.push(article);
	}

	saveArticles(articles); // ✅ FIX: используем единый storage
}

// удалить статью
export function deleteArticle(id: string) {
	const articles = getArticles();

	const updated = articles.filter((a) => a.id !== id);

	saveArticles(updated);

	return updated;
}