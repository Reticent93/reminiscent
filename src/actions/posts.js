import {DELETE, CREATE, UPDATE, FETCH_ALL, LIKE} from "../constants/actionTypes";
import * as api from '../api'


//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const {data} = await api.fetchPosts()
        dispatch({type: FETCH_ALL, payload: data})

    } catch (e) {
        console.error(e)
    }

}

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post)
        dispatch({type: CREATE, payload: data})

    } catch (e) {
        console.error(e)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
    } catch (e) {
        console.error(e)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({type: DELETE, payload: id})
    } catch (e) {
        console.error(e)
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const {data} = await api.likePost(id, user?.token)
        dispatch({type: LIKE, payload: data})
    } catch (e) {
        console.error(e)
    }
}