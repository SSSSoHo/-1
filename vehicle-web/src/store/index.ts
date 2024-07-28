import { createStore } from 'vuex'

import { Itab } from './type'
interface State {
    tabslist: Array<Itab>
}
export const store = createStore<State>({
    state: {
        tabslist: []
    },
    mutations: {
        addTab(state: State, tab: Itab) {
            const isSame = state.tabslist.some((item) => item.path == tab.path);
            if (isSame == false) {
                state.tabslist.push(tab)
            }
        },
        removeTab(state: State, targetName: string) {
            const index = state.tabslist.findIndex((item) => item.path == targetName);
            state.tabslist.splice(index, 1);
        }
    },
    getters: {
        getAddtab(state: State) {
            return state.tabslist;
        }
    }
})