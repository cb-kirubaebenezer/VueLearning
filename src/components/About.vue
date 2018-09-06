<template>
  <v-app id="app">
    <v-layout class="parent" align-start justify-center fill-height>
      <v-flex xs9>
        <v-carousel hide-controls>
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
        <v-card>
          <v-layout align-start justify-center fill-height>
            <v-flex xs10>
              <p align="justify">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
                some form, by injected humour, or randomised words which don't look even slightly believable. If you are
                going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
                with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
            </v-flex>
          </v-layout>
        </v-card>
        <!-- <v-card>
          <v-layout align-start justify-center fill-height>
            <v-flex xs10>
              <p align="justify">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
                some form, by injected humour, or randomised words which don't look even slightly believable. If you are
                going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
                with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated
                Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
            </v-flex>
          </v-layout>
        </v-card> -->
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
  export default {
    props: {},
    data() {
      return {
        items: [
          {
            src: 'https://cdn.pixabay.com/photo/2016/03/26/13/09/notebook-1280538_1280.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2015/02/02/11/09/office-620822_1280.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_1280.jpg'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2018/06/21/20/23/lamp-3489395_1280.jpg'
          }
        ]
      };
    },
    methods: {},
    computed: {}
  };
</script>
<style>
  .parent{
    margin-top: -10%;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>