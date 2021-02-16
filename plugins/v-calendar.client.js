import Vue from 'vue'
import VCalendar from 'v-calendar'
// import 'v-calendar/lib/v-calendar.min.css'

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
})
