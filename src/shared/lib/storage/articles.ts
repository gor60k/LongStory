export type Article = {
	id: string;
	title: string;
	content: any; // TipTap JSON
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
export function getArticle(id: string) {
	return getArticles().find((a) => a.id === id);
}

// создать или обновить статью
export function upsertArticle(article: Article) {
	const articles = getArticles();
	const index = articles.findIndex((a) => a.id === article.id);

	if (index >= 0) {
		articles[index] = article;
	} else {
		articles.unshift(article);
	}

	saveArticles(articles);
}

export function deleteArticle(id: string) {
	const articles = getArticles();

	const updated = articles.filter((a) => a.id !== id);

	localStorage.setItem(KEY, JSON.stringify(updated));

	return updated;
}