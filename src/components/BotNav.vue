<template>
    <v-bottom-navigation
        :value="value"
        color="teal"
        grow
        fixed
    >   
        <v-btn to="/home">
            <span>Bencana</span>

            <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>

        <v-btn to="/statistik">
            <span>Statistik</span>

            <v-icon>mdi-chart-bar</v-icon>
        </v-btn>

        <v-btn to="/notifikasi">
            <span>Notifikasi</span>

            <v-icon>mdi-bell</v-icon>
        </v-btn>

        <v-btn to="/akun">
            <span>Akun</span>
                
            <v-icon>mdi-account</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>

export default {
  name: 'BotNav',

  data: () => ({
    data: () => ({ value: 1 }),
  }),
};
</script>

<style scoped>
</style>
