import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import VueCookie from 'vue-cookie'
Vue.use(Vuex)
Vue.use(VueCookie)
const debug = process.env.NODE_ENV !== 'production'
const initUserProfile = store => {
    const _userProfile = Vue.cookie.get('userProfile') || ''
    console.log(_userProfile)
    if(_userProfile) {
        store.replaceState(
            Object.assign(store.state, {user: {userProfile: JSON.parse(_userProfile)}})
        )
    }
    store.subscribe((mutation, state) => {
        console.log(mutation)
        if(mutation.type.includes('user')) {
            if(mutation.type === 'user/logout') {
                Vue.cookie.delete('userProfile')
            } else {
                Vue.cookie.set('userProfile', JSON.stringify(mutation.payload), { expires: '1h' })
            }
        }
    })
}

export default new Vuex.Store({
    modules: {
        user
    },
    strict: debug,
    plugins: [ initUserProfile ]
})