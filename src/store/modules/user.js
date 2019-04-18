import userApi from '@/assets/api/user'
import Vue from 'vue'
import router from '@/router'
import VueCookie from 'vue-cookie'
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
    // nickname: (state) => () => {
    //     return Vue.cookie.get('nickname') || state.userConfig.nickname || ''
    // }
}
  
const actions = {
    login({ commit }, payload={}) {
        userApi.login(payload).then(
            ({ data: userProfile }) => {
                // Vue.$userProfile.set(userProfile)
                commit('setUserState', userProfile)
                router.push({name: 'list'})
            },
            error => {
                console.log(error)
            }
        )
    },
    logout({ commit }) {
        userApi.logout().then(
            () => {
                // Vue.$userProfile.del()
                commit('setUserState', {nickname: ''})
            },
            error => {
                console.log(error)
            }
        )
    },
    register({ commit }, payload={}) {
        userApi.register(payload).then(
            (registerRes) => {
                // Vue.$userProfile.set(userProfile)
                commit('setUserState', registerRes)
            },
            error => {
                console.log(error)
            }
        )
    },
    modifyUserProfile({ commit }, payload={}) {
        userApi.modifyUserProfile(payload).then(
            (modifyUserProfileRes) => {
                // Vue.$userProfile.set(userProfile)
                commit('setUserState', modifyUserProfileRes)
            },
            error => {
                console.log(error)
            }
        )
        
    }
}
  
const mutations = {
    setUserState(state, payload={}) {
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