<template>
  <pre class="custom-pre"><code :class="{ language: true }" v-html="code"></code></pre>
</template>

<script>
import { renderSlot } from '@vue/runtime-core'

export default {
  props: {
    code: String,
    language: String,
  },
}
</script>
