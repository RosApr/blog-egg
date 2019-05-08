import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import blog from './modules/blog'
import categories from './modules/categories'
import VueCookie from 'vue-cookie'
import { pagination } from '@/assets/config'
Vue.use(Vuex)
Vue.use(VueCookie)
const debug = process.env.NODE_ENV !== 'production'
const initUserProfile = store => {
    const _userProfile = Vue.cookie.get('userProfile') || ''
    if(_userProfile && _userProfile != 'undefined') {
        store.dispatch('user/queryStarConfig')
        store.replaceState(
            Object.assign({}, store.state, {
                user: {
                    userConfig: JSON.parse(_userProfile),
                    pagination,
                    list: []
                }
            })
        )
    }
    store.subscribe((mutation, state) => {
        const mutationType = mutation.type
        const mutationPayload = mutation.payload
        if(mutationType=== 'user/setUserState') {
            if(mutationPayload) {
                Vue.cookie.set('userProfile', JSON.stringify(mutationPayload), { expires: '1h' })
            } else {
                Vue.cookie.delete('userProfile')
            }
        }
    })
}
const initCategoryList = store => {
    store.dispatch('categories/queryCategoryList', {})
}
export default new Vuex.Store({
    modules: {
        user,
        blog,
        categories
    },
    strict: debug,
    plugins: [ initUserProfile, initCategoryList ]
})