export default class ApiService {
  _apiBase = 'https://blog-platform.kata.academy/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getListOfArticles() {
    const res = await this.getResource(`/articles/`);
    return res.articles.map(this._transformArticle); // Fixed to use `articles` instead of `results`.
  }

  async getArticle(slug) {
    const res = await this.getResource(`/articles/${slug}`); // Use `slug` as the correct variable for the API path.
    return this._transformArticle(res.article); // Correctly transform the fetched article object.
  }

  _transformArticle = (article) => {
    return {
      id: article.id, // Fixed to access properties from `article`.
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      tags: article.tagList || [], // `tagList` in API response, default to empty array if undefined.
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
      author: {
        username: article.author.username,
        bio: article.author.bio,
        image: article.author.image,
        following: article.author.following,
      },
    };
  };
}

// Example of how to use this service:
const apiService = new ApiService();
