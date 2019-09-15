import {
  customElement,
  LitElement,
  property,
  PropertyValues,
} from 'lit-element';
import store from '../../core/store';
import { connect } from 'pwa-helpers/connect-mixin';
import { RootState } from 'typesafe-actions';
import { EditorTemplate } from './editor.templates';
import { addArticle, updateArticle } from '../article/article.actions';
import { NewArticle, Article } from '../../models/article.model';

export interface EditorFormFields {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

@customElement('app-editor')
export class EditorComponent extends connect(store)(LitElement) {
  @property() private state = store.getState();
  @property() private article?: Article;
  @property() private fields: NewArticle = {
    body: '',
    description: '',
    tagList: [],
    title: '',
  };

  createRenderRoot() {
    return this;
  }

  protected render() {
    return EditorTemplate(
      this.state.article.upsertArticleStatus,
      this.fields,
      this.updateFormFields,
      this.addTag,
      this.deleteTag,
      this.submit,
      this.state.article.upsertArticleErrors,
    );
  }

  stateChanged(state: RootState) {
    this.state = state;
    this.article = state.article.selectedArticle;
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('article')) {
      if (this.article) {
        this.fields = {
          body: this.article.body,
          description: this.article.description,
          tagList: this.article.tagList,
          title: this.article.title,
        };
      } else {
        this.fields = {
          body: '',
          description: '',
          tagList: [],
          title: '',
        };
      }
    }
  }

  updateFormFields = (fields: NewArticle) => {
    this.fields = fields;
  }

  addTag = (tag: string) => {
    if (!this.fields.tagList.includes(tag)) {
      this.fields = {
        ...this.fields,
        tagList: [...this.fields.tagList, tag],
      };
    }
  }

  deleteTag = (tag: string) => {
    this.fields.tagList = this.fields.tagList.filter(item => item !== tag);
  }

  submit = (article: NewArticle) => {
    if (!this.state.editor.articleSlug) {
      store.dispatch(addArticle.request(article));
    } else {
      const newArticle = {
        ...this.state.article.selectedArticle!,
        title: article.title,
        body: article.body,
        tagList: article.tagList,
        description: article.description,
      };
      store.dispatch(updateArticle.request(newArticle));
    }
  }
}
