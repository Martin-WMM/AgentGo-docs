<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@agentgo/ui';
import { useI18n } from 'vue-i18n';
import ThemeLogo from '../components/ThemeLogo.vue';
const { t, locale } = useI18n();
</script>

<template>
  <section class="hero">
    <div class="hero__glow hero__glow--one" />
    <div class="hero__glow hero__glow--two" />
    <div class="hero__content">
      <ThemeLogo class="hero__logo" />
      <div class="hero__copy" :class="{ 'hero__copy--zh': locale === 'zh-CN' }">
        <span class="hero__kicker">AGENTGO / DOCUMENTATION</span>
        <h1>
          <span class="hero__brand">{{ t('home.brand') }}</span>
          <span class="hero__slogan">{{ t('home.slogan') }}</span>
        </h1>
        <Button size="lg" as-child class="hero__cta"
          ><RouterLink to="/docs"
            >{{ t('home.cta') }}
            <Icon icon="lucide:arrow-up-right" class="ml-2 size-5" aria-hidden="true" /></RouterLink
        ></Button>
      </div>
    </div>
    <div class="hero__side-note">
      <span>01</span><span>{{ t('home.eyebrow') }}</span>
    </div>
  </section>
</template>
