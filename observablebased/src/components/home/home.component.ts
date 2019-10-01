import { LitElement, customElement, property, html } from 'lit-element';
import { homeTemplate } from './home.templates';
import { connect } from 'pwa-helpers/connect-mixin';
import store from '../../store';
import { RootState } from 'typesafe-actions';
import { SelectedTab } from './home.models';
import { tags, selectTag, selectTab, initiateTab } from './home.actions';
import { RequestStatus } from '../../models/request-status.model';

@customElement('app-home')
export class HomeComponent extends connect(store)(LitElement) {
  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected firstUpdated() {
    store.dispatch(initiateTab());
    store.dispatch(tags.request());
  }

  protected render() {
    if (this.state.home.articleListQuery) {
      return homeTemplate(
        this.state.home.selectedTab,
        this.state.home.tags,
        this.state.home.fetchTagsStatus === RequestStatus.fetching,
        this.state.home.selectedTag,
        this.state.user.isLoggedin,
        this.state.home.articleListQuery,
        this.selectTab,
        this.selectTag,
      );
    } else {
      return html``;
    }
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  selectTag = (tag: string) => {
    store.dispatch(selectTag(tag));
  }

  selectTab = (tab: SelectedTab) => {
    store.dispatch(selectTab(tab));
  }
}
