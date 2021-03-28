<template>
  <header>
    <div class="flex flex-col max-w-5xl mx-auto w-full">
      <div class="border border-gray-600 p-4 flex justify-between">
        <div class="flex items-center">
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 32 30" class="w-8 h-8 mr-4" >
          <path fill="currentColor" fill-rule="evenodd" d="M1.254 0L2.56 3.646H0v3.417h3.784l1.514 4.228H0v3.418h6.523l1.514 4.228H0v3.417h9.261l1.515 4.228H0V30h12l-1.224-3.418h9.5L19 30h12.442v-3.418H20.276l1.578-4.228h9.59v-3.417h-8.315l1.578-4.228h6.736V11.29h-5.461l1.577-4.228h3.884V3.646h-2.608L30.194 0H1.254zm27.58 3.646l-1.276 3.417H3.784L2.56 3.646h26.274zM25.98 11.29l-1.275 3.418H6.523L5.298 11.29h20.683zm-2.853 7.646l-1.275 3.417H9.26l-1.224-3.417h15.091z" clip-rule="evenodd"/>
        </svg>
          <router-link to="/">Vue MDX</router-link>
        </div>
        <nav class="space-x-4">
          <router-link to="/">home</router-link>
          <router-link to="/docs">docs</router-link>
          <router-link to="/blog">blog</router-link>
        </nav>
      </div>
      <div class="border border-gray-600">
        <details>
          <summary class="cursor-pointer px-4 py-2 text-blue-400 focus:outline-none">show frontmatter</summary>
          <pre class="px-4">{{ frontmatter }}</pre>
        </details>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{ frontmatter: { title: string } }>()
</script>

<style></style>
