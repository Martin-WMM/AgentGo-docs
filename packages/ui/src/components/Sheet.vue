<script setup lang="ts">
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';
import { cn } from '../lib/utils';
defineProps<{ side?: 'left' | 'right'; title?: string; class?: string }>();
</script>
<template>
  <DialogRoot>
    <DialogTrigger as-child><slot name="trigger" /></DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50" />
      <DialogContent
        :class="
          cn(
            'fixed inset-y-0 z-50 w-3/4 border bg-background p-6 shadow-lg sm:max-w-sm',
            side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
            $props.class,
          )
        "
      >
        <DialogTitle v-if="title" class="text-lg font-semibold">{{ title }}</DialogTitle>
        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
