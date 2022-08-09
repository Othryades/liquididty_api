import charactersMutations from "./mutations";
import charactersActions from "./actions";
import charactersGetters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            charactersList: [],
            charactersData: [],
        };
    },
    getters: charactersGetters,
    mutations: charactersMutations,
    actions: charactersActions,
};
