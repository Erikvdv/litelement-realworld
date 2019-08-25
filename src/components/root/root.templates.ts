import { RootRoute } from './navigation/navigation.reducer';
import { html } from 'lit-html';

export const mainTemplate = (rootRoute: RootRoute) => html`
  <main role="main" class="main-content">
    ${rootRoute === RootRoute.home
      ? html`
          <app-home></app-home>
        `
      : ''}
    ${rootRoute === RootRoute.article
      ? html`
          <app-article></app-article>
        `
      : ''}
    ${rootRoute === RootRoute.register
      ? html`
          <app-registration></app-registration>
        `
      : ''}
    ${rootRoute === RootRoute.login
      ? html`
          <app-login></app-login>
        `
      : ''}
    ${rootRoute === RootRoute.editor
      ? html`
          <app-editor></app-editor>
        `
      : ''}
    ${rootRoute === RootRoute.profile
      ? html`
          <app-profile></app-profile>
        `
      : ''}
    ${rootRoute === RootRoute.settings
      ? html`
          <app-settings></app-settings>
        `
      : ''}
  </main>
`;

export const footerTemplate = () => html`
  <footer>
    <div class="container">
      <a class="logo-font" href="/">conduit</a>
      <span class="attribution">
        &copy; ${new Date().getFullYear()}. An interactive learning project from
        <a href="https://thinkster.io">Thinkster</a>. Code licensed under MIT.
      </span>
    </div>
  </footer>
`;

export const headerLoggedOutView = () => html`
  <ul class="nav navbar-nav pull-xs-right">
    <li class="nav-item">
      <a href="/" class="nav-link">Home</a>
    </li>
    <li class="nav-item">
      <a href="/login" class="nav-link">Sign in</a>
    </li>
    <li class="nav-item">
      <a href="/register" class="nav-link">Sign up</a>
    </li>
  </ul>
`;

export const headerLoggedInView = (user: string) => html`
  <ul class="nav navbar-nav pull-xs-right">
    <li class="nav-item">
      <a href="/" class="nav-link">Home</a>
    </li>
    <li class="nav-item">
      <a href="/editor" class="nav-link">
        <i class="ion-compose"></i>&nbsp;New Article
      </a>
    </li>
    <li class="nav-item">
      <a href="/settings/" class="nav-link">
        <i class="ion-gear-a"></i>&nbsp;Settings
      </a>
    </li>
    <li class="nav-item">
      <a href=${`/profile/${user}`} class="nav-link">${user}</a>
    </li>
  </ul>
`;

export const headerTemplate = (appName: string, user: string) => html`
  <nav class="navbar navbar-light">
    <div class="container">
      <a href="/" class="navbar-brand">
        ${appName.toLowerCase()}
      </a>
      ${user ? headerLoggedInView(user) : headerLoggedOutView()}
    </div>
  </nav>
`;
