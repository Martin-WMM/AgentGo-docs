<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@agentgo/ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <Badge variant="secondary" class="mb-5">{{ t('home.eyebrow') }}</Badge>
    <h1 class="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">{{ t('home.title') }}</h1>
    <p class="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
      {{ t('home.description') }}
    </p>
    <div class="mt-8 flex flex-wrap gap-3">
      <Button as-child
        ><RouterLink to="/docs"
          >{{ t('actions.readDocs') }}
          <Icon icon="lucide:book-open" class="ml-2 size-4" aria-hidden="true" /></RouterLink
      ></Button>
      <Button as-child
        ><RouterLink to="/components"
          >{{ t('actions.viewComponents') }}
          <Icon icon="lucide:arrow-right" class="ml-2 size-4" aria-hidden="true" /></RouterLink
      ></Button>
    </div>
    <div class="mt-16 grid gap-4 md:grid-cols-3">
      <Card
        ><CardHeader
          ><Icon
            icon="lucide:sparkles"
            class="mb-2 size-5 text-primary"
            aria-hidden="true"
          /><CardTitle>{{ t('home.cards.modern.title') }}</CardTitle></CardHeader
        ><CardContent class="text-sm text-muted-foreground">{{
          t('home.cards.modern.description')
        }}</CardContent></Card
      >
      <Card
        ><CardHeader
          ><Icon
            icon="lucide:boxes"
            class="mb-2 size-5 text-primary"
            aria-hidden="true"
          /><CardTitle>{{ t('home.cards.shared.title') }}</CardTitle></CardHeader
        ><CardContent class="text-sm text-muted-foreground">{{
          t('home.cards.shared.description')
        }}</CardContent></Card
      >
      <Card
        ><CardHeader
          ><Icon
            icon="lucide:package"
            class="mb-2 size-5 text-primary"
            aria-hidden="true"
          /><CardTitle>{{ t('home.cards.monorepo.title') }}</CardTitle></CardHeader
        ><CardContent class="text-sm text-muted-foreground">{{
          t('home.cards.monorepo.description')
        }}</CardContent></Card
      >
    </div>
  </div>
</template>
