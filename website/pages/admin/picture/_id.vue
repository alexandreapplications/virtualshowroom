<template>
  <v-container grid-list-md text-xs-justified>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>Editar o registro</v-card-title>
          <v-card-text>
            <v-form ref="editRecordForm" v-model="valid" lazy-validation>
              <v-text-field v-model="record.name" label="Nome" required :rules="requiredRules"></v-text-field>
              <v-text-field v-model="record.author" label="Autor" required :rules="requiredRules"></v-text-field>
              <v-text-field
                v-model="record.collection"
                label="Coleção"
                required
                :rules="requiredRules"
              ></v-text-field>
              <v-textarea
                v-model="record.description"
                label="Descrição"
                required
                :rules="requiredRules"
              ></v-textarea>
              <v-text-field v-model="record.price" label="Preço" required></v-text-field>
              <v-text-field v-model="record.url" label="Url da Imagem" required></v-text-field>
              <v-checkbox v-model="record.sold" label="Vendido"></v-checkbox>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="orange" @click="validateForm()">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  validate({ params }) {
    // Must be a number
    return /^[\w\s\d]+$/.test(params.id)
  },
  data({ params }) {
    return {
      valid: true,
      record: {},
      requiredRules: [
        v => !!v || 'Campo Obrigatório',
        v => (v && v.length > 4) || 'O campo deverá ter pelo menos 4 caracteres'
      ]
    }
  },
  methods: {
    getData: function(id) {
      axios
        .get(`http://localhost:5000/paintshowroom/us-central1/paint/${id}`)
        .then(res => {
          this.record = res.data
        })
    },
    validateForm() {
      if (this.$refs.editRecordForm.validate()) {
        alert('valid')
      } else {
        alert('invalid')
      }
    }
  },
  created() {
    this.getData(this.$route.params.id)
  }
}
</script>
