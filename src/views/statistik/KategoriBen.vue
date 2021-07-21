<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="7"
        class="elevation-1"
        style="width:350px"
        hide-default-footer="true"
        dense
    ></v-data-table>
</template>

<script>

  export default {
    name: 'KategoriBen',
    components: {
        // 
    },
    data: () => ({
       headers: [
          {
            text: 'Kategori Bencana',
            align: 'start',
            sortable: false,
            value: 'kategori',
          },
          { text: 'Jumlah', value: 'jumlah' },
        ],
        desserts: [
          {
            kategori: 'Banjir',
            jumlah: 12,
          },
          {
            kategori: 'Kebakaran Hutan',
            jumlah: 4,
          },
          {
            kategori: 'Gelombang Pasang',
            jumlah: 5,
          },
          {
            kategori: 'Kekeringan',
            jumlah: 5,
          },
          {
            kategori: 'Puting Beliung',
            jumlah: 3,
          },
          {
            kategori: 'Tanah Longsor',
            jumlah: 2,
          },
          {
            kategori: 'Gempa Bumi',
            jumlah: 1,
          },
        ]
    }),
  }
</script>
<style>
/*  */
</style>