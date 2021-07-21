<template>
  <v-container>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          class="mt-10"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-container class="mx-0">
        <apexcharts width="350px" height="350px" type="line" :options="chartOptions" :series="series"></apexcharts>
    </v-container>
    <v-container class="mx-0">
        <kategori-ben/>
    </v-container>
    <v-container class="mx-0">
        <provinsi/>
    </v-container>
    <v-container class="mx-0 mb-12">
        <kabupaten/>
    </v-container>
    
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import KategoriBen from './KategoriBen.vue'
import Provinsi from './Provinsi.vue'
import Kabupaten from './Kabupaten.vue'

  export default {
    name: 'Statistik',
    components: {
        apexcharts: VueApexCharts,
        KategoriBen,
        Provinsi,
        Kabupaten
    },
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],
    }),
  }
</script>
<style>
/*  */
</style>