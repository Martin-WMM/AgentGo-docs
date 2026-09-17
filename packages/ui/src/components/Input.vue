<script setup lang="ts">
import { cn } from '../lib/utils';
defineProps<{ class?: string }>();
</script>
<template>
  <input
    :class="
      cn(
        'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
        $props.class,
      )
    "
    v-bind="$attrs"
  />
</template>
