import userApi from '@/assets/api/user'
import Vue from 'vue'
import router from '@/router'
const state = {
    userConfig: {
        nickname: ''
    }
}

const getters = {
    nickname: (state) => () => {
        return Vue.cookie.get('nickname') || state.userConfig.nickname || ''
    }
}
  
const actions = {
    login({ commit }, payload={}) {
        userApi.login(payload).then(
            ({ data: userProfile }) => {
                Vue.cookie.set('nickname', userProfile.nickname, { expires: '1h' })
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
                Vue.cookie.delete('nickname')
                commit('setUserState', {})
            },
            error => {
                console.log(error)
            }
        )
    },
    register({ commit }, payload={}) {
        userApi.register(payload).then(
            (registerRes) => {
                Vue.cookie.set('nickname', registerRes.nickname, { expires: '1h' })
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
                Vue.cookie.set('nickname', modifyUserProfileRes.nickname, { expires: '1h' })
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
        state = {
            userConfig: {
                ...state.userConfig,
                ...payload
            },
            
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