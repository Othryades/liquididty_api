<template>
    <transition name="fade">
        <div class="pa-8">
            <v-data-table :headers="headers" :loading="loading" class="elevation-3">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title
                            ><svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M20 22.09L22.45 23.58L21.8 20.77L24 18.89L21.11 18.64L20 16L18.87 18.64L16 18.89L18.18 20.77L17.5 23.58L20 22.09M14.08 21H2C.95 21 0 20.05 0 19V5C0 3.95 .95 3 2 3H22C23.05 3 24 3.95 24 5V15.53C22.94 14.58 21.54 14 20 14C16.69 14 14 16.69 14 20C14 20.34 14.03 20.68 14.08 21M8 13.91C6 13.91 2 15 2 17V18H14V17C14 15 10 13.91 8 13.91M8 6C6.35 6 5 7.35 5 9C5 10.65 6.35 12 8 12C9.65 12 11 10.65 11 9C11 7.35 9.65 6 8 6M21 10H14V11H21V10M22 8H14V9H22V8M22 6H14V7H22V6Z"
                                />
                            </svg>
                            Planets</v-toolbar-title
                        >
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New planets </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row> </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text> Cancel </v-btn>
                                    <v-btn color="blue darken-1" text> Save </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="text-h5">Are you sure you want to delete this planets?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text>Cancel</v-btn>
                                    <v-btn color="blue darken-1" text>OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2"> mdi-pencil </v-icon>
                    <v-icon small> mdi-delete </v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary"> Reset </v-btn>
                </template>
            </v-data-table>
        </div>
    </transition>
</template>

<script>
export default {
    name: "PlanetViews",
    data: () => ({
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
            return this.editedIndex === -1 ? "New planets" : "Edit planets";
        },
    },

    watch: {},

    created() {},

    methods: {},
    async mounted() {},
};
</script>
