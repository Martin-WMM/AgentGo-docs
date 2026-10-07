<script setup lang="ts">
withDefaults(
  defineProps<{
    alt?: string;
  }>(),
  {
    alt: 'AgentGo',
  },
);

const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <span class="theme-logo" role="img" :aria-label="alt">
    <img
      class="theme-logo__image theme-logo__image--light"
      :src="`${assetBase}assets/logo-light.png`"
      alt=""
    />
    <img
      class="theme-logo__image theme-logo__image--dark"
      :src="`${assetBase}assets/logo-dark.png`"
      alt=""
    />
  </span>
</template>
