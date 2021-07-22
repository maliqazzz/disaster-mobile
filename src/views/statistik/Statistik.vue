<template>
  <v-container fluid class="statistik">
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-card class="px-3 mx-0 mb-3" width="390">
          <v-text-field
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            class="mt-10"
          ></v-text-field>
        </v-card>
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

    <v-card class="mx-0 mb-3" width="390">
      <div class="d-flex flex-row">
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Bencana</span>
          <span class="text-h5">124</span>
        </v-col>
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Provinsi</span>
          <span class="text-h5">15</span>
        </v-col>
        <v-col class="d-flex flex-column">
          <span class="subtitle-2">Kabupaten</span>
          <span class="text-h5">2456</span>
        </v-col>
      </div>
      <apexcharts width="370px" height="300px" type="line" :options="chartOptions" :series="series"></apexcharts>
    </v-card>

    <kategori-ben class="mx-0 mb-3"/>
    
    <provinsi class="mx-0 mb-3"/>

    <kabupaten class="mx-0 mb-15"/>
    
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug']
        }
      },
      series: [{
        name: 'series-1',
        data: [30000, 60000, 50000, 40000, 50000, 30000, 20000, 18000]
      }],
    }),
  }
</script>
<style>
.statistik {
  background-color: #eee;
  height: 100%;
  width: 100%;
}
.pick-tgl{
  background-color: #fff;
}
</style>