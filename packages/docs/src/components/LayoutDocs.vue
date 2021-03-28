<template>
  <div class="max-w-5xl w-full mx-auto">
    <div class="border border-gray-600 px-4 py-2">
      page layout:
      <strong>docs</strong>
    </div>
    <div class="flex p-4">
      <aside class="min-w-200px px-2 space-y-2 pt-4">
        <h3 class="font-bold text-sm">GETTING STARTED</h3>
        <div class="flex flex-col space-y-2">
          <router-link class="pl-2 border-l-2 border-gray-400 hover:border-blue-400 hover:text-blue-400" to="/docs">
            Introduction
          </router-link>
          <router-link
            class="pl-2 border-l-2 border-gray-400 hover:border-blue-400 hover:text-blue-400"
            to="/docs/setup"
          >
            Setup
          </router-link>
        </div>
      </aside>
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
