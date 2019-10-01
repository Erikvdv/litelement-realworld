import { html } from 'lit-html';
import { SelectedTab } from './home.models';
import { ArticleListQuery } from '../../models';

const homeBanner = (appName: string) => html`
  <div class="banner">
    <div class="container">
      <h1 class="logo-font">
        ${appName.toLowerCase()}
      </h1>
      <p>A place to share your <i>LitElement</i> knowledge.</p>
    </div>
  </div>
`;

const homeYourFeedTabTemplate = (
  activeTab: SelectedTab,
  selectedTab: (selectedTab: SelectedTab) => void,
) => html`
  <li class="nav-item" @click=${() => selectedTab(SelectedTab.feed)}>
    <a
      href=""
      class=${activeTab === SelectedTab.feed ? 'nav-link active' : 'nav-link'}
    >
      Your Feed
    </a>
  </li>
`;

const homeGlobalFeedTabTemplate = (
  activeTab: SelectedTab,
  selectedTab: (selectedTab: SelectedTab) => void,
) => html`
  <li class="nav-item" @click=${() => selectedTab(SelectedTab.all)}>
    <a
      href=""
      class=${activeTab === SelectedTab.all ? 'nav-link active' : 'nav-link'}
    >
      Global Feed
    </a>
  </li>
`;

const homeTagFeedTabTemplate = (
  activeTagName: string,
  selectedTab: (selectedTab: SelectedTab) => void,
) =>
  activeTagName !== ''
    ? html`
        <li class="nav-item" @click=${() => selectedTab(SelectedTab.tag)}>
          <a class="nav-link active">
            <i class="ion-pound"></i> ${activeTagName}
          </a>
        </li>
      `
    : '';

const homeFeedNavigationTemplate = (
  activeTagName: string,
  activeTab: SelectedTab,
  selectedTab: (selectedTab: SelectedTab) => void,
) => html`
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      ${homeYourFeedTabTemplate(activeTab, selectedTab)}
      ${homeGlobalFeedTabTemplate(activeTab, selectedTab)}
      ${homeTagFeedTabTemplate(activeTagName, selectedTab)}
    </ul>
  </div>
`;

const TagsLoadingTemplate = () => html`
  <div>Loading tags...</div>
`;

const TagsNoTagsTemplate = () => html`
  <div>No tags are here... yet.</div>
`;

const TagsTemplate = (
  tags: string[],
  selectedTag: (selectedTag: string) => void,
) => html`
  <div class="tag-list">
    ${tags.map(tag => {
      return html`
        <a class="tag-default tag-pill" @click=${() => selectedTag(tag)}>
          ${tag}
        </a>
      `;
    })}
  </div>
`;

export const homeTemplate = (
  activeTab: SelectedTab,
  tags: string[],
  tagsIsLoading: boolean,
  activeTag: string,
  isLoggedIn: boolean,
  articleListQuery: ArticleListQuery,
  selectedTab: (selectedTab: SelectedTab) => void,
  selectedTag: (selectedTag: string) => void,
) => html`
  <div class="home-page">
    ${!isLoggedIn ? homeBanner('conduit') : ''}
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          ${homeFeedNavigationTemplate(activeTag, activeTab, selectedTab)}
          <app-article-list
            .articleListQuery=${articleListQuery}
          ></app-article-list>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            ${tagsIsLoading
              ? TagsLoadingTemplate()
              : tags.length === 0
              ? TagsNoTagsTemplate()
              : TagsTemplate(tags, selectedTag)}
          </div>
        </div>
      </div>
    </div>
  </div>
`;
