<template>
    <!-- <v-data-table
        :headers="headers"
        :items="dataBencana"
        class="elevation-1"
        style="width:390px"
        fixed-header
        height="265px"
        hide-default-footer
        mobile-breakpoint="0"
        dense
    ></v-data-table> -->
    <v-data-table
        :headers="headers"
        :items="dataBencana"
        class="elevation-1"
        style="width:100%"
        fixed-header
        height="265px"
        hide-default-footer
        mobile-breakpoint="0"
        dense
    ></v-data-table>
</template>

<script>

  export default {
    name: 'KategoriBen',
    props: [
      "rawDataBencana"
    ],
    data: () => ({
       headers: [
          {
            text: 'Kategori Bencana',
            align: 'start',
            sortable: false,
            value: 'kategori',
          },
          { text: 'Jumlah', value: 'jumlah', align: 'end' },
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
          let Kategori=item['Kategori']
          // let Provinsi=item['Provinsi']
          // let Kabupaten=item['Kabupaten']

          if (Object.hasOwnProperty.call(bufferCompiled, Kategori)) {
            bufferCompiled[Kategori]++
          } else {
            bufferCompiled[Kategori]=1
          }          
        }
        for (const kategori in bufferCompiled) {
          buffer.push({kategori:kategori, jumlah:bufferCompiled[kategori]})
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