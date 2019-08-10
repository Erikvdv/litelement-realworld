import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store'
import page from 'page'
import { RootRoute } from './root.reducer'

// Action Types
export const UPDATE_PAGE = 'UPDATE_PAGE'

// Actions Interfaces
export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {
  route: RootRoute
}

export type AppAction = AppActionUpdatePage

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>

// Actions
const updatePage: ActionCreator<AppActionUpdatePage> = (route: RootRoute) => {
  return {
    type: UPDATE_PAGE,
    route,
  }
}

const goToHomePage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../home').then(() => {
    dispatch(updatePage(RootRoute.home))
  })
}

const goToArticlePage: ActionCreator<ThunkResult> = (
  articleId: string,
) => dispatch => {
  import('../article').then(module => {
    dispatch(module.fetchArticle(articleId))
    dispatch(updatePage(RootRoute.article))
  })
}

const goToEditorPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../editor').then(() => {
    console.log('editor route')
    dispatch(updatePage(RootRoute.editor))
  })
}

const goToRegistrationPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../register').then(() => {
    dispatch(updatePage(RootRoute.register))
  })
}

const goToLoginPage: ActionCreator<ThunkResult> = () => dispatch => {
  import('../login').then(() => {
    dispatch(updatePage(RootRoute.login))
  })
}

export const navigate: ActionCreator<ThunkResult> = () => dispatch => {
  page.base('')
  page('/home', () => dispatch(goToHomePage()))
  page('/article/:id', ctx => dispatch(goToArticlePage(ctx.params.id)))
  page('/editor', () => dispatch(goToEditorPage()))
  page('/register', () => dispatch(goToRegistrationPage()))
  page('/login', () => dispatch(goToLoginPage()))
  page('*', () => dispatch(goToHomePage()))
  page()
}
