<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Button } from '@agentgo/ui';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <section class="hero">
    <div class="hero__glow hero__glow--one" />
    <div class="hero__glow hero__glow--two" />
    <div class="hero__content">
      <span class="hero__kicker">AGENTGO / DOCUMENTATION</span>
      <h1>Build with <span>clarity.</span></h1>
      <p>{{ t('home.description') }}</p>
      <Button size="lg" as-child class="hero__cta"
        ><RouterLink to="/docs"
          >Read Docs
          <Icon icon="lucide:arrow-up-right" class="ml-2 size-5" aria-hidden="true" /></RouterLink
      ></Button>
    </div>
    <div class="hero__side-note">
      <span>01</span><span>{{ t('home.eyebrow') }}</span>
    </div>
  </section>
</template>
