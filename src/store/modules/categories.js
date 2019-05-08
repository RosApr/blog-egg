import categoryApi from '@/assets/api/categories'
import Vue from 'vue'
import router from '@/router'
import { pagination } from '@/assets/config'
const state = {
    list: [],
    pagination,
    detail: {
        id: '',
        name: '',
        date: ''
    }
}

const getters = {
    
}

const actions = {
    queryCategoryList({ commit, state }, payload = {}) {
        const { pagination: { current, pageSize }} = state
        categoryApi.queryCategoriesList({current, pageSize})
            .then(
                ({msg, data: { items, total }}) => {
                    commit('updateList', {items})
                    commit('updatePagination', {total})
                },
                error => {

                }
            )
    },
    queryCategoryDetail({ commit ,state }, payload = {}) {
        categoryApi.queryCategoriesDetail(payload)
            .then(
                ({msg, data}) => {
                    commit('updateDetail', data)
                },
                error => {

                }
            )
    },
    createCategory({ commit, state }, payload = {}) {
        categoryApi.createCategories(payload)
            .then(
                ({ msg }) => {
                    router.push({name: 'adminCategoriesList'})
                },
                error => {
                    
                }
            )
    },
    modifyCategory({ commit, state }, payload = {}) {
        categoryApi.modifyCategories(payload)
            .then(
                ({}) => {
                    router.push({name: 'adminCategoriesList'})
                },
                error => {

                }
            )
    },
    delCategory({ commit, state, dispatch }, payload = {}) {
        categoryApi.delCategories(payload)
            .then(
                ({}) => {
                    commit('updatePagination')
                    dispatch('queryCategoryList')
                },
                error => {

                }
            )
    }
}

const mutations = {
    updateList(state, payload = {items: [], total: 0}){
        state.list = payload.items
    },
    delCategory(state, { id } = { id: 1}) {
        const categoryIndex = state.list.findIndex(item => item.id == id)
        state.list.splice(categoryIndex, 1)
    },
    updateDetail(state, payload = {
        id: '',
        name: '',
        date: ''
    }) {
        state.detail = {
            ...state.detail,
            ...payload
        }
    },
    updatePagination(state, payload = { current: 1, pageSize: 10}) {
        state.pagination = {
            ...state.pagination,
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