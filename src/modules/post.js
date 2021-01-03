import axios from 'axios';
function getPostAPI() {
    return axios.get(`https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes`)
        .then(res => res.data)
        .catch(e => e)
}

import 'regenerator-runtime/runtime'
import {
    reducerUtils,
    handleAsyncActions,
} from '../lib/asyncUtils';
import {
    sortlist,
    searchlist
} from '../lib/sortSearchUtils'
import { call, put, takeEvery } from 'redux-saga/effects';

/* 액션 타입 */

// 포스트 여러개 조회하기
const GET_POSTS = 'GET_POSTS'; // 요청 시작
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'; // 요청 성공
const GET_POSTS_ERROR = 'GET_POSTS_ERROR'; // 요청 실패


const DEL_ROW = 'DEL_ROWS' // 행 삭제
const ADD_ROW = 'ADD_ROWS' // 행 추가
const SORT = 'SORT' // 정렬
const SEARCH = 'SEARCH' //검색

export const getPosts = () => ({ type: GET_POSTS });
export const addRow = row => ({
    type: ADD_ROW,
    row
});
export const delRow = alphaCode => ({
    type: DEL_ROW,
    alphaCode
});
export const sort = sortobj => ({
    type: SORT,
    sortobj
});
export const search = input => ({
    type: SEARCH,
    input
})

function* getPostsSaga() {
    try {
        const posts = yield call(getPostAPI); // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있습니다.
        yield put({
            type: GET_POSTS_SUCCESS,
            payload: posts
        }); // 성공 액션 디스패치
    } catch (e) {
        yield put({
            type: GET_POSTS_ERROR,
            error: true,
            payload: e
        }); // 실패 액션 디스패치
    }
}

// 사가들을 합치기
export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
}

const initialState = {
    posts: reducerUtils.initial(),
    sortobj: { key: '', type : ''},
    query: ''
};

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
        case DEL_ROW:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: state.posts.data.filter(post => post.alpha2Code !== action.alphaCode)
                }
            }
        case ADD_ROW:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [action.row, ...state.posts.data]
                }
            }
        case SORT:
            return {
                ...state,
                sortobj : {
                    key:action.sortobj.key,
                    type:action.sortobj.type,
                },
                posts: {
                    ...state.posts,
                    data: sortlist(state.posts.data, action.sortobj.type, action.sortobj.key)
                },
            }
        case SEARCH:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: searchlist(state.posts.data, action.input)
                },
                query : action.input

            }
        default:
            return state;
    }
}

