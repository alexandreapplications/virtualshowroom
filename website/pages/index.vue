<template>
  <v-container grid-list-md text-xs-justified>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="item in dataList" :key="item.id">
        <v-card>
          <v-img v-bind:src="item.url" height="300px"></v-img>
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.author}}</v-card-text>
          <v-card-actions>
            <!-- <router-link :to="'/imovel/' + filtro.nrRefImovel" append>{{ filtro.nomeSite}}</router-link> -->
            <v-btn flat color="orange" v-on:click="goDetails(item)">Detalhes</v-btn>
            <v-btn flat color="orange" v-on:click="goContact(item)">Contato</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getData: function() {
      axios
        .get('http://localhost:5000/paintshowroom/us-central1/paint')
        .then(res => {
          this.dataList = res.data
        })
    },
    goDetails: function(model) {
      this.$router.push(`./${model.id}`)
    },
    goContact: function(model) {
      this.$router.push(`./contact/${model.id}`)
    }
  },
  created() {
    this.getData()
  }
}
</script>
