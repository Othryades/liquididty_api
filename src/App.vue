<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
                    <v-list-item-icon class="mr-2">
                        <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                            />
                        </svg>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app dark shrink-on-scroll src="./assets/vader.png" height="255" elevation="12">
            <template v-slot:img="{ props }">
                <v-img v-bind="props"></v-img>
            </template>

            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <transition name="slide" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            drawer: null,
            items: [
                { title: "Search", icon: "mdi-view-dashboard", to: "/" },
                // { title: "List", icon: "mdi-file-table", to: "/list" },
            ],
        };
    },
};
</script>
<style>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}
.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-30%);
}
</style>
