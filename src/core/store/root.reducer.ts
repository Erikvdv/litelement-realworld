import { combineReducers } from 'redux';
import navigationReducer from '../../components/root/navigation/navigation.reducer';
import userReducer from '../user/user.reducer';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  user: userReducer,
});

export default rootReducer;
