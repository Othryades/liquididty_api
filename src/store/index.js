import Vue from "vue";
import Vuex from "vuex";
import characterModule from "./characters/index.js";
import { fetchData } from "../API/fetchData";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
    modules: {
        characters: characterModule,
    },
    strict: process.env.DEV,
    state() {
        return {
            films: [],
            planets: [],
        };
    },
    getters: {
        getFilms(state) {
            return state.films;
        },
        getPlanets(state) {
            return state.planets;
        },
    },
    mutations: {
        saveFilmsData(state, payload) {
            state.films = payload.results;
        },
        savePlanetsData(state, payload) {
            state.planets = payload.results;
        },
    },
    actions: {
        saveFilmsData(context, payload) {
            context.commit("saveFilmsData", payload);
        },
        savePlanetsData(context, payload) {
            context.commit("savePlanetsData", payload);
        },
        async fetchData(context, obj) {
            const response = await fetchData(obj);
            if (obj.endPoint === "films") {
                context.commit("saveFilmsData", response.data);
            } else if (obj.endPoint === "planets") context.commit("savePlanetsData", response.data);
            return response.data;
        },
    },
});
