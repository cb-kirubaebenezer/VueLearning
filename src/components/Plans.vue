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
      <v-toolbar-title>Plans</v-toolbar-title>
      <v-layout align-end justify-end>
        <v-flex xs1>
          <v-icon>power_settings_new</v-icon>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout class="parent" align-start justify-center fill-height>
          <v-layout align-start justify-center fill-height>
            <v-flex xs10>
              <v-layout align-start justify-center fill-height>
                <v-flex xs12>
                  <v-layout justify-end class="createPlan">
                    <v-btn @click="createPlan" fab dark color="indigo">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn @click="goHome" fab dark color="indigo">
                      <v-icon dark>home</v-icon>
                    </v-btn>
                  </v-layout>

                </v-flex>
              </v-layout>
              <v-layout align-start justify-center fill-height>
                <v-flex xs11>
                  <v-card>
                    <v-list three-line>
                      <template v-for="(item, index) in plans">
                        <v-subheader v-if="item.header" :key="item.header">
                          {{ item.header }}
                        </v-subheader>

                        <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>

                        <v-list-tile v-else :key="item.name" avatar @click="planSelected(item)">
                          <v-list-tile-content>
                            <v-list-tile-title v-html="item.name"></v-list-tile-title>
                            <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios";
import { eventBus } from "../main";
import Plans from "@/components/Plans";
import About from "@/components/About";
import NewPlan from "@/components/NewPlan";
import ShowPlan from "@/components/ShowPlan";
export default {
  data() {
    return {
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
        "Settings"
      ],

      baseUrl: "http://192.168.11.133:8081",
      plans: [],
      copyOfPlan: []
    };
  },
  methods: {
    traverse: function(value) {
      switch (value) {
        case "Home":
          this.$router.push("/");
          break;
        case "Plans":
          this.$router.push("/plans");
          break;
        case "":
          break;
        default:
          break;
      }
    },
    createPlan: function() {
      console.log("New Plan initated.");
      this.$router.push("/newplan");
    },

    planSelected: function(plan) {
      this.copyOfPlan.forEach(element => {
        if (element.planId == plan.id) {
          this.$router.push("showplan/" + element.id);
        }
      });
    },
    goHome: function() {
      this.$router.push("/");
    }
  },
  created() {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get(this.baseUrl + "/plans")
      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response);
        this.copyOfPlan = response.data;
        this.plans.push({ header: "Plans" });
        response.data.forEach(element => {
          this.plans.push({
            id: element.planId,
            name: element.name,
            description:
              "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          });
          this.plans.push({ divider: true, inset: true });
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
<style scoped>
.parent {
  margin-bottom: 0%;
}

.createPlan {
  padding-bottom: 10px;
}

.container {
  padding: 0 !important;
  margin-top: 0px;
}
</style>