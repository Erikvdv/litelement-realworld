import { LitElement, html, property, customElement } from "lit-element";

@customElement("home-banner")
export class HomeBanner extends LitElement {
  @property({ type: String }) appName = "";
  @property({ type: String }) token = "";

  createRenderRoot() {
    return this;
  }

  protected render() { 
      return html`
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">
              ${this.appName.toLowerCase()}
            </h1>
            <p>A place to share your <i>LitElement</i> knowledge.</p>
          </div>
        </div>
      `;
  
  }
}
