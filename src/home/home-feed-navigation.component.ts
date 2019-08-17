import { customElement, html, LitElement, property } from 'lit-element';

export enum SelectedTab {
  all = 'ALL',
  feed = 'FEED',
  tag = 'TAG',
}

export interface HomeFeedNavigationInput {
  isLoggedIn: boolean;
  selectedTab: SelectedTab;
  selectedTag?: string;
}

@customElement('app-home-feed-navigation')
export class HomeFeedNavigationComponent extends LitElement {
  @property({ attribute: false })
  input?: HomeFeedNavigationInput;

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (!this.input) {
      return;
    }

    return html`
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          ${this.YourFeedTab(this.input)} ${this.GlobalFeedTab(this.input)}
          ${this.TagFeedTab(this.input)}
        </ul>
      </div>
    `;
  }

  YourFeedTab = (input: HomeFeedNavigationInput) => {
    return html`
      <li class="nav-item" @click=${() => this.tabSelected(SelectedTab.feed)}>
        <a
          href=""
          class=${input.selectedTab === SelectedTab.feed
            ? 'nav-link active'
            : 'nav-link'}
        >
          Your Feed
        </a>
      </li>
    `;
  }

  GlobalFeedTab = (input: HomeFeedNavigationInput) => {
    return html`
      <li class="nav-item" @click=${() => this.tabSelected(SelectedTab.all)}>
        <a
          href=""
          class=${input.selectedTab === SelectedTab.all
            ? 'nav-link active'
            : 'nav-link'}
        >
          Global Feed
        </a>
      </li>
    `;
  }

  TagFeedTab = (input: HomeFeedNavigationInput) => {
    if (input.selectedTab !== SelectedTab.tag) {
      return;
    }
    return html`
      <li class="nav-item" @click=${() => this.tabSelected(SelectedTab.tag)}>
        <a class="nav-link active">
          <i class="ion-pound"></i> ${input.selectedTag}
        </a>
      </li>
    `;
  }

  tabSelected(tab: SelectedTab) {
    const event = new CustomEvent('tab-selected', { detail: { tab } });
    this.dispatchEvent(event);
  }
}
