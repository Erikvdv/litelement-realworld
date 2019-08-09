import { EditorAction } from './editor.actions';
import { store } from '../store';
import editor from './editor.reducer';
import { EditorContainer } from './editor.container';

store.addReducers({
    editor
});

export {EditorAction, EditorContainer};
