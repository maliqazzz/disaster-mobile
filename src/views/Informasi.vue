<template>
  <v-container class="mt-12 mb-14">
        <v-row no-gutters style="flex-wrap: nowrap;">
            <v-col cols="2" class="flex-grow-0 flex-shrink-0">
                <v-list-item-avatar>
                <v-img src="@/assets/icon/88.png" width="50px"/>
                </v-list-item-avatar>
            </v-col>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0">
                <v-list-item-subtitle class="mx-2 text-left"><span class="highlightbencana">Tanah Longsor</span></v-list-item-subtitle>
                <v-list-item-title light class="mx-2 text-left text-wrap"  >
                    <h4 class="subtitle-1">Kota Semarang - Jawa Tengah</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="mx-2 text-left">Reported: 14 Nov</v-list-item-subtitle>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-container class="ma-0 text-left">
            <p><span>Lokasi : </span><span>Kec. Gayamsari Kel. Tambakrejo</span></p>
            <p><span>Waktu/Tanggal : 14 Nov</span><span></span></p>
            <p><span>Kronologis : </span><span></span></p>
            <p><span>Penyebab : </span><span>Akibat hujan dengan intensitas tinggi dan tergerus aliran sungai</span></p>
            <p><span>Korban Meninggal : </span><span>0</span></p>
            <p><span>Korban Terluka : </span><span>0</span></p>
            <p><span>Korban Hilang : </span><span>0</span></p>
            <p><span>Rumah Rusak: </span><span>0</span></p>

        </v-container>
        <v-img
            height="auto"
            width="370"
            class="ma-2"
            src="@/assets/img/bencana/longsor.webp"/>
        
        
  </v-container>
</template>

<script>
  export default {
    name: 'Informasi',

    data: () => ({
     
    }),
  }
</script>
<style>
.dialog-pantauan{
    right:10%;
    top:15%;
    /* height: fit-content; */
    width: 500px;
    position:fixed;
  }
</style>