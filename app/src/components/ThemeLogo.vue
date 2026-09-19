<script setup lang="ts">
withDefaults(
  defineProps<{
    alt?: string;
  }>(),
  {
    alt: 'AgentGo',
  },
);
</script>

<template>
  <span class="theme-logo" role="img" :aria-label="alt">
    <img class="theme-logo__image theme-logo__image--light" src="/assets/logo-light.png" alt="" />
    <img class="theme-logo__image theme-logo__image--dark" src="/assets/logo-dark.png" alt="" />
  </span>
</template>
