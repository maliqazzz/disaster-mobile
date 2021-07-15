import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
          },
        themes: {
            light: {
                primary: colors.blueGrey.darken4,
                secondary: colors.deepOrange.accent4,
                accent: colors.blueGrey.lighten5,
                accent2: colors.blueGrey.lighten4,
                error: colors.red.darken1,
                gelapterang: colors.dark
              },
            dark: {
                primary: colors.grey.darken4,
                secondary: colors.deepOrange.accent4,
                accent: colors.blueGrey.darken4,
                accent2: colors.blueGrey.darken4,
                error: colors.red.darken4,
                gelapterang: colors.light
            },
        },
    }
});
