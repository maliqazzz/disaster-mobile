<template>
    <!-- <v-data-table
        :headers="headers"
        :items="dataBencana"
        class="elevation-1"
        fixed-header
        height="265px"
        style="width:390px"
        hide-default-footer
        mobile-breakpoint="0"
        dense
    ></v-data-table> -->
    <v-data-table
        :headers="headers"
        :items="dataBencana"
        class="elevation-1"
        fixed-header
        height="265px"
        style="width:100%"
        hide-default-footer
        mobile-breakpoint="0"
        dense
    ></v-data-table>
</template>

<script>

  export default {
    name: 'Kabupaten',
    props: [
      "rawDataBencana"
    ],
    data: () => ({
       headers: [
          {
            text: 'Kabupaten/Kota',
            align: 'start',
            sortable: false,
            value: 'kabupaten',
          },
          { text: 'Jumlah', value: 'jumlah', sortable: true, align: 'end' },
        ],
        dataBencana: []
    }),
    watch:{
      rawDataBencana(e){
        let vm = this
        vm.compileData(e)
      }
    },
    methods:{
      compileData(data){
        let vm = this
        let buffer = []
        let bufferCompiled={}
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          // let Tanggal=item['Tanggal']
          // let Kategori=item['Kategori']
          // let Provinsi=item['Provinsi']
          let Kabupaten=item['Kabupaten']

          if (Object.hasOwnProperty.call(bufferCompiled, Kabupaten)) {
            bufferCompiled[Kabupaten]++
          } else {
            bufferCompiled[Kabupaten]=1
          }          
        }
        for (const kabupaten in bufferCompiled) {
          buffer.push({kabupaten:kabupaten, jumlah:bufferCompiled[kabupaten]})
        }
        vm.dataBencana=buffer.sort(function(a,b){
          return parseInt(b.jumlah) - parseInt(a.jumlah) ;
        });
      }
    },
    mounted(){
      let vm = this
      vm.compileData(vm.$props.rawDataBencana)
    }
  }
</script>
<style>
/*  */
</style>