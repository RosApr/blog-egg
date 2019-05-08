import blogApi from '@/assets/api/blogs'
import VueInstance from '@/main'
import router from '@/router'
import { pagination } from '@/assets/config'
const state = {
    list: [],
    pagination,
    detail: {
        id: '',
        title: '',
        content: '',
        date: '',
        pv: '',
        nickname: '',
        categoryId: '',
        star: ''
    }
}
const getters = {
    pagination: (state, getters, rootState) => {
        return state.pagination
    }
}

const actions = {
    queryBlogList({ commit, state }, payload = {}) {
        const {pagination: { current, pageSize }} = state
        blogApi.queryPostsList({ current, pageSize, ...payload })
            .then(
                ({ msg, data: { items, total }}) => {
                    commit('updateList', {items})
                    commit('updatePagination', {total})
                },
                error => {

                }
            )
    },
    queryBlogDetail({ commit , state }, payload = {id: 1}) {
        blogApi.queryPostsDetail(payload)
            .then(
                ({ msg, data }) => {
                    commit('updateDetail', data)
                },
                error => {
                    
                }
            )
    },
    createBlog({ commit, state }, payload = {}) {
        blogApi.createPosts(payload)
            .then(
                ({}) => {
                    VueInstance.$message.success('发布成功', 2, () => {
                        router.go(-1)    
                    })
                },
                error => {

                }
            )
    },
    modifyBlog({ commit, state }, payload = {}) {
        blogApi.modifyPosts(payload)
            .then(
                ({}) => {
                    router.go(-1)
                },
                error => {

                }
            )
    },
    delBlog({ commit, state, dispatch }, payload = {id: 1}) {
        blogApi.delPosts(payload)
            .then(
                ({}) => {
                    commit('updatePagination')
                    dispatch('queryBlogList')
                },
                error => {

                }
            )
    },
    addBlogPv({ commit , state }, payload = {id: 1}) {
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
    updateList(state, payload = {items: [], total: 0}) {
        state.list = payload.items
    },
    delBlog(state, {id} = {id: 1}) {
        const blogIndex = state.list.findIndex(item => item.id == id)
        state.list.splice(blogIndex, 1)
        
    },
    updatePagination(state, payload = {current: 1, pageSize: 10}) {
        state.pagination = {
            ...state.pagination,
            ...payload
        }
    },
    updateDetail(state, payload = {
        id: '',
        title: '',
        content: '',
        date: '',
        pv: '',
        owner: '',
        category: '',
        star: ''
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