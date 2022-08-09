<style scoped>
.search-input:focus {
    outline: none;
}
</style>
<template>
    <div class="pa-8">
        <v-container class="mb-6">
            <v-row no-gutters class="justify-center">
                <v-col class="col-md-8">
                    <v-toolbar>
                        <v-toolbar-title class="pr-6">Query the Star Wars API: </v-toolbar-title>
                        <input
                            @input="searchInput"
                            v-model="userInput"
                            type="text"
                            placeholder="..."
                            class="search-input pa-1 rounded elevation-2"
                        />
                    </v-toolbar>
                </v-col>
            </v-row>
            <v-row no-gutters class="justify-center">
                <v-col class="col-md-8">
                    <v-list v-if="userInput.length > 0" dense color="grey lighten-4" class="elevation-2">
                        <template v-if="state.people">
                            <v-subheader>Characters</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="(item, i) in getCharactersList.slice(0, 3)" :key="i">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item-title class="pl-4"
                                    ><v-btn color="secondary" elevation="2" small @click.stop="handleSeeAll('list')"
                                        >see all</v-btn
                                    ></v-list-item-title
                                >
                            </v-list-item-group>
                        </template>
                        <template v-if="state.films">
                            <v-subheader>Films</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="(item, i) in getFilms.slice(0, 3)" :key="i">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item-title class="pl-4"
                                    ><v-btn color="secondary" elevation="2" small @click.stop="handleSeeAll('films')"
                                        >see all</v-btn
                                    ></v-list-item-title
                                >
                            </v-list-item-group>
                        </template>
                        <template v-if="state.planets">
                            <v-subheader>Planets</v-subheader>
                            <v-list-item-group color="primary">
                                <v-list-item v-for="(item, i) in getPlanets.slice(0, 3)" :key="i">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item-title class="pl-4"
                                    ><v-btn color="secondary" elevation="2" small @click.stop="handleSeeAll('planets')"
                                        >see all</v-btn
                                    ></v-list-item-title
                                >
                            </v-list-item-group>
                        </template>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { debounce } from "debounce";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Search",
    data() {
        return {
            userInput: "",
            state: {
                people: false,
                films: false,
                planets: false,
            },
        };
    },
    methods: {
        ...mapActions("characters", ["fetchCharactersData"]),
        ...mapActions(["fetchData"]),

        async requestPeople() {
            const response = await this.fetchCharactersData({
                endPoint: "people",
                param: this.userInput,
            });
            if (response.results.length > 0) {
                this.state.people = true;
            } else {
                this.state.people = false;
            }
        },
        async requestFilms() {
            const response = await this.fetchData({
                endPoint: "films",
                param: this.userInput,
            });
            if (response.results.length > 0) {
                this.state.films = true;
            } else {
                this.state.films = false;
            }
        },
        async requestPlanets() {
            const response = await this.fetchData({
                endPoint: "planets",
                param: this.userInput,
            });
            if (response.results.length > 0) {
                this.state.planets = true;
            } else {
                this.state.planets = false;
            }
        },
        searchInput: debounce(async function (e) {
            const values = await Promise.all([this.requestPeople(), this.requestFilms(), this.requestPlanets()]);
        }, 200),
        handleSeeAll(path) {
            this.$root.$router.push({
                path: path,
                query: { search: this.userInput },
            });
        },
    },
    computed: {
        ...mapGetters("characters", ["getCharactersList"]),
        ...mapGetters(["getFilms", "getPlanets"]),
    },
};
</script>
