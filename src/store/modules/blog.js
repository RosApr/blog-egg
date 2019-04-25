import blogApi from '@/assets/api/blogs'
import Vue from 'vue'
import router from '@/router'
const state = {
    list: [],
    total: 0,
    detail: {
        id: '',
        title: '',
        content: '',
        date: '',
        pv: '',
        owner: '',
        category: ''
    }
}
const getters = {

}

const actions = {
    queryBlogList({ commit, state }, payload = {}) {
        blogApi.queryPostsList(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    queryBlogDetail({ commit , state }, payload = {}) {
        blogApi.queryPostsDetail(payload)
            .then(
                ({}) => {

                },
                error => {
                    
                }
            )
    },
    createBlog({ commit, state }, payload = {}) {
        blogApi.createPosts(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    modifyBlog({ commit, state }, payload = {}) {
        blogApi.modifyPosts(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    delBlog({ commit, state }, payload = {}) {
        blogApi.delPosts
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    addBlogPv({ commit , state }, payload = {}) {
        blogApi.addPostsPv(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    }
}

const mutations = {
    storeList(state, payload = {items: [], total: 0}) {
        state.list = payload.items
        state.total = payload.total
    },
    storeDetail(state, payload = {
        id: '',
        title: '',
        content: '',
        date: '',
        pv: '',
        owner: '',
        category: ''
    }) {
        state.detail = {
            ...state.detail,
            ...payload
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}