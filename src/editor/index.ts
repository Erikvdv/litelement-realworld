import { store } from '../store';
import { EditorAction } from './editor.actions';
import { EditorContainer } from './editor.container';
import editor from './editor.reducer';

store.addReducers({
    editor,
});

export { EditorAction, EditorContainer };
