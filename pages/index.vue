<template>
  <div class="container">
    <h1>Qwenti</h1>
    <p>The easiest way to schedule a group meeting.</p>
    <hr />

    <h2>Create New Event</h2>
    <input type="text" placeholder="New Event Name" />
    <h3>Date Range</h3>
    <client-only>
      <vc-date-picker
        v-model="range"
        :attributes="attrs"
        :columns="screens({ default: 1, lg: 2 })"
        :rows="screens({ default: 2, lg: 1 })"
        is-range
        is-dark
      />
    </client-only>
    <h3>Start Time Range</h3>
    <client-only>
      <vc-date-picker
        v-model="startTime"
        mode="time"
        :timezone="timezone"
        :minute-increment="30"
        is-dark
      />
    </client-only>
    <h3>End Time Range</h3>

    <client-only>
      <vc-date-picker
        v-model="endTime"
        mode="time"
        :timezone="timezone"
        :minute-increment="30"
        is-dark
      />
    </client-only>
    <h3>Time Zone</h3>
    <TimezonePicker />
  </div>
</template>

<script>
import TimezonePicker from '~/components/TimezonePicker.vue'
export default {
  components: {
    TimezonePicker,
  },
  data() {
    const startTime = new Date()
    startTime.setHours(9, 0, 0)

    const endTime = new Date()
    endTime.setHours(17, 0, 0)
    return {
      range: {
        start: new Date(),
        end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      },
      startTime,
      endTime,
      timezone: '',
      attrs: [
        {
          key: 'today',
          dot: true,
          dates: new Date(),
        },
      ],
    }
  },
  methods: {
    screens(args) {
      if (process.client) {
        return this.$screens(args)
      } else {
        return 2 // <-- your default value
      }
    },
  },
}
</script>

<style>
.vc-date {
  display: none !important;
}
</style>
