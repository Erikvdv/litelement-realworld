import { LitElement, html, property, customElement } from 'lit-element';


@customElement('app-article-list-pagination')
export class ArticleListPagination extends LitElement {
  @property({ type: Number }) pageCount: Number = 0;
  @property({ type: Number }) activePage: Number = 0;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
        <nav>
          <ul class="pagination">
            ${this.PageList(this.pageCount as number, this.activePage as number)}
          </ul>
        </nav>
      `;
  }

  PageList = (pageCount: number, activePage: number) => {
    const itemTemplates = [];
    for (let i = 1; i < pageCount + 1; i++) {
      itemTemplates.push(
        html`
          <li class="page-item ${(i === activePage) ? 'active' : ''}" @click="${() => this.pageSelected(i)}">
            <a class="page-link">${i}</a>
          </li>
          `);
    }
    return itemTemplates;
  }


  pageSelected(page: number) {
    const event = new CustomEvent('page-selected', {
      detail: {
        page: page
      }
    });
    this.dispatchEvent(event);
  }

}
