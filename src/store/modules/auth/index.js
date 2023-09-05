/**
 * @store Auth
 * @namespaced
 * @desc Main store for this application
 */
import state from './state'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getter from './getter'

const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getter,
}

export default auth