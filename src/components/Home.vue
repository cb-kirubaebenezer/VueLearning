<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-card class="logo">
        <img src="../assets/cb_logo.png" height="80"></img>
      </v-card>
      <v-list dense>
        <v-list-tile @click="traverse(item)" v-for="item in items">
          <v-list-tile-content>
            <v-list-tile-title>{{item}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-layout align-end justify-end>
        <v-flex xs1>
          <v-icon>power_settings_new</v-icon>
        </v-flex>
      </v-layout>

    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout align-start justify-center fill-height>
          <component v-bind:is="route"></component>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { eventBus } from "../main";
  import Plans from "@/components/Plans";
  import About from "@/components/About";
  import NewPlan from "@/components/NewPlan";
  import ShowPlan from "@/components/ShowPlan";
  export default {
    data: () => ({
      drawer: true,
      mini: true,
      server: null,
      items: [
        "Home",
        "Customers",
        "Subscription",
        "Plans",
        "Addons",
        "Coupons",
        "Settings",
      ],
      route: About
    }),
    props: {
      source: String
    },
    methods: {
      traverse: function (value) {
        switch (value) {
          case "About":
            this.route = About;
            break;
          case "Plans":
            this.$router.push("plans");
            break;
          case "":
            break;
          default:
            break;
        }
      }
    },
    computed:
    {
    },
    created() {
      eventBus.$on("serverSelected", server => {
        switch (server) {
          case "NewPlan":
            break;
          case "Plan Created":
            break;
        }
      });
      eventBus.$on("planSelected", plan => {
        this.route = ShowPlan;
        this.$refs.childComponent.setPlan(plan);
        console.log("Show Plan...");
      });
      eventBus.$on("listPlans", msg => {
        this.route = Plans;
      });
    },
    mounted() {
      console.log(this.$refs.childComponent);
    }
  };
</script>
<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>