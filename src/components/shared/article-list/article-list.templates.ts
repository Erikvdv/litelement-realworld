import { html } from 'lit-html';
import { Article } from '../../../models/article.model';

const ArticleMetaTemplate = (
  article: Article,
  deleteFavorite: (slug: string) => void,
  markFavorite: (slug: string) => void,
) => html`
  <div class="article-meta">
    <a href="${`/profile/${article.author.username}`}">
      <img src=${article.author.image} alt=${article.author.username} />
    </a>
    <div class="info">
      <a class="author" href="${`/profile/${article.author.username}`}">
        ${article.author.username}
      </a>
      <span class="date">
        ${new Date(article.createdAt).toDateString()}
      </span>
    </div>
    <div class="pull-xs-right">
      <button
        class=${`btn btn-sm
            ${article.favorited ? `btn-primary` : `btn-outline-primary`}
            `}
        @click=${() =>
          article.favorited
            ? deleteFavorite(article.slug)
            : markFavorite(article.slug)}
      >
        <i class="ion-heart"></i> ${article.favoritesCount}
      </button>
    </div>
  </div>
`;

const ArticleSummaryTemplate = (article: Article) => html`
  <a href="/article/${article.slug}" class="preview-link">
    <h1>${article.title}</h1>
    <p>${article.description}</p>
    <span>Read more...</span>
    <ul class="tag-list">
      ${article.tagList.map(
        tag => html`
          <li class="tag-default tag-pill tag-outline">
            ${tag}
          </li>
        `,
      )}
    </ul>
  </a>
`;

const ArticlePreviewTemplate = (
  article: Article,
  deleteFavorite: (slug: string) => void,
  markFavorite: (slug: string) => void,
) => html`
  <div class="article-preview">
    ${ArticleMetaTemplate(article, deleteFavorite, markFavorite)}
    ${ArticleSummaryTemplate(article)}
  </div>
`;

const PageListTemplate = (
  pageCount: number,
  activePage: number,
  selectPage: (page: number) => void,
) => {
  const itemTemplates = [];
  for (let i = 1; i < pageCount + 1; i++) {
    itemTemplates.push(
      html`
        <li
          class="page-item ${i === activePage ? 'active' : ''}"
          @click=${() => selectPage(i)}
        >
          <a class="page-link">${i}</a>
        </li>
      `,
    );
  }
  return itemTemplates;
};

const PaginationTemplate = (
  pageCount: number,
  activePage: number,
  selectPage: (page: number) => void,
) => {
  if (pageCount < 2) {
    return html``;
  }

  return html`
    <nav>
      <ul class="pagination">
        ${PageListTemplate(pageCount, activePage, selectPage)}
      </ul>
    </nav>
  `;
};

export const ArticleListTemplate = (
  isFetching: boolean,
  articleList: Article[],
  deleteFavorite: (slug: string) => void,
  markFavorite: (slug: string) => void,
  pageCount: number,
  activePage: number,
  selectPage: (page: number) => void,
) => html`
  ${isFetching
    ? html`
        Loading articles...
      `
    : articleList.map(article =>
        ArticlePreviewTemplate(article, deleteFavorite, markFavorite),
      )}
  ${PaginationTemplate(pageCount, activePage, selectPage)}
`;
