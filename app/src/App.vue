<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@agentgo/ui';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const dark = ref(localStorage.getItem('agentgo-theme') === 'dark');
const localeLabel = computed(() => (locale.value === 'zh-CN' ? 'EN' : '中文'));

document.documentElement.classList.toggle('dark', dark.value);

function toggleTheme() {
  dark.value = !dark.value;
  document.documentElement.classList.toggle('dark', dark.value);
  localStorage.setItem('agentgo-theme', dark.value ? 'dark' : 'light');
}

function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
  localStorage.setItem('agentgo-locale', locale.value);
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <RouterLink to="/" class="flex items-center gap-3 font-semibold tracking-tight">
          <span class="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            >C</span
          >
          AgentGo Docs
        </RouterLink>
        <div class="flex items-center gap-2">
          <RouterLink
            to="/components"
            class="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:block"
            >{{ t('nav.components') }}</RouterLink
          >
          <Button
            variant="ghost"
            size="icon"
            :aria-label="t('actions.switchLanguage')"
            @click="toggleLocale"
            >{{ localeLabel }}</Button
          >
          <Button
            variant="ghost"
            size="icon"
            :aria-label="t('actions.toggleTheme')"
            @click="toggleTheme"
          >
            <Icon :icon="dark ? 'lucide:sun' : 'lucide:moon'" class="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </header>
    <div class="mx-auto flex max-w-7xl">
      <aside class="hidden w-64 shrink-0 border-r px-6 py-8 md:block">
        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {{ t('nav.gettingStarted') }}
        </p>
        <nav class="space-y-1 text-sm">
          <RouterLink to="/" class="block rounded-md px-3 py-2 hover:bg-muted">{{
            t('nav.overview')
          }}</RouterLink>
          <RouterLink to="/components" class="block rounded-md px-3 py-2 hover:bg-muted">{{
            t('nav.components')
          }}</RouterLink>
        </nav>
      </aside>
      <main class="min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-16">
        <RouterView />
      </main>
    </div>
  </div>
</template>
