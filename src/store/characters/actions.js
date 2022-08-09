import { getCharacters } from "../../API/getCharacters.js";

export default {
    saveCharactherData(context, payload) {
        context.commit("saveCharactherData", payload);
    },
    async fetchCharactersData(context, obj) {
        const response = await getCharacters(obj);
        context.commit("saveCharactherData", response.data);
        return response.data;
    },
    delete(context, payload) {
        context.commit("delete", payload);
    },
    save(context, payload) {
        context.commit("save", payload);
    },
};
