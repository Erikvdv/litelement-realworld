import { html, customElement, LitElement } from 'lit-element';

@customElement('app-footer')
export class FooterComponent extends LitElement {

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <footer>
        <div class="container">
            <a class="logo-font" routerLink="/">conduit</a>
            <span class="attribution">
            &copy; ${ (new Date()).getFullYear() }.
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>.
            Code licensed under MIT.
            </span>
        </div>
        </footer>
    `;
  }


}
