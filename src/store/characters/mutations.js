export default {
    saveCharactherData(state, payload) {
        state.charactersList = payload.results;
        state.charactersData = payload;
    },
    delete(state, payload) {
        state.charactersList.splice(payload, 1);
    },
    save(state, payload) {
        if (payload.i === -1) {
            state.charactersList.push(payload.value);
        } else {
            state.charactersList[payload.i] = payload.value;
            state.charactersList.push({});
            state.charactersList.pop();
        }
    },
};
