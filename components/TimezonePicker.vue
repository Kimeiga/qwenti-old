<template>
  <model-list-select
    v-model="selectedTimezone"
    :list="timezones"
    option-value="value"
    placeholder="select item"
    :custom-text="timezoneText"
  >
  </model-list-select>
</template>

<script>
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

import timezones from '@/static/timezones.json'

export default {
  components: {
    ModelListSelect,
  },
  data() {
    return {
      timezones,
      selectedTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      stringItem: '',
    }
  },
  methods: {
    timezoneText(item) {
      return `(UTC${item.offset}) ${item.label}`
    },
  },
}
</script>
