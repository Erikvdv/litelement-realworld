import { LitElement, html, property, customElement } from "lit-element";

@customElement("home-tags")
export class HomeTags extends LitElement {
  @property({ type: Array }) tags: Array<string> = [];
  @property({ type: Boolean }) isLoading = false;


  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <p>Popular Tags</p>
      <div class="tag-list">
        ${this.Tags(this.tags, this.isLoading)}
      </div>
    `;
  }

  Tags = (tags: string[], isLoading: boolean) => {
    if (isLoading) {
      return html`
        <div>Loading tags...</div>
      `;
    } else if (tags.length === 0){
      return html`
        <div>No tags are here... yet.</div>
      `;
    } else {
      return html`
        ${tags!.map(tag => {
          return html`
              <a href="" class="tag-default tag-pill">
                ${tag}
              </a>
            `;
          })}
      `;
    }
    
  }

}
