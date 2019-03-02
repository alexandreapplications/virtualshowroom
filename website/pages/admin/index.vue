<template>
  <v-container grid-list-md text-xs-justified>
    <v-layout column text-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>Mensagens</v-card-title>
          <v-list>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-content>Nenhuma mensagem</v-list-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>Visitas</v-card-title>
          <v-list>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>Esta semana</v-list-tile-content>
              <v-list-tile-avatar>10</v-list-tile-avatar>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card>
          <v-card-title>Quadros</v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" v-on:click="goEdit(true)">Adicionar</v-btn>
          </v-card-actions>
          <v-list two-line>
            <template v-for="item in dataList">
              <v-divider :key="item.index" :inset="item.inset"></v-divider>
              <v-list-tile :key="item.id" avatar @click="goEdit(false, item)">
                <v-list-tile-avatar>
                  <img :src="item.url">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
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
    goEdit: function(edit, model) {
      this.$router.push(`/admin/picture/${model.id}`)
    }
  },
  created() {
    this.getData()
  }
}
</script>
