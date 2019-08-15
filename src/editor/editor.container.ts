import { html, customElement, LitElement, property } from 'lit-element'

import { store, RootState } from '../store'
import { connect } from 'pwa-helpers/connect-mixin'
import { Errors } from '../models/errors.model'
import { Article, NewArticle } from '../models'
import { addArticle, updateArticle } from './editor.actions'
import { User } from '../models/user.model'
import { editorStateSelector } from './editor.reducer'
import { RequestStatus } from '../models/request-status.model'
import { getUser } from '../login'
import('../shared/list-errors/list-errors.component')

interface EditableFields {
  title: string
  description: string
  body: string
  tagList: string[]
}

@customElement('app-editor')
export class EditorContainer extends connect(store)(LitElement) {
  @property() private article?: Article
  @property() private errors?: Errors
  @property() private user?: User
  @property() private addArticleStatus = RequestStatus.notStarted
  @property() private fields: EditableFields = {
    body: '',
    description: '',
    tagList: [],
    title: '',
  }

  createRenderRoot() {
    return this
  }

  protected firstUpdated() {
    console.log('first updated hiero')
  }

  protected render() {
    return html`
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              ${this.errors
                ? html`
                    <app-list-errors .errors=${this.errors}>
                      <app-list-errors></app-list-errors
                    ></app-list-errors>
                  `
                : ``}
              <form>
                <fieldset
                  ?disabled=${this.addArticleStatus === RequestStatus.fetching}
                >
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      value=${this.fields.title}
                      placeholder="Article Title"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.fields.title = (<HTMLInputElement>ev.target).value
                      }}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      value=${this.fields.description}
                      placeholder="What's this article about?"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.fields.description = (<HTMLInputElement>(
                          ev.target
                        )).value
                      }}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <textarea
                      class="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.fields.body = (<HTMLInputElement>ev.target).value
                      }}"
                    >
${this.fields.body}</textarea
                    >
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Enter tags"
                      @keyup="${(ev: KeyboardEvent) => {
                        if (ev.key === 'Enter') {
                          const target = <HTMLInputElement>ev.target
                          this.addTag(target.value)
                          target.value = ''
                        }
                      }}"
                    />
                    <div class="tag-list">
                      ${this.fields.tagList.map(tag => {
                        return html`
                          <a class="tag-default tag-pill" }>
                            <i
                              class="ion-close-round"
                              @click=${() => this.deleteTag(tag)}
                            ></i>
                            ${tag}
                          </a>
                        `
                      })}
                    </div>
                  </fieldset>
                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    @click="${(ev: Event) => {
                      ev.preventDefault()
                      this.submit()
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
    `
  }

  stateChanged(state: RootState) {
    const editorState = editorStateSelector(state)
    if (!editorState) {
      return
    }
    if (editorState.article !== undefined) {
      this.article = editorState.article
      this.fields = {
        body: editorState.article.body,
        description: editorState.article.description,
        tagList: editorState.article.tagList,
        title: editorState.article.title,
      }
    } else {
      this.fields = {
        body: '',
        description: '',
        tagList: [],
        title: '',
      }
    }
    this.errors = editorState.errors
    this.addArticleStatus = editorState.addArticleStatus

    this.user = getUser(state)
  }

  addTag(tag: string) {
    if (!this.fields.tagList.includes(tag)) {
      this.fields = {
        ...this.fields,
        tagList: [...this.fields.tagList, tag],
      }
      // this.fields.tagList = [...this.fields.tagList, tag];
    }
  }

  deleteTag(tag: string) {
    this.fields.tagList = this.fields.tagList.filter(item => item !== tag)
  }

  submit() {
    if (!this.article) {
      const newArticle: NewArticle = {
        title: this.fields.title,
        description: this.fields.description,
        body: this.fields.body,
        tagList: this.fields.tagList,
      }
      // tslint:disable-next-line:no-non-null-assertion
      store.dispatch(addArticle(newArticle, this.user!.token))
    } else {
      this.article.title = this.fields.title
      this.article.body = this.fields.body
      this.article.tagList = this.fields.tagList
      this.article.description = this.fields.description
      // tslint:disable-next-line:no-non-null-assertion
      store.dispatch(updateArticle(this.article, this.user!.token))
    }
  }
}
