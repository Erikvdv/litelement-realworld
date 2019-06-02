import { LitElement, html, property, customElement } from 'lit-element';

@customElement('app-home-tags')
export class HomeTagsComponent extends LitElement {
  @property() tags: Array<string> = [];
  @property() isLoading = false;

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
    } else if (tags.length === 0) {
      return html`
        <div>No tags are here... yet.</div>
      `;
    } else {
      return html`
        ${tags.map(tag => {
          return html`
              <a class="tag-default tag-pill" @click=${() => this.tagSelected(tag)}>
                ${tag}
              </a>
            `;
          })}
      `;
    }
  }


  tagSelected(tag: string) {
    const event = new CustomEvent('tag-selected', {
      detail: {
        tag: tag
      }
    });
    this.dispatchEvent(event);
  }

}
