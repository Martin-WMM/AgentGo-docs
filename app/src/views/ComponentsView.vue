<script setup lang="ts">
import { ref } from 'vue';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Separator,
} from '@clawforge/ui';
import { useI18n } from 'vue-i18n';

const value = ref('');
const { t } = useI18n();
</script>

<template>
  <div class="mx-auto max-w-4xl">
    <Badge class="mb-5">{{ t('components.eyebrow') }}</Badge>
    <h1 class="text-4xl font-bold tracking-tight">{{ t('components.title') }}</h1>
    <p class="mt-4 text-muted-foreground">{{ t('components.description') }}</p>
    <Separator class="my-8" />
    <Card
      ><CardHeader
        ><CardTitle>{{ t('components.controls') }}</CardTitle></CardHeader
      ><CardContent class="space-y-6">
        <div class="flex flex-wrap gap-3">
          <Button>{{ t('variants.primary') }}</Button
          ><Button variant="secondary">{{ t('variants.secondary') }}</Button
          ><Button variant="outline">{{ t('variants.outline') }}</Button
          ><Button variant="ghost">{{ t('variants.ghost') }}</Button
          ><Button variant="destructive">{{ t('variants.destructive') }}</Button>
        </div>
        <div class="flex max-w-sm gap-3">
          <Input v-model="value" :placeholder="t('components.input')" /><Button>{{
            t('components.submit')
          }}</Button>
        </div>
        <div class="flex gap-2">
          <Badge>{{ t('variants.default') }}</Badge
          ><Badge variant="secondary">{{ t('variants.secondary') }}</Badge
          ><Badge variant="outline">{{ t('variants.outline') }}</Badge
          ><Badge variant="destructive">{{ t('variants.warning') }}</Badge>
        </div>
      </CardContent></Card
    >
  </div>
</template>
