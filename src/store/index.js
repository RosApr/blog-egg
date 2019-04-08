import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user
    },
    strict: debug
})