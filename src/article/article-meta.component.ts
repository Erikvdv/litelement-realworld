import { customElement, html, LitElement, property } from 'lit-element';
import { Article } from '../models';

@customElement('app-article-meta')
export class AppArticleMetaComponent extends LitElement {
    @property({ type: Object }) article: Article | undefined;

    createRenderRoot() {
        return this;
    }

    protected render() {
        if (this.article !== undefined) {
            return html`
                <div class="article-meta">
                    <a href=${`/@${this.article.author.username}`}>
                        <img
                            src=${this.article.author.image}
                            alt=${this.article.author.username}
                        />
                    </a>

                    <div class="info">
                        <a
                            href=${`/@${this.article.author.username}`}
                            class="author"
                        >
                            ${this.article.author.username}
                        </a>
                        <span class="date">
                            ${new Date(this.article.createdAt).toDateString()}
                        </span>
                    </div>
                </div>
            `;
        } else {
            return;
        }
    }
}
