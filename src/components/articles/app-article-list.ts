import { LitElement, html, property, customElement } from 'lit-element';
import { Article } from '../../models';
import './app-article-preview';
import { repeat } from 'lit-html/directives/repeat.js';


@customElement('app-article-list')
export class AppArticleList extends LitElement {
  @property({ type: Array }) articleList: Array<Article> = [];

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
        ${repeat(this.articleList, (article) => html`
        <app-article-preview .article=${article}></app-article-preview>
        `)}
      `;
  }

}
