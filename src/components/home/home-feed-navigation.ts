import { LitElement, html, property, customElement } from 'lit-element';

@customElement('home-feed-navigation')
export class MainView extends LitElement {
  @property({ type: String })
  token = '';

  @property({ type: String })
  tab = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          ${this.YourFeedTab(this.token, this.tab)}
          ${this.GlobalFeedTab('all')}
        </ul>
      </div>
    `;
  }

  YourFeedTab = (token: string, tab: string) => {
    token = 'true';
    if (token) {
      return html`
        <li class="nav-item">
          <a href="" class=${tab=== 'feed' ? 'nav-link active' : 'nav-link'}>
            Your Feed
          </a>
        </li>
      `;
    }
    return null;
  }

  GlobalFeedTab = (tab: string) => {
    return html`
      <li class="nav-item">
        <a href="" class=${tab==="all" ? 'nav-link active' : 'nav-link'}>
          Global Feed
        </a>
      </li>
    `;
  }
}
