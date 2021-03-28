<template>
  <div class="max-w-5xl w-full mx-auto">
    <div class="border border-gray-600 px-4 py-2">
      page layout:
      <strong>blog</strong>
    </div>
    <div class="flex p-4">
      <div class="content max-w-6xl w-full mx-auto py-4">
        <mdx-content><slot /></mdx-content>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
