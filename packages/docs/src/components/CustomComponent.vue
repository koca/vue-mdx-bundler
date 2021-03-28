<template>
  <div class="ring-2">
    Custom Component counter: {{ counter }}
    <button @click="counter++" class="bg-blue-400 text-white rounded py-2 px-4">add</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return { counter: ref(0) }
  },
}
</script>

<style></style>
