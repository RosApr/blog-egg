import userApi from '@/assets/api/user'
import Vue from 'vue'
import router from '@/router'
import VueCookie from 'vue-cookie'
import { pagination, roleUser, roleAnonymous, roleAdmin } from '@/assets/config'
Vue.use(VueCookie)
const state = {
    pagination,
    userConfig: {
        id: '',
        role: '',
        account: '',
        nickname: ''
    },
    list: []
}
const getters = {
    isLogin: (state, getters, rootGetters) => {
        return [roleAdmin, roleUser].includes(state.userConfig.role)
    }
}

const actions = {
    resetUserPwd({ commit, state}, { id } = {}) {
        userApi.resetUserPwd({id})
            .then(
                () => {

                },
                error => {

                }
            )
    },
    queryUserList({ commit, state }, payload = {}) {
        const { pagination: { current, pageSize }} = state
        userApi.queryUserList({ current, pageSize })
            .then(
                ({ msg, data: { items, total }}) => {
                    commit('updateList', {items})
                    commit('updatePagination', {total})
                }, error => {

                }
            )
    },
    login({ commit, state }, payload={}) {
        userApi.login(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                router.push({name: `${state.userConfig.role === roleUser ? 'userBlogList' : 'adminBlogList'}`})
            },
            error => {
                console.log(error)
            }
        )
    },
    register({ commit }, payload={}) {
        userApi.register(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                router.push({name: 'userBlogList'})
            },
            error => {
                console.log(error)
            }
        )
    },
    modifyUserProfile({ state, commit }, payload={}) {
        userApi.modifyUserProfile(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                console.log(state.userConfig)
                router.push({name: `${state.userConfig.role === roleUser ? 'userBlogList' : 'adminBlogList'}`})
            },
            error => {
                console.log(error)
            }
        )
    },
    logout({ commit }) {
        userApi.logout().then(
            () => {
                commit('setUserState')
                router.push({name: 'userBlogList'})
            },
            error => {
                console.log(error)
            }
        )
    },
}
  
const mutations = {
    setUserState(state, payload={id: '', role: '', account: '', nickname: ''}) {
        state.userConfig = {
            ...state.userConfig,
            ...payload
        }
    },
    updateList(state, payload = {items: [], total: 0}) {
        state.list = payload.items
    },
    updatePagination(state, payload = {current: 1, pageSize: 10}) {
        state.pagination = {
            ...state.pagination,
            ...payload
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}