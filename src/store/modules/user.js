import userApi from '@/assets/api/user'
import Vue from 'vue'
import router from '@/router'
import { pagination, roleUser, roleAnonymous, roleAdmin } from '@/assets/config'
const state = {
    pagination,
    userConfig: {
        id: '',
        role: '',
        account: '',
        nickname: ''
    },
    list: [],
    starConfig: {
        items: [],
        total: 0
    }
}
const getters = {
    isLogin: (state, getters, rootGetters) => {
        return [roleAdmin, roleUser].includes(state.userConfig.role)
    },
    isLoginAndIsRoleUser: (state, getters, rootGetters) => {
        return getters['isLogin'] && state.userConfig.role == roleUser
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
    login({ commit, state, dispatch }, payload={}) {
        userApi.login(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                dispatch('queryStarConfig')
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
    queryStarConfig({ commit, state }) {
        userApi.queryStarConfig()
            .then(
                ({data: { items, total }}) => {
                    commit('updateStarConfig', {items, total})
                },
                error => {

                }
            )
    },
    star({commit, state }, payload = {postId: '', status: 0}) {
        userApi.star(payload)
            .then(
                () => {
                    commit('blog/updateDetail', {star: payload.status}, { root: true })
                    let starList = state.starConfig.items.slice()
                    let  total = state.starConfig.total
                    if(payload.status === 0) {
                        starList.splice(starList.findIndex(item => item == payload.postId), 1)
                        total -= 1
                    } else {
                        starList.push(payload.postId)
                        total += 1
                    }
                    commit('updateStarConfig', {items: starList, total: total})
                },
                error => {

                }
            )
    }
}
  
const mutations = {
    setUserState(state, payload={id: '', role: '', account: '', nickname: ''}) {
        state.userConfig = {
            ...state.userConfig,
            ...payload
        }
    },
    updateStarConfig(state, payload = {items: [], total: 0}) {
        state.starConfig = {
            ...state.starConfig,
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