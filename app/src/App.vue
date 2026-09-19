<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@agentgo/ui';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { getPages, getSections } from './content';

const { t, locale } = useI18n();
const route = useRoute();
const sections = computed(() => getSections(locale.value));
const theme = ref<'light' | 'dark' | 'system'>('system');
const localeLabel = computed(() => (locale.value === 'zh-CN' ? 'EN' : '中文'));
const isDocs = computed(() => route.path.startsWith('/docs'));
const openSections = ref<Record<string, boolean>>({});
const searchQuery = ref('');
const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return [];
  return getPages(locale.value)
    .filter((page) =>
      [
        page.title,
        page.content,
        page.metadata.author,
        page.metadata.date,
        page.metadata.summary,
        ...page.metadata.keywords,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
    .slice(0, 8);
});

function applyTheme(value: typeof theme.value) {
  theme.value = value;
  localStorage.setItem('agentgo-theme', value);
  const dark =
    value === 'dark' ||
    (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}
function cycleTheme() {
  applyTheme(theme.value === 'system' ? 'light' : theme.value === 'light' ? 'dark' : 'system');
}
function toggleLocale() {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN';
  localStorage.setItem('agentgo-locale', locale.value);
}
onMounted(() => {
  const saved = localStorage.getItem('agentgo-theme') as typeof theme.value | null;
  applyTheme(saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system');
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (theme.value === 'system') applyTheme('system');
  });
  sections.value.forEach((section) => (openSections.value[section.id] = true));
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink to="/" class="brand"
          ><span class="brand__mark">A</span><span>AgentGo <em>Docs</em></span></RouterLink
        >
        <div class="site-header__actions">
          <RouterLink v-if="!isDocs" to="/docs" class="header-link">{{ t('nav.docs') }}</RouterLink>
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
            @click="cycleTheme"
            ><Icon
              :icon="
                theme === 'dark'
                  ? 'lucide:sun'
                  : theme === 'light'
                    ? 'lucide:moon'
                    : 'lucide:monitor'
              "
              class="size-4"
              aria-hidden="true"
          /></Button>
        </div>
      </div>
    </header>
    <div v-if="isDocs" class="docs-shell">
      <aside class="docs-sidebar">
        <RouterLink to="/docs" class="sidebar-home">{{ t('nav.docsHome') }}</RouterLink>
        <div v-for="section in sections" :key="section.id" class="sidebar-section">
          <button
            class="sidebar-section__toggle"
            :aria-expanded="openSections[section.id]"
            @click="openSections[section.id] = !openSections[section.id]"
          >
            <span class="sidebar-label"
              ><Icon
                v-if="section.navIcon"
                :icon="section.navIcon"
                class="size-4"
                aria-hidden="true"
              /><span v-else-if="section.navEmoji" aria-hidden="true">{{ section.navEmoji }}</span
              >{{ section.title }}</span
            ><Icon
              :icon="openSections[section.id] ? 'lucide:chevron-down' : 'lucide:chevron-right'"
              class="size-4"
              aria-hidden="true"
            />
          </button>
          <nav v-show="openSections[section.id]" class="sidebar-pages">
            <RouterLink
              v-for="item in section.pages"
              :key="item.id"
              :to="`/docs/${item.section}/${item.slug}`"
              class="sidebar-page"
              ><Icon
                v-if="item.navIcon"
                :icon="item.navIcon"
                class="size-4"
                aria-hidden="true"
              /><span v-else-if="item.navEmoji" aria-hidden="true">{{ item.navEmoji }}</span
              >{{ item.title }}</RouterLink
            >
          </nav>
        </div>
      </aside>
      <main class="docs-main">
        <div class="docs-search">
          <label class="sr-only" for="docs-search-input">{{ t('docs.searchPlaceholder') }}</label>
          <div class="docs-search__input">
            <Icon icon="lucide:search" class="size-4" aria-hidden="true" /><input
              id="docs-search-input"
              v-model="searchQuery"
              type="search"
              :placeholder="t('docs.searchPlaceholder')"
              :aria-label="t('docs.searchPlaceholder')"
            />
          </div>
          <div v-if="searchQuery.trim()" class="docs-search__results">
            <RouterLink
              v-for="result in searchResults"
              :key="result.id"
              :to="`/docs/${result.section}/${result.slug}`"
              class="docs-search__result"
              @click="searchQuery = ''"
              ><strong>{{ result.title }}</strong
              ><small>{{ result.metadata.summary || result.sectionTitle }}</small></RouterLink
            >
            <span v-if="!searchResults.length" class="docs-search__empty">{{
              t('docs.noResults')
            }}</span>
          </div>
        </div>
        <RouterView />
      </main>
    </div>
    <main v-else class="landing-main"><RouterView /></main>
  </div>
</template>
