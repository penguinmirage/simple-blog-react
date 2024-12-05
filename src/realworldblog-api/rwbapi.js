export default class ApiService {
  _apiBase = 'https://blog-platform.kata.academy/api';

  async getResource(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      ...options.headers,
      Authorization: token ? `Token ${token}` : undefined,
    };

    const res = await fetch(`${this._apiBase}${url}`, { ...options, headers });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getListOfArticles(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const res = await this.getResource(`/articles?limit=${limit}&offset=${offset}`);
    return {
      articles: res.articles.map(this._transformArticle),
      total: res.articlesCount,
    };
  }

  // async getListOfArticles() {
  //   const res = await this.getResource(`/articles/`);
  //   return res.articles.map(this._transformArticle);
  // }

  async getArticle(slug) {
    const res = await this.getResource(`/articles/${slug}`);
    return this._transformArticle(res.article);
  }

  _transformArticle = (article) => {
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      tags: article.tagList || [],
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

const apiService = new ApiService();
