import userApi from '@/assets/api/user'
import Vue from 'vue'
import router from '@/router'
import VueCookie from 'vue-cookie'
import * as GLOBAL from '@/assets/config'
Vue.use(VueCookie)
const state = {
    userConfig: {
        id: '',
        role: '',
        account: '',
        nickname: ''
    }
}
const getters = {
    
}

const actions = {
    login({ commit, state }, payload={}) {
        userApi.login(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                router.push({name: `${state.userConfig.role === GLOBAL.roleUser ? 'userIndex' : 'adminBlogList'}`})
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
                router.push({name: 'userIndex'})
            },
            error => {
                console.log(error)
            }
        )
    },
    modifyUserProfile({ commit }, payload={}) {
        userApi.modifyUserProfile(payload).then(
            ({ data: userProfile }) => {
                commit('setUserState', userProfile)
                router.push({name: `${state.userConfig.role === GLOBAL.roleUser ? 'userIndex' : 'adminBlogList'}`})
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}