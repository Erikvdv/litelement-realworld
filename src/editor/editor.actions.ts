import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { API_ROOT } from '../constants'
import { Article, Errors, NewArticle } from '../models'
import { RootState } from '../store'
import { navigate } from '../root/root.actions'

// Action Types
export const LOAD_ARTICLE_REQUESTED = 'LOAD_ARTICLE_REQUESTED'
export const LOAD_ARTICLE_COMPLETED = 'LOAD_ARTICLE_COMPLETED'
export const LOAD_ARTICLE_FAILED = 'LOAD_ARTICLE_FAILED'
export const ADD_ARTICLE_REQUESTED = 'ADD_ARTICLE_REQUESTED'
export const ADD_ARTICLE_COMPLETED = 'ADD_ARTICLE_COMPLETED'
export const ADD_ARTICLE_FAILED = 'ADD_ARTICLE_FAILED'
export const UPDATE_ARTICLE_REQUESTED = 'UPDATE_ARTICLE_REQUESTED'
export const UPDATE_ARTICLE_COMPLETED = 'UPDATE_ARTICLE_COMPLETED'
export const UPDATE_ARTICLE_FAILED = 'UPDATE_ARTICLE_FAILED'
export const EDITOR_RESET = 'EDITOR_RESET'

// Actions Interfaces
export interface ActionLoadArticleRequested
  extends Action<'LOAD_ARTICLE_REQUESTED'> {
  articleSlug: string
}
export interface ActionLoadArticleCompleted
  extends Action<'LOAD_ARTICLE_COMPLETED'> {
  article: Article
}
export interface ActionLoadArticleFailed
  extends Action<'LOAD_ARTICLE_FAILED'> {}
export interface ActionAddArticleRequested
  extends Action<'ADD_ARTICLE_REQUESTED'> {
  article: NewArticle
}
export interface ActionAddArticleCompleted
  extends Action<'ADD_ARTICLE_COMPLETED'> {}
export interface ActionAddArticleFailed extends Action<'ADD_ARTICLE_FAILED'> {
  errors: Errors
}
export interface ActionUpdateArticleRequested
  extends Action<'UPDATE_ARTICLE_REQUESTED'> {
  article: Article
}
export interface ActionUpdateArticleCompleted
  extends Action<'UPDATE_ARTICLE_COMPLETED'> {}
export interface ActionUpdateArticleFailed
  extends Action<'UPDATE_ARTICLE_FAILED'> {
  errors: Errors
}

export interface ActionEditorReset extends Action<'EDITOR_RESET'> {}

export type EditorAction =
  | ActionLoadArticleRequested
  | ActionLoadArticleCompleted
  | ActionLoadArticleFailed
  | ActionAddArticleRequested
  | ActionAddArticleCompleted
  | ActionAddArticleFailed
  | ActionUpdateArticleRequested
  | ActionUpdateArticleCompleted
  | ActionUpdateArticleFailed
  | ActionEditorReset

type ThunkResult = ThunkAction<void, RootState, undefined, EditorAction>

// Actions
const loadArticleFailed: ActionCreator<ActionLoadArticleFailed> = () => {
  return { type: LOAD_ARTICLE_FAILED }
}

const loadArticleCompleted: ActionCreator<ActionLoadArticleCompleted> = (
  article: Article,
) => {
  return { type: LOAD_ARTICLE_COMPLETED, article }
}

const loadArticleRequested: ActionCreator<ActionLoadArticleRequested> = (
  articleSlug: string,
) => {
  return { type: LOAD_ARTICLE_REQUESTED, articleSlug }
}

const addArticleFailed: ActionCreator<ActionAddArticleFailed> = (
  errors: Errors,
) => {
  return { type: ADD_ARTICLE_FAILED, errors }
}

const addArticleCompleted: ActionCreator<ActionAddArticleCompleted> = () => {
  return { type: ADD_ARTICLE_COMPLETED }
}

const addArticleRequested: ActionCreator<ActionAddArticleRequested> = (
  article: NewArticle,
) => {
  return { type: ADD_ARTICLE_REQUESTED, article }
}

const updateArticleFailed: ActionCreator<ActionUpdateArticleFailed> = (
  errors: Errors,
) => {
  return { type: UPDATE_ARTICLE_FAILED, errors }
}

const updateArticleCompleted: ActionCreator<
  ActionUpdateArticleCompleted
> = () => {
  return { type: UPDATE_ARTICLE_COMPLETED }
}

const updateArticleRequested: ActionCreator<ActionUpdateArticleRequested> = (
  article: Article,
) => {
  return { type: UPDATE_ARTICLE_REQUESTED, article }
}

const editorReset: ActionCreator<ActionEditorReset> = () => {
  return { type: EDITOR_RESET }
}

interface FetchArticleResult {
  article: Article
}
interface AddArticleRequest {
  article: NewArticle
}

// async action processors
export const reset: ActionCreator<ThunkResult> = () => dispatch => {
  dispatch(editorReset())
}

export const fetchArticle: ActionCreator<ThunkResult> = (
  articleSlug: string,
) => dispatch => {
  dispatch(loadArticleRequested(articleSlug))
  fetch(`${API_ROOT}/articles/${articleSlug}`)
    .then(res => res.json())
    .then((data: FetchArticleResult) =>
      dispatch(loadArticleCompleted(data.article)),
    )
    .catch(() => dispatch(loadArticleFailed()))
}

export const addArticle: ActionCreator<ThunkResult> = (
  article: NewArticle,
  token: string,
) => async dispatch => {
  let headers: { [key: string]: string } = {}

  headers = {
    Authorization: `Token ${token}`,
    'content-type': 'application/json',
  }

  const body: AddArticleRequest = {
    article,
  }

  dispatch(addArticleRequested(article))

  try {
    const res = await fetch(`${API_ROOT}/articles/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      dispatch(addArticleCompleted())
      const createdArticle: FetchArticleResult = await res.json()
      history.pushState(null, '', `/article/${createdArticle.article.slug}`)
      dispatch(navigate())
    } else {
      dispatch(addArticleFailed((await res.json()).errors as Errors))
    }
  } catch (err) {
    dispatch(addArticleFailed())
  }
}

export const updateArticle: ActionCreator<ThunkResult> = (
  article: Article,
  token: string,
) => async dispatch => {
  let headers: { [key: string]: string } = {}

  headers = {
    Authorization: `Token ${token}`,
    'content-type': 'application/json',
  }

  const body: AddArticleRequest = {
    article,
  }

  dispatch(updateArticleRequested(article))

  try {
    const res = await fetch(`${API_ROOT}/articles/${article.slug}`, {
      method: 'put',
      headers,
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      dispatch(updateArticleCompleted())
      history.pushState(null, '', `/article/${article.slug}`)
      dispatch(navigate())
    } else {
      dispatch(updateArticleFailed((await res.json()).errors as Errors))
    }
  } catch (err) {
    dispatch(updateArticleFailed())
  }
}
