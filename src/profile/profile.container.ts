import { html, customElement, property, LitElement } from 'lit-element';

import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { isLoggedIn, userName } from '../login';
import { profileStateSelector } from './profile.reducer';
import { Errors, Profile } from '../models';

@customElement('app-profile')
export class ProfileContainer extends connect(store)(LitElement) {
    @property() private isLoggedIn = false;
    @property() private userName = '';
    @property() private errors?: Errors;
    @property() private profile?: Profile;

    createRenderRoot() {
        return this;
    }

    protected render() {
        if (this.profile === undefined) {
            return;
        }
        return html`
            <div class="profile-page">
                <div class="user-info">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-12 col-md-10 offset-md-1">
                                ${this.errors
                                    ? html`
                                          <app-list-errors
                                              .errors=${this.errors}
                                          >
                                              <app-list-errors></app-list-errors
                                          ></app-list-errors>
                                      `
                                    : ``}
                                <img
                                    src=${this.profile.image}
                                    class="user-img"
                                />
                                <h4>${this.profile.username}</h4>
                                <p>${this.profile.bio}</p>

                                <app-follow-button
                                    ?hidden=${this.profile.username ===
                                        this.userName}
                                    [profile]="profile"
                                    (toggle)="onToggleFollowing($event)"
                                >
                                </app-follow-button>
                                <a
                                    href="/settings"
                                    ?hidden=${this.profile.username !==
                                        this.userName}
                                    class="btn btn-sm btn-outline-secondary action-btn"
                                >
                                    <i class="ion-gear-a"></i> Edit Profile
                                    Settings
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <div class="articles-toggle">
                                <ul class="nav nav-pills outline-active">
                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            routerLinkActive="active"
                                            [routerLinkActiveOptions]="{ exact: true }"
                                            [routerLink]="['/profile', profile.username]"
                                        >
                                            My Posts
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="nav-link"
                                            routerLinkActive="active"
                                            [routerLinkActiveOptions]="{ exact: true }"
                                            [routerLink]="['/profile', profile.username, 'favorites']"
                                        >
                                            Favorited Posts
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <router-outlet></router-outlet>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    stateChanged(state: RootState) {
        this.isLoggedIn = isLoggedIn(state);
        const profileState = profileStateSelector(state);
        if (!profileState) {
            return;
        }
        if (profileState.profile !== undefined) {
            this.profile = profileState.profile;
        }
        this.errors = profileState.errors;
        this.userName = userName(state);
    }
}
