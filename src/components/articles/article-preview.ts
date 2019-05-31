import { LitElement, html, property, customElement } from 'lit-element';
import { Article } from '../../models';
import '../buttons/favorite-button';
import { repeat } from 'lit-html/directives/repeat';

@customElement('app-article-preview')
export class AppArticleList extends LitElement {

  @property({ type: Object }) article: Article | undefined;

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.article !== undefined) {
      return html`
            <div class="article-preview">
              ${this.ArticleMeta(this.article)}
              ${this.ArticleSummary(this.article)}
            </div>
      `;
    } else {
      return;
    }
  }

  ArticleMeta = (article: Article) => {
    return html`
        <div class="article-meta">
            <a href="${`/profile/=${article.author.username}`}">
              <img src=${article.author.image} alt=${article.author.username} />
            </a>

            <div class="info">
              <a class="author" href="${`/profile/=${article.author.username}`}">
                ${article.author.username}
              </a>
              <span class="date">
                ${new Date(article.createdAt).toDateString()}
              </span>
            </div>

            <div class="pull-xs-right">
              <app-favorite-button count=${article.favoritesCount}></app-favorite-button>
            </div>
        </div>`;
  }

  ArticleSummary = (article: Article) => {
    return html`
        <a href="/article/${article.slug}" class="preview-link">
          <h1>${article.title}</h1>
          <p>${article.description}</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${repeat(article.tagList, (tag) => html`
            <li class="tag-default tag-pill tag-outline">${tag}</li>
            `)}
          </ul>
        </a>
      `;
  }

}
