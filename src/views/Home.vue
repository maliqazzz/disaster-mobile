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
    <v-list nav>
      <v-list-item-group
        v-model="activeList"
        active-class="secondary--text"
      >
        <template >
          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/88.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Tanah Longsor</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Kota Semarang - Jawa Tengah</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 8 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/33.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Banjir</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">DKI Jakarta</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 2 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi" >
              <v-list-item-icon>
              <v-img src="@/assets/icon/44.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Kebakaran Hutan</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Jambi</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 5 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/55.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Gempa Bumi</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Palu - Sulawesi Tengah</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 4 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/66.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Abrasion</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">DKI Jakarta</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 2 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item light link to="/informasi">
            <v-list-item-icon>
              <v-img src="@/assets/icon/77.png" width="40px" class="float-left"/>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Kekeringan</span></v-list-item-subtitle>
              <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                <h4 class="subtitle-1">Palimanan</h4>
              </v-list-item-title>
              <v-list-item-subtitle class="ml-2 text-left">Reported: 7 hours ago</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

            <v-list-item light link to="/informasi" >
              <v-list-item-icon>
                <v-img src="@/assets/icon/22.png" width="40px" class="float-left"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Vulcanic Eruption</span></v-list-item-subtitle>
                <v-list-item-title light class="ml-2 text-left" @click="clickLiveMap()" >
                  <h4 class="subtitle-1">Lumajang - Jawa Timur</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="ml-2 text-left">Reported: 4 hours ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item light link class="mb-10" to="/informasi">
              <v-list-item-icon>
                <v-img src="@/assets/icon/11.png" width="40px" class="float-left"/>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-subtitle class="ml-2 text-left"><span class="highlightbencana">Puting Beliung</span></v-list-item-subtitle>
                <v-list-item-title light class="ml-2 text-left"  >
                  <h4 class="subtitle-1 ">Kota Pontianak - Kalimantan Barat</h4>
                </v-list-item-title>
                <v-list-item-subtitle class="ml-2 text-left">Reported: 8 hours ago</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

        </template>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal: false,
    }),
  }
</script>
<style>
/*  */
</style>