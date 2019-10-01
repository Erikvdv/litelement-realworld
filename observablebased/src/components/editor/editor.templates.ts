import { html } from 'lit-html';
import { RequestStatus } from '../../models/request-status.model';
import { Errors } from '../../models/errors.model';
import { NewArticle } from '../../models/article.model';

export const EditorTemplate = (
  addArticleStatus: RequestStatus,
  fields: NewArticle,
  updateFormFields: (value: NewArticle) => void,
  addTag: (value: string) => void,
  deleteTag: (value: string) => void,
  submit: (value: NewArticle) => void,
  errors?: Errors,
) => html`
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          ${errors
            ? html`
                <app-list-errors .errors=${errors}>
                  <app-list-errors></app-list-errors
                ></app-list-errors>
              `
            : ``}
          <form>
            <fieldset ?disabled=${addArticleStatus === RequestStatus.fetching}>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  value=${fields.title}
                  placeholder="Article Title"
                  @keyup="${(ev: KeyboardEvent) => {
                    updateFormFields({
                      ...fields,
                      title: (<HTMLInputElement>ev.target).value,
                    });
                  }}"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  value=${fields.description}
                  placeholder="What's this article about?"
                  @keyup="${(ev: KeyboardEvent) => {
                    updateFormFields({
                      ...fields,
                      description: (<HTMLInputElement>ev.target).value,
                    });
                  }}"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  @keyup="${(ev: KeyboardEvent) => {
                    updateFormFields({
                      ...fields,
                      body: (<HTMLInputElement>ev.target).value,
                    });
                  }}"
                >
${fields.body}</textarea
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Enter tags"
                  @keyup="${(ev: KeyboardEvent) => {
                    if (ev.key === 'Enter') {
                      addTag((<HTMLInputElement>ev.target).value);
                    }
                  }}"
                />
                <div class="tag-list">
                  ${fields.tagList.map(tag => {
                    return html`
                      <a class="tag-default tag-pill" }>
                        <i
                          class="ion-close-round"
                          @click=${() => deleteTag(tag)}
                        ></i>
                        ${tag}
                      </a>
                    `;
                  })}
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="${(ev: Event) => {
                  ev.preventDefault();
                  submit(fields);
                }}"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
`;
