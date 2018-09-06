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
      <v-toolbar-title>Plan</v-toolbar-title>
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
                    <v-btn @click="editPlan" fab dark color="indigo">
                      <v-icon dark>edit</v-icon>
                    </v-btn>
                    <v-btn @click="createPlan" fab dark color="indigo">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn @click="goHome" fab dark color="indigo">
                      <v-icon dark>home</v-icon>
                    </v-btn>
                    <v-btn @click="listPlans" fab dark color="indigo">
                      <v-icon dark>arrow_back</v-icon>
                    </v-btn>
                  </v-layout>

                </v-flex>
              </v-layout>
              <v-layout align-start justify-center fill-height>
                <v-flex xs11>
                  <v-container fluid grid-list-lg>
                    <v-layout row wrap align-start justify-center>
                      <v-flex xs12>
                        <!-- Plan Details -->
                        <v-card>
                          <v-layout align-start justify-center fill-height>
                            <v-flex xs12>
                              <v-layout align-start justify-start>
                                <v-flex xs12>
                                  <h3>Plan Details</h3>
                                </v-flex>
                              </v-layout>

                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Name</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{plan.name}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Id</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{plan.planId}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex  xs2>
                                  <p >Invoice Name</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p >{{plan.invoiceName}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Description</p>
                                </v-flex>
                                <v-flex xs10>
                                  <p align="justify"> {{plan.description}}</p>
                                </v-flex>
                              </v-layout>

                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Status</p>
                                </v-flex>
                                <v-flex xs1>
                                  <v-chip color="green" text-color="white">Success</v-chip>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                        <!-- Pricing and Billing Interval -->
                        <v-card>
                          <v-layout align-start justify-center fill-height>
                            <v-flex xs12>
                              <v-layout align-start justify-start>
                                <v-flex xs12>
                                  <h3>Pricing and Billing Interval</h3>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Recurring charge model</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{flatFeeOrPerUnit}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Bill Every</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{billEvery}} {{billing_cycle}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Price</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>USD {{plan.price}} {{flatFeeOrPerUnit}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Setup Fee</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>USD {{plan.setupCost}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Billing Cycles</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{noOfBillingCycles}}</p>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>
                        <!-- Trial and Freemium -->
                        <v-card>
                          <v-layout align-start justify-center fill-height>
                            <v-flex xs12>
                              <v-layout align-start justify-start>
                                <v-flex xs12>
                                  <h3>Trial and Freemium</h3>
                                </v-flex>
                              </v-layout>
                              <v-layout align-start justify-start>
                                <v-flex xs2>
                                  <p>Trial Period</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{freeTrailValue}} {{freeTrailCycle}}</p>
                                </v-flex>
                              </v-layout>
                              <v-layout v-show="per_unit_visible" align-start justify-start>
                                <v-flex xs2>
                                  <p>Free Quantity</p>
                                </v-flex>
                                <v-flex xs1>
                                  <p>{{freeQuantity}}</p>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-card>

                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
    </v-content>
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
    props: {},
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
        plan: {},
        flat_fee_visible: true,
        per_unit_visible: false,
        flatFeeOrPerUnit: "",
        bill_every: "",
        price: "USD",
        setup_fee: "",
        billing_cycle: "",
        trial_period: "",
        billEvery: "",
        noOfBillingCycles: "",
        billing_cycle:"",
        freeTrailValue:"",
        freeTrailCycle:"",
        freeQuantity:"",
      };
    },
    methods: {
      traverse: function (value) {
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
      listPlans: function () {
        console.log("hi");
        this.$router.push("/plans");
      },
      editPlan: function (plan) { },
      createPlan: function () {
        console.log("New Plan initated.");
        this.$router.push("/newplan");
      },
      goHome: function () {
        this.$router.push("/");
      }
    },
    created() {
      let plan_id = this.$route.params.id;
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios
        .get(this.baseUrl + "/plans/" + plan_id)
        .then(response => {
          this.plan = response.data;
          if (this.plan.pricingModel.flatFee != null) {
            this.flat_fee_visible = true;
            this.per_unit_visible = false;
            this.flatFeeOrPerUnit = "Flat Fee";
            this.noOfBillingCycles = this.plan.pricingModel.flatFee.noOfBillingCycles;
            this.billing_cycle = this.plan.pricingModel.flatFee.cycle.chosenCycle;
            this.billEvery = this.plan.pricingModel.flatFee.cycle.value;
          } else {
            this.flat_fee_visible = false;
            this.per_unit_visible = true;
            this.flatFeeOrPerUnit = "Per Unit"
            this.noOfBillingCycles = this.plan.pricingModel.perUnit.noOfBillingCycles;
            this.billing_cycle = this.plan.pricingModel.perUnit.cycle.chosenCycle;
            this.billEvery = this.plan.pricingModel.perUnit.cycle.value;
            this.freeQuantity = this.plan.pricingModel.perUnit.freeQuantity;
          }
          this.freeTrailValue = this.plan.freeTrail.cycle.value;
          this.freeTrailCycle = this.plan.freeTrail.cycle.chosenCycle;
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

  .title {
    font-size: 8px;
  }
  .tag{
    margin-left: 5%;
  }
  .value{
    margin-right: 70%;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>