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
    name: 'Provinsi',
    components: {
        // 
    },
    data: () => ({
       headers: [
          {
            text: 'Provinsi',
            align: 'start',
            sortable: false,
            value: 'provinsi',
          },
          { text: 'Jumlah', value: 'jumlah', align: 'end',},
        ],
        desserts: [
          {
            provinsi: 'Jawa Barat',
            jumlah: 12,
          },
          {
            provinsi: 'Jawa Timur',
            jumlah: 4,
          },
          {
            provinsi: 'Aceh',
            jumlah: 5,
          },
          {
            provinsi: 'Papua Barat',
            jumlah: 5,
          },
          {
            provinsi: 'Kalimantan Barat',
            jumlah: 3,
          },
          {
            provinsi: 'Sulawesi Utara',
            jumlah: 2,
          },
          {
            provinsi: 'NTT',
            jumlah: 1,
          },
        ]
    }),
  }
</script>
<style>
/*  */
</style>