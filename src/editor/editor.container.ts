import { html, customElement, LitElement, property } from 'lit-element'

import { store, RootState } from '../store'
import { connect } from 'pwa-helpers/connect-mixin'

import { Errors } from '../models/errors.model'
import { Article } from '../models'
import { addArticle } from './editor.actions'
import { User } from '../models/user.model'
import { editorStateSelector } from './editor.reducer'
import { RequestStatus } from '../models/request-status.model'
import { getUser } from '../login'
import('../shared/list-errors/list-errors.component')

@customElement('app-editor')
export class EditorContainer extends connect(store)(LitElement) {
    @property() private article?: Article
    @property() private errors?: Errors
    @property() private user?: User
    @property() private addArticleStatus = RequestStatus.notStarted

    createRenderRoot() {
        return this
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
                                    ?disabled=${this.addArticleStatus ===
                                        RequestStatus.fetching}
                                >
                                    <fieldset class="form-group">
                                        <input
                                            class="form-control form-control-lg"
                                            type="text"
                                            placeholder="Article Title"
                                        />
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="What's this article about?"
                                        />
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <textarea
                                            class="form-control"
                                            rows="8"
                                            placeholder="Write your article (in markdown)"
                                        ></textarea>
                                    </fieldset>
                                    <fieldset class="form-group">
                                        <input
                                            class="form-control"
                                            type="text"
                                            placeholder="Enter tags"
                                            (keyup.enter)="addTag()"
                                        />
                                        <div class="tag-list">
                                            <span
                                                *ngFor="let tag of article.tagList"
                                                class="tag-default tag-pill"
                                            >
                                                <i
                                                    class="ion-close-round"
                                                    (click)="removeTag(tag)"
                                                ></i>
                                                {{ tag }}
                                            </span>
                                        </div>
                                    </fieldset>
                                    <button
                                        class="btn btn-lg pull-xs-right btn-primary"
                                        type="button"
                                        (click)="submitForm()"
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

        this.errors = editorState.errors
        this.addArticleStatus = editorState.addArticleStatus

        this.user = getUser(state)
    }

    submit() {
        store.dispatch(addArticle(this.article, this.user!.token))
    }
}
