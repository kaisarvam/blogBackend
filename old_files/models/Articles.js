

class Article {
  constructor(articles) {
    this.articles = articles;
    //this.init();
  }
  async create(article,databaseConnection) {
    article.id = this.articles.length + 1;
    article.createdAt = new Date().toISOString();
    article.updatedAt = new Date().toISOString();
    this.articles.push(article);
    databaseConnection.db.articles = this.articles;
    await databaseConnection.writeDB();
    return article;
  }
  async find() {
    return this.articles;
  }

  async findbyId(id) {
    const item = this.articles.find((article) => article.id === id);
    return item;
  }

  async findByProp(prop) {
    const item = this.articles.find((article) => article[prop] == prop);
    return item;
  }

  async search(searchTerm) {
    const item = this.articles.filter((article) => {
      return article.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return item;
  }

  async sort(sortType = "asc", sortBy = "updatedAt") {
    if (sortType === "asc") {
      return await this.sortAsc(this.articles, sortBy);
    } else {
      return await this.sortDsc(this.articles, sortBy);
    }
  }

  async sortAsc(articles, sortBy) {
    return (articles = articles.sort((a, b) => {
      return a[sortBy]?.toString().localeCompare(b[sortBy].toString());
    }));
  }

  async sortDsc(articles, sortBy) {
    console.log("articles :", articles);
    console.log("sortBy :", sortBy);
    return articles = articles.sort((a, b) => {
      return b[sortBy]?.toString().localeCompare(a[sortBy].toString());
    });
  }

  async pagination(page, limit) {
    const skip = page * limit - limit;
    const totalItems = this.articles.length;
    const totalPage = Math.ceil(totalItems / limit);
    const result = this.articles.slice(skip, skip + limit);

    return {
      result,
      totalItems,
      totalPage,
      hasNext: page < totalPage,
      hasPrev: page > 1,
    };
  }
}

module.exports = Article;
