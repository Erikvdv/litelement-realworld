import { LitElement, customElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import store from '../../core/store';
import { RootState } from 'typesafe-actions';
import { settingsTemplate } from './settings.template';
import { User } from '../../models/user.model';
import { updateUser, logout } from '../../core/user/user.actions';

@customElement('app-settings')
export class SettingsComponent extends connect(store)(LitElement) {
  @property() private state = store.getState();
  @property() private user?: User;

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.user === undefined) {
      return;
    }
    return settingsTemplate(
      this.user,
      this.userImageUpdated,
      this.usernameUpdated,
      this.bioUpdated,
      this.emailUpdated,
      this.passwordUpdated,
      this.submit,
      this.logout,
      this.state.user.errors,
    );
  }

  stateChanged(state: RootState) {
    this.state = state;
    this.user = state.user.user;
  }

  userImageUpdated = (userImage: string) => {
    this.user!.image = userImage;
  }

  usernameUpdated = (username: string) => {
    this.user!.username = username;
  }

  bioUpdated = (bio: string) => {
    this.user!.bio = bio;
  }
  emailUpdated = (email: string) => {
    this.user!.email = email;
  }

  passwordUpdated = (password: string) => {
    this.user!.password = password;
  }

  logout() {
    store.dispatch(logout());
  }

  submit(user: User) {
    store.dispatch(updateUser.request(user));
  }
}
