<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { getHomeContent, getSections } from '../content';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const homeContent = computed(() => getHomeContent(locale.value));
const sections = computed(() => getSections(locale.value));
</script>

<template>
  <div class="docs-index">
    <div v-if="homeContent" class="prose-docs docs-index__home" v-html="homeContent.html" />
    <p class="eyebrow">{{ t('docs.eyebrow') }}</p>
    <h1>{{ t('docs.title') }}</h1>
    <p class="lead">{{ t('docs.description') }}</p>
    <div class="index-grid">
      <RouterLink
        v-for="section in sections"
        :key="section.id"
        :to="`/docs/${section.id}/${section.pages[0].slug}`"
        class="index-card"
      >
        <span class="index-card__content">
          <span class="index-card__header">
            <span class="index-card__number">{{
              String(sections.indexOf(section) + 1).padStart(2, '0')
            }}</span>
            <strong>{{ section.title }}</strong>
          </span>
          <small class="index-card__summary">{{
            section.summary || t('docs.moduleSummary')
          }}</small>
          <span class="index-card__meta">
            <Icon
              v-if="section.navIcon"
              :icon="section.navIcon"
              class="index-card__icon size-5"
              aria-hidden="true"
            /><span v-else-if="section.navEmoji" class="index-card__emoji" aria-hidden="true">{{
              section.navEmoji
            }}</span>
            <small>{{
              section.pages.length +
              ' ' +
              t(section.pages.length === 1 ? 'docs.page' : 'docs.pages')
            }}</small>
          </span>
        </span>
      </RouterLink>
    </div>
  </div>
</template>
