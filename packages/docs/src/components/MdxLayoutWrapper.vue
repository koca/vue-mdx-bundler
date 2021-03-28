<template>
  <div class="mx-auto w-full min-h-screen dark:bg-gray-900 dark:text-gray-50">
    <app-header :frontmatter="frontmatter" />
    <layout-docs class="border-2 border-green-500" v-if="isDocs">
      <slot />
    </layout-docs>
    <layout-blog class="border-2 border-red-500" v-else-if="isBlog">
      <slot />
    </layout-blog>
    <layout-default v-else class="default">
      <slot />
    </layout-default>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
const { path } = useRoute()
const rootPath = '/'
const blogPath = rootPath.endsWith('/') ? `${rootPath}blog` : `${rootPath}/blog`
const docsPath = rootPath.endsWith('/') ? `${rootPath}docs` : `${rootPath}/docs`
const isBlog = computed(() => path.startsWith(blogPath))
const isDocs = computed(() => path.startsWith(docsPath))
const props = defineProps<{ frontmatter: { title: string } }>()
useHead({
  title: props.frontmatter.title,
})
</script>
