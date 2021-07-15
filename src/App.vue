<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      class="justify-center"
    >
      <div class="d-flex align-center" style="position: absolute; left: 35%">
        12 Bencana aktif
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
