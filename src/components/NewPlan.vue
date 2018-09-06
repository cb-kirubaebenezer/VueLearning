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
      <v-toolbar-title>New Plan</v-toolbar-title>
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
            <v-flex xs12>
              <v-layout justify-end class="createPlan">

                <v-btn @click="goHome" fab dark color="indigo">
                  <v-icon dark>home</v-icon>
                </v-btn>
                <v-btn @click="listPlans" fab dark color="indigo">
                  <v-icon dark>arrow_back</v-icon>
                </v-btn>
              </v-layout>
              <v-layout align-start justify-center fill-height>
                <v-flex xs12>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-container fluid grid-list-lg>
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-card>
                            <v-layout align-start justify-center fill-height>
                              <v-flex xs12>
                                <v-layout align-start justify-start>
                                  <v-flex xs12>
                                    <h3>New Plan</h3>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-text-field v-model="planname" :rules="nameRules" :counter="20" label="Plan Name" required></v-text-field>
                                    <p align="justify">A descriptive name for this plan. Please note that this will be displayed to customers,
                                      in case "Invoice Name" field is not provided.</p>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-text-field v-model="invoicename" :counter="20" label="Invoice Name" required></v-text-field>
                                    <p align="justify">Name displayed to your customers on the hosted payment pages, customer portal and invoices.</p>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-textarea name="input-7-4" label="Description" v-model="description"></v-textarea>
                                    <p align="justify">Description about the plan to show in the customer portal when users change their subscription.</p>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>

                          <v-card>
                            <v-layout align-start justify-center fill-height>
                              <v-flex xs12>
                                <v-layout align-start justify-start>
                                  <v-flex xs12>
                                    <h3>Pricing</h3>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-text-field v-model="price" :counter="10" label="Price" required></v-text-field>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-text-field v-model="setupcost" :counter="10" label="Setup Cost" required></v-text-field>
                                    <p align="justify">One-time setup fee charged as part of the first invoice.</p>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>

                          <v-card>
                            <v-layout align-start justify-center fill-height>
                              <v-flex xs12>
                                <v-layout align-start justify-start>
                                  <v-flex xs12>
                                    <h3>Freemium and Billing Interval</h3>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-select v-model="pricing_selection" :items="pricing_model" :rules="[v => !!v || 'Pricing Model is required']" label="Pricing Model"
                                      v-on:change="showPricingModel" required></v-select>
                                    <p align="justify">Defines how the subscription recurring charge for this plan should be calculated.</p>
                                    <v-layout v-show="show_flat_fee">
                                      <v-flex xs12>
                                        <v-text-field v-model="billingcycle" :counter="10" label="Bill Every" @change="flat_fee_selected" required></v-text-field>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-select v-model="flat_fee_cycle_selection" :items="cycles" :rules="[v => !!v || ' Cycle is required']" label="Period" required
                                          v-on:change="flat_fee_selected"></v-select>
                                      </v-flex>
                                    </v-layout>
                                    <p v-show="show_flat_fee" align="justify">Ex: To bill quarterly: $30 every 3 months. To bill monthly: $9 every 1 month.</p>

                                    <v-layout v-show="show_per_unit">
                                      <v-flex xs12>
                                        <v-text-field v-model="billingcycle" :counter="10" label="Billing Cycle" @change="per_unit_selected" required></v-text-field>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-select v-model="per_unit_cycle_selection" :items="cycles" :rules="[v => !!v || ' Cycle is required']" label="Period" required
                                          v-on:change="per_unit_selected"></v-select>
                                      </v-flex>
                                      <v-flex xs12>
                                        <v-text-field v-model="freeperunit" :counter="10" label="Free Per Unit" @change="per_unit_selected" required></v-text-field>
                                      </v-flex>
                                    </v-layout>
                                    <p v-show="show_per_unit" align="justify">If your plans are quantity based, configure the free quantity this plan may have. Subscribers
                                      signing up for this plan will only be charged for the quantity more than this value.</p>
                                    <v-text-field v-model="noOfbillingcycle" :counter="10" label="NoBilling Cycle" required></v-text-field>
                                    <p align="justify">Default number of billing cycles the subscriptions of this plan should run.</p>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>

                          <v-card>
                            <v-layout align-start justify-center fill-height>
                              <v-flex xs12>
                                <v-layout align-start justify-start>
                                  <v-flex xs12>
                                    <h3>Trial</h3>
                                  </v-flex>
                                </v-layout>
                                <v-layout align-center justify-center>
                                  <v-flex xs8>
                                    <v-layout>
                                      <v-flex xs3>
                                        <v-text-field v-model="freeTrailValue" :counter="10" label="Free Trial" @change="free_selected" required></v-text-field>
                                      </v-flex>
                                      <v-flex xs3 offset-xs1>
                                        <v-select v-model="free_cycle_selection" :items="cycles" :rules="[v => !!v || ' Cycle is required']" label="Period" required
                                          v-on:change="free_selected"></v-select>
                                      </v-flex>
                                    </v-layout>
                                  </v-flex>
                                </v-layout>
                              </v-flex>
                            </v-layout>
                          </v-card>
                          <v-card>
                            <v-layout align-start justify-center fill-height>
                              <v-flex xs12>
                                <v-btn :disabled="!valid" @click="submit" color="primary" class="text-transform-none">
                                  Submit
                                </v-btn>
                                <v-btn @click="clear" color="error" class="text-transform-none">Clear</v-btn>
                              </v-flex>
                            </v-layout>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>

                  </v-form>
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
        "Settings"
      ],

      baseUrl: "http://192.168.11.133:8081",
      valid: true,
      planname: "",
      invoicename: "",
      description: "",
      price: 0.0,
      setupcost: 0.0,
      pricing_selection: "Flat Fee",
      pricing_model: ["Flat Fee", "Per Unit"],
      billingcycle: 1,
      noOfbillingcycle: 0,
      cycles: ["Weeks", "Months", "Years"],
      flat_fee_cycle_selection: "Months",
      per_unit_cycle_selection: "Months",
      freeperunit: 0,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 20) || "Name must be less than 10 characters"
      ],
      freeTrailValue: 0,
      free_cycle_selection: "Months",
      show_flat_fee: true,
      show_per_unit: false,
      pricing_selected_model: {},
      free_trial_selected: {}
    }),

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
      submit() {
        let axiosConfig = {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }
        };
        let postData = {
          planId: this.planname,
          name: this.planname,
          invoiceName: this.invoicename,
          description: this.description,
          price: this.price,
          setupCost: this.setupcost,
          pricingModel: this.pricing_selected_model,
          freeTrail: this.free_trial_selected,
          addonApplicablityType: "All addons are applicable"
        };
        if (this.$refs.form.validate()) {
          axios
            .post(this.baseUrl + "/plan/new", postData, axiosConfig)
            .then(response => {
              console.log(response);
              this.$router.push("plans");
            })
            .catch(error => {
              console.log(error.response);
            });
        }
      },
      listPlans: function () {
        console.log("hi");
        this.$router.push("/plans");
      },
      goHome: function () {
        this.$router.push("/");
      },
      clear() {
        this.$refs.form.reset();
      },
      showPricingModel: function (a) {
        if (this.pricing_selection == "Flat Fee") {
          this.show_flat_fee = true;
          this.show_per_unit = false;
        } else {
          this.show_flat_fee = false;
          this.show_per_unit = true;
        }
      },
      flat_fee_selected: function () {
        var flatFee = {
          noOfBillingCycles: this.noOfbillingcycle,
          cycle: {
            weeks: false,
            months: false,
            years: false,
            value: this.billingcycle
          }
        };
        if (this.flat_fee_cycle_selection == "Months") {
          flatFee.cycle.months = true;
        } else if (this.flat_fee_cycle_selection == "Weeks") {
          flatFee.cycle.weeks = true;
        } else {
          flatFee.cycle.years = true;
        }
        this.pricing_selected_model = {
          flatFee: flatFee
        };
        console.log(this.pricing_selected_model);
      },
      per_unit_selected: function () {
        var perUnit = {
          noOfBillingCycles: this.noOfbillingcycle,
          cycle: {
            weeks: false,
            months: false,
            years: false,
            value: this.billingcycle
          },
          freeQuantity: this.freeperunit
        };
        if (this.per_unit_cycle_selection == "Months") {
          perUnit.cycle.months = true;
        } else if (this.per_unit_cycle_selection == "Weeks") {
          perUnit.cycle.weeks = true;
        } else {
          perUnit.cycle.years = true;
        }
        this.pricing_selected_model = {
          perUnit: perUnit
        };
        console.log(this.pricing_selected_model);
      },
      free_selected: function () {
        var freeTrail = {
          cycle: {
            weeks: false,
            months: false,
            years: false,
            value: this.freeTrailValue
          }
        };
        if (this.free_cycle_selection == "Months") {
          freeTrail.cycle.months = true;
        } else if (this.free_cycle_selection == "Weeks") {
          freeTrail.cycle.weeks = true;
        } else {
          freeTrail.cycle.years = true;
        }
        this.free_trial_selected = freeTrail;
        console.log(this.free_trial_selected);
      }
    }
  };
</script>
<style scoped>
  .parent {
    margin-bottom: 0%;
  }

  .text-transform-none {
    text-transform: none !important;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>