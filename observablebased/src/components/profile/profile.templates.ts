import { html } from 'lit-html';
import { User } from '../../models/user.model';
import { Errors, Profile, ArticleListQuery, ProfileTab } from '../../models';

const MyPostsTabTemplate = (
  input: ProfileTab,

  selectTab: (selectedTab: ProfileTab) => void,
) => html`
  <li class="nav-item" @click=${() => selectTab(ProfileTab.my)}>
    <a class=${input === ProfileTab.my ? 'nav-link active' : 'nav-link'}>
      My Posts
    </a>
  </li>
`;

const FavoritedPostsTabTemplate = (
  input: ProfileTab,
  selectTab: (selectedTab: ProfileTab) => void,
) => html`
  <li class="nav-item" @click=${() => selectTab(ProfileTab.favorited)}>
    <a class=${input === ProfileTab.favorited ? 'nav-link active' : 'nav-link'}>
      Favorited Posts
    </a>
  </li>
`;

export const ProfileTemplate = (
  input: ProfileTab,
  profile: Profile,
  user: User,
  articleListQuery: ArticleListQuery,
  selectTab: (selectedTab: ProfileTab) => void,
  toggleFollowing: () => void,
  errors?: Errors,
) => html`
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            ${errors
              ? html`
                  <app-list-errors .errors=${errors}> </app-list-errors>
                `
              : ``}
            <img src=${profile.image} class="user-img" />
            <h4>${profile.username}</h4>
            <p>${profile.bio}</p>

            <button
              ?hidden=${profile.username === user.username}
              class="btn btn-sm action-btn ${profile.following
                ? 'btn-outline-secondary'
                : 'btn-secondary'}"
              @click=${() => toggleFollowing()}
            >
              <i class="ion-plus-round"></i>
              &nbsp; ${profile.following ? 'Unfollow' : 'Follow'}
              ${profile.username}
            </button>
            <a
              href="/settings"
              ?hidden=${profile.username !== user.username}
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
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
              ${MyPostsTabTemplate(input, selectTab)}
              ${FavoritedPostsTabTemplate(input, selectTab)}
            </ul>
          </div>
          <app-article-list
            .articleListQuery=${articleListQuery}
          ></app-article-list>
        </div>
      </div>
    </div>
  </div>
`;
