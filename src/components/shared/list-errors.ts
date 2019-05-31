import { LitElement, html, property, customElement } from 'lit-element';
import { Errors } from '../../models/errors.model';

@customElement('app-list-errors')
export class AppListErrors extends LitElement {
  @property() errors?: Errors;

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (!this.errors) {
        return;
      }

    return html`
    <div>Error messages</div>
        <ul class="error-messages">
        ${Object.keys(this.errors).map(k =>
            // tslint:disable-next-line:no-non-null-assertion
            this.errors![k].map(e => (html`
                <li>
            ${k} ${e}
            </li>`
            ))
        )}
        </ul>
        `;

  }
}
