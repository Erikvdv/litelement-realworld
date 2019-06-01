import { LitElement, html, property, customElement } from 'lit-element';

export enum ButtonClassType {
  Disabled = 'disabled',
  Favorited = 'btn-outline-primary',
  NotFavorited = 'btn-primary'
}


@customElement('app-favorite-button')
export class AppArticleList extends LitElement {

  @property({ type: String }) buttonClassType: ButtonClassType = ButtonClassType.Favorited;
  @property({ type: Number }) count: Number = 0;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
            <button class="btn btn-sm ${this.buttonClassType}" @click=${this.clickHandler()}>
              <i class="ion-heart"></i> ${this.count}
            </button>
         `;
  }

  clickHandler() {
    switch (this.buttonClassType) {
      case ButtonClassType.Favorited: {
        this.buttonClassType = ButtonClassType.NotFavorited;
        break;
      }
      case ButtonClassType.NotFavorited: {
        this.buttonClassType = ButtonClassType.Favorited;
        break;
      }
      case ButtonClassType.Disabled:
        break;
      default:
        break;
    }
  }

}
