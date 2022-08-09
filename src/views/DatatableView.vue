<template>
    <transition name="fade">
        <div class="pa-8">
            <v-data-table
                :headers="headers"
                :items="getCharactersList"
                :server-items-length="getCharactersData && getCharactersData.count"
                :options.sync="options"
                :loading="loading"
                class="elevation-3"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title
                            ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M20 22.09L22.45 23.58L21.8 20.77L24 18.89L21.11 18.64L20 16L18.87 18.64L16 18.89L18.18 20.77L17.5 23.58L20 22.09M14.08 21H2C.95 21 0 20.05 0 19V5C0 3.95 .95 3 2 3H22C23.05 3 24 3.95 24 5V15.53C22.94 14.58 21.54 14 20 14C16.69 14 14 16.69 14 20C14 20.34 14.03 20.68 14.08 21M8 13.91C6 13.91 2 15 2 17V18H14V17C14 15 10 13.91 8 13.91M8 6C6.35 6 5 7.35 5 9C5 10.65 6.35 12 8 12C9.65 12 11 10.65 11 9C11 7.35 9.65 6 8 6M21 10H14V11H21V10M22 8H14V9H22V8M22 6H14V7H22V6Z"
                                />
                            </svg>
                            Characters</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New character </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.gender" label="gender"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.birth_year" label="birth_year"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.height" label="Height"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.mass" label="Mass"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                                    <v-btn color="blue darken-1" text @click="saveChange"> Save </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this character?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
                    <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
                </template>
            </v-data-table>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { getCharacters } from "../API/getCharacters.js";
import { getPages } from "../API/getPages";

import axios from "axios";

export default {
    name: "Search",
    data: () => ({
        ...mapState("characters", ["userInput", "charactersList"]),
        dialog: false,
        dialogDelete: false,
        loading: true,
        options: {},
        headers: [
            {
                text: "Name",
                align: "start",
                value: "name",
            },
            { text: "Gender", value: "gender" },
            { text: "birth_year", value: "birth_year" },
            { text: "height", value: "height" },
            { text: "mass", value: "mass" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: "",
            gender: "",
            birth_year: "",
            height: "",
            mass: "",
        },
        defaultItem: {
            name: "",
            gender: "",
            birth_year: "",
            height: "",
            mass: "",
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New character" : "Edit character";
        },
        ...mapGetters("characters", ["getCharactersList", "getCharactersData"]),
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        options: {
            handler(newVal) {
                const hash = this.getHashValue("search");
                const pageNumber = this.options.page || 1;
                this.requestPeople(hash, pageNumber);
            },
            deep: true,
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        ...mapActions("characters", ["saveCharactherData", "delete", "save"]),

        initialize() {
            this.characters = this.getCharactersList;
        },

        editItem(item) {
            this.editedIndex = this.getCharactersList.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.getCharactersList.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.delete(this.editedIndex);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.resetTempVariables();
        },

        closeDelete() {
            this.dialogDelete = false;
            this.resetTempVariables();
        },

        saveChange() {
            this.save({
                i: this.editedIndex,
                value: this.editedItem,
            });
            this.resetTempVariables();
            this.close();
        },

        resetTempVariables() {
            this.editedIndex = -1;
            this.editedItem = {
                name: "",
                gender: "",
                birth_year: "",
                height: "",
                mass: "",
            };
        },

        getHashValue(key) {
            const matches = location.hash.match(new RegExp(key + "=([^&]*)"));
            return matches ? matches[1] : null;
        },

        async requestPeople(hash, num) {
            // const { page } = this.options;
            this.loading = true;
            const response = await getPages(hash, num);
            this.saveCharactherData(response.data);
            this.loading = false;
        },
    },
    async mounted() {
        // get hash param
        const hash = this.getHashValue("search");
        const res = await this.requestPeople(hash, 1);
    },
};
</script>
