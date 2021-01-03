import { combineReducers } from 'redux'
import posts, { postsSaga } from './post';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
    posts,
})

export function* rootSaga() {
    yield all([postsSaga()]); // all 은 배열 안의 여러 사가를 동시에 실행시켜줍니다.
}

export default rootReducer