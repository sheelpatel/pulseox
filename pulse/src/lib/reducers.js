import { combineReducers } from 'redux';

import ProfilesReducer from './profiles/ProfilesReducer';

export default combineReducers({
    profiles: ProfilesReducer,
});
