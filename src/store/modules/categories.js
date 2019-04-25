import categoryApi from '@/assets/api/categories'
import Vue from 'vue'
import router from '@/router'
import * as GLOBAL from '@/assets/config'

const state = {
    list: [],
    total: 0,
    detail: {
        id: '',
        name: ''
    }
}

const getters = {

}

const actions = {
    queryCategoryList({ commit, state }, payload = {}) {
        categoryApi.queryCategoriesList(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    queryCategoryDetail({ commit ,state}, payload = {}) {
        categoryApi.queryCategoriesDetail(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    createCategory({ commit, state }, payload = {}) {
        categoryApi.createCategories(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    modifyCategory({ commit, state }, payload = {}) {
        categoryApi.modifyCategories(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    },
    delCategory({ commit, state }, payload = {}) {
        categoryApi.delCategories(payload)
            .then(
                ({}) => {

                },
                error => {

                }
            )
    }
}

const mutations = {
    storeList(state, payload = {items: [], total: 0}){
        state.list = payload.items
        state.total = payload.total
    },
    storeDetail(state, payload = {
        id: '',
        name: ''
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