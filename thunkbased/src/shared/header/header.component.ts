import { html, customElement, LitElement, property } from 'lit-element';

@customElement('app-header')
export class HeaderComponent extends LitElement {
  @property({ type: String }) appName = '';
  @property({ type: String }) currentUser = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <nav class="navbar navbar-light">
        <div class="container">
          <a href="/" class="navbar-brand">
            ${this.appName.toLowerCase()}
          </a>
          ${this.LoggedOutView(this.currentUser)}
          ${this.LoggedInView(this.currentUser)}
        </div>
      </nav>
    `;
  }

  LoggedOutView = (currentUser: string) => {
    if (!currentUser) {
      return html`
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a href to="/" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="/login" class="nav-link">Sign in</a>
          </li>
          <li class="nav-item">
            <a href="/register" class="nav-link">Sign up</a>
          </li>
        </ul>
      `;
    }
    return null;
  }

  LoggedInView = (currentUser: string) => {
    if (currentUser) {
      return html`
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
            <a href=${`/profile/${this.currentUser}`} class="nav-link"
              >${this.currentUser}</a
            >
          </li>
        </ul>
      `;
    }

    return null;
  }
}
