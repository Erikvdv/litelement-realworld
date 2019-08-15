import { store } from '../store'
import { fetchArticle, reset, EditorAction } from './editor.actions'
import { EditorContainer } from './editor.container'
import editor from './editor.reducer'

store.addReducers({
  editor,
})

export { reset, fetchArticle, EditorAction, EditorContainer }
