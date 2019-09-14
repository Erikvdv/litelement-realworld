import { LitElement, customElement, property, html } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import store from '../../core/store';
import { RootState } from 'typesafe-actions';
import { ProfileTemplate } from './profile.templates';
import { ProfileTab } from '../../models';
import {
  setProfileTab,
  followProfile,
  unfollowProfile,
} from './profile.actions';

@customElement('app-profile')
export class ProfileComponent extends connect(store)(LitElement) {
  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.state.profile.articleListQuery && this.state.profile.profile) {
      return ProfileTemplate(
        this.state.profile.selectedTab,
        this.state.profile.profile,
        this.state.user.user!,
        this.state.profile.articleListQuery,
        this.selectTab,
        this.toggleFollowing,
        this.state.profile.errors,
      );
    } else {
      return html``;
    }
  }
  // protected firstUpdated() {
  //   store.dispatch(fetchProfile.request(this.state.profile.selectedUser!));
  // }

  stateChanged(state: RootState) {
    this.state = state;
  }

  selectTab = (selectedTab: ProfileTab) => {
    store.dispatch(setProfileTab(selectedTab));
  }

  toggleFollowing = () => {
    const profile = this.state.profile.profile!;
    profile.following
      ? store.dispatch(unfollowProfile.request(profile.username))
      : store.dispatch(followProfile.request(profile.username));
  }
}
