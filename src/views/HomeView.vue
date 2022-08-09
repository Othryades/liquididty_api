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
                        <template v-if="localState.showPeople">
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
                        <template v-if="localState.showFilms">
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
                        <template v-if="localState.showPlanets">
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
            localState: {
                showPeople: false,
                showFilms: false,
                showPlanets: false,
            },
        };
    },
    computed: {
        ...mapGetters("characters", ["getCharactersList"]),
        ...mapGetters(["getFilms", "getPlanets"]),
    },
    methods: {
        ...mapActions("characters", ["fetchCharactersData"]),
        ...mapActions(["fetchData"]),

        async requestPeople() {
            await this.fetchCharactersData({
                endPoint: "people",
                search: this.userInput,
            });

            if (this.getCharactersList.length > 0) {
                this.localState.showPeople = true;
            } else {
                this.localState.showPeople = false;
            }
        },
        async requestFilms() {
            await this.callApi("films");

            if (this.getFilms.length > 0) {
                this.localState.showFilms = true;
            } else {
                this.localState.showFilms = false;
            }
        },
        async requestPlanets() {
            await this.callApi("planets");
            if (this.getPlanets.length > 0) {
                this.localState.showPlanets = true;
            } else {
                this.localState.showPlanets = false;
            }
        },
        async callApi(endPoint) {
            await this.fetchData({
                endPoint,
                search: this.userInput,
            });
        },
        searchInput: debounce(async function (e) {
            await Promise.all([this.requestPeople(), this.requestFilms(), this.requestPlanets()]);
        }, 200),
        handleSeeAll(path) {
            this.$root.$router.push({
                path: path,
                query: { search: this.userInput },
            });
        },
    },
};
</script>
