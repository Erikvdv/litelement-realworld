import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { API_ROOT } from '../constants'
import { Article, Errors } from '../models'
import { RootState } from '../store'

// Action Types
export const ADD_ARTICLE_REQUESTED = 'ADD_ARTICLE_REQUESTED'
export const ADD_ARTICLE_COMPLETED = 'ADD_ARTICLE_COMPLETED'
export const ADD_ARTICLE_FAILED = 'ADD_ARTICLE_FAILED'
export const UPDATE_ARTICLE_REQUESTED = 'UPDATE_ARTICLE_REQUESTED'
export const UPDATE_ARTICLE_COMPLETED = 'UPDATE_ARTICLE_COMPLETED'
export const UPDATE_ARTICLE_FAILED = 'UPDATE_ARTICLE_FAILED'

// Actions Interfaces
export interface ActionAddArticleRequested
  extends Action<'ADD_ARTICLE_REQUESTED'> {
  article: Article
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

export type EditorAction =
  | ActionAddArticleRequested
  | ActionAddArticleCompleted
  | ActionAddArticleFailed
  | ActionUpdateArticleRequested
  | ActionUpdateArticleCompleted
  | ActionUpdateArticleFailed

type ThunkResult = ThunkAction<void, RootState, undefined, EditorAction>

// Actions
const addArticleFailed: ActionCreator<ActionAddArticleFailed> = (
  errors: Errors,
) => {
  return { type: ADD_ARTICLE_FAILED, errors }
}

const addArticleCompleted: ActionCreator<ActionAddArticleCompleted> = () => {
  return { type: ADD_ARTICLE_COMPLETED }
}

const addArticleRequested: ActionCreator<ActionAddArticleRequested> = (
  article: Article,
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

interface AddArticleRequest {
  article: Article
}

// async action processors
export const addArticle: ActionCreator<ThunkResult> = (
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

  dispatch(addArticleRequested(article))

  try {
    const res = await fetch(`${API_ROOT}/articles/`, {
      method: 'post',
      headers,
      body: JSON.stringify(body),
    })
    if (res.status === 200) {
      dispatch(addArticleCompleted())
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
    } else {
      dispatch(updateArticleFailed((await res.json()).errors as Errors))
    }
  } catch (err) {
    dispatch(updateArticleFailed())
  }
}
