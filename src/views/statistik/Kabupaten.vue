<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="7"
        class="elevation-1"
        style="width:390px"
        hide-default-footer="true"
        mobile-breakpoint="0"
        dense
    ></v-data-table>
</template>

<script>

  export default {
    name: 'Kabupaten',
    components: {
        // 
    },
    data: () => ({
       headers: [
          {
            text: 'Kabupaten/Kota',
            align: 'start',
            sortable: false,
            value: 'kabupaten',
          },
          { text: 'Jumlah', value: 'jumlah', align: 'end' },
        ],
        desserts: [
          {
            kabupaten: 'Bogor',
            jumlah: 12,
          },
          {
            kabupaten: 'Sumedang',
            jumlah: 4,
          },
          {
            kabupaten: 'Ciamis',
            jumlah: 5,
          },
          {
            kabupaten: 'Cirebon',
            jumlah: 5,
          },
          {
            kabupaten: 'Kuningan',
            jumlah: 3,
          },
          {
            kabupaten: 'Bekasi',
            jumlah: 2,
          },
          {
            kabupaten: 'Sukabumi',
            jumlah: 1,
          },
        ]
    }),
  }
</script>
<style>
/*  */
</style>