<script setup lang="ts">
import { computed, h, nextTick, onMounted, onUnmounted, ref, render, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { Button } from '@agentgo/ui';
import mermaid from 'mermaid';
import { findPage, findPageIndex, getPages } from '../content';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t, locale } = useI18n();
const page = computed(() => findPage(String(route.params.section), String(route.params.slug), locale.value));
const localizedPages = computed(() => getPages(locale.value));
const pageIndex = computed(() => (page.value ? findPageIndex(page.value.id, locale.value) : -1));
const previous = computed(() => (pageIndex.value > 0 ? localizedPages.value[pageIndex.value - 1] : undefined));
const next = computed(() => (pageIndex.value >= 0 ? localizedPages.value[pageIndex.value + 1] : undefined));
const drawioSource = ref<string | null>(null);
const editedDrawio = ref<string | null>(null);
const drawioFrame = ref<HTMLIFrameElement | null>(null);
const drawioPanel = ref<HTMLElement | null>(null);
const drawioDark = ref(false);
const drawioFullscreen = ref(false);
const drawioUrl = computed(() => `https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json&dark=${drawioDark.value ? '1' : '0'}`);

let mermaidCounter = 0;
async function renderMermaid() {
  await nextTick();
  const nodes = [...document.querySelectorAll<HTMLElement>('.mermaid-diagram')];
  localizeDrawioCards();
  if (!nodes.length) return;
  mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default' });
  for (const node of nodes) {
    const source = decodeURIComponent(node.dataset.mermaid || '');
    try {
      const { svg } = await mermaid.render(`agentgo-mermaid-${mermaidCounter++}`, source);
      node.innerHTML = svg;
    } catch {
      node.textContent = source;
      node.classList.add('mermaid-diagram--error');
    }
  }
}

function localizeDrawioCards() {
  document.querySelectorAll<HTMLElement>('[data-drawio-card]').forEach((card) => {
    const download = card.querySelector<HTMLButtonElement>('[data-drawio-action="download"]');
    const edit = card.querySelector<HTMLButtonElement>('[data-drawio-action="edit"]');
    if (download) { render(h(Icon, { icon: 'lucide:download', class: 'size-4', 'aria-hidden': 'true' }), download); download.setAttribute('aria-label', t('docs.downloadDrawio')); download.title = t('docs.downloadDrawio'); }
    if (edit) { render(h(Icon, { icon: 'lucide:pencil', class: 'size-4', 'aria-hidden': 'true' }), edit); edit.setAttribute('aria-label', t('docs.editDrawio')); edit.title = t('docs.editDrawio'); }
  });
}

onMounted(renderMermaid);
watch(page, renderMermaid);

function openDrawio(source: string) { drawioSource.value = source; editedDrawio.value = null; drawioDark.value = true; }
function closeDrawio() { drawioSource.value = null; editedDrawio.value = null; if (document.fullscreenElement) document.exitFullscreen(); }
async function toggleFullscreen() { if (document.fullscreenElement) await document.exitFullscreen(); else await drawioPanel.value?.requestFullscreen(); }
function handleContentClick(event: MouseEvent) {
  const action = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-drawio-action]');
  const card = (event.target as HTMLElement).closest<HTMLElement>('[data-drawio-source]');
  if (!card?.dataset.drawioSource) return;
  const source = decodeURIComponent(card.dataset.drawioSource);
  if (action?.dataset.drawioAction === 'download') downloadDrawioSource(source, card.dataset.drawioName || 'diagram.drawio');
  if (action?.dataset.drawioAction === 'edit') openDrawio(source);
}
function handleContentKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-drawio-source]');
  if (target?.dataset.drawioSource) { event.preventDefault(); openDrawio(decodeURIComponent(target.dataset.drawioSource)); }
}
function handleDrawioMessage(event: MessageEvent) {
  if (event.source !== drawioFrame.value?.contentWindow) return;
  let message: { event?: string; xml?: string };
  try { message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data; } catch { return; }
  if (message.event === 'init' && drawioSource.value) drawioFrame.value?.contentWindow?.postMessage(JSON.stringify({ action: 'load', xml: drawioSource.value, autosave: 0 }), '*');
  if (message.event === 'save' && message.xml) editedDrawio.value = message.xml;
  if (message.event === 'exit') closeDrawio();
}
function downloadDrawioSource(source: string, filename: string) {
  const blob = new Blob([source], { type: 'application/xml;charset=utf-8' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = filename; link.click(); URL.revokeObjectURL(link.href);
}
function handleFullscreenChange() { drawioFullscreen.value = Boolean(document.fullscreenElement); }
watch(drawioSource, (source) => { document.body.style.overflow = source ? 'hidden' : ''; }, { immediate: true });
function downloadEditedDrawio() {
  if (!editedDrawio.value) return;
  const blob = new Blob([editedDrawio.value], { type: 'application/xml;charset=utf-8' });
  const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `${page.value?.slug || 'diagram'}.drawio`; link.click(); URL.revokeObjectURL(link.href);
}
onMounted(() => window.addEventListener('message', handleDrawioMessage));
onMounted(() => document.addEventListener('fullscreenchange', handleFullscreenChange));
onUnmounted(() => { window.removeEventListener('message', handleDrawioMessage); document.removeEventListener('fullscreenchange', handleFullscreenChange); document.body.style.overflow = ''; });

async function share() {
  if (!page.value) return;
  const shareData = { title: page.value.title, url: window.location.href };
  if (navigator.share) await navigator.share(shareData);
  else await navigator.clipboard.writeText(window.location.href);
}

function download() {
  if (!page.value) return;
  const blob = new Blob([page.value.content], { type: 'text/markdown;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${page.value.slug}.md`;
  link.click();
  URL.revokeObjectURL(link.href);
}
</script>

<template>
  <div v-if="page" class="doc-page">
    <div class="doc-layout"><div>
    <div class="doc-actions">
      <Button variant="ghost" size="icon" :aria-label="t('actions.download')" :title="t('actions.download')" @click="download"><Icon icon="lucide:download" class="size-4 text-muted-foreground" aria-hidden="true" /></Button>
      <Button variant="ghost" size="icon" :aria-label="t('actions.share')" :title="t('actions.share')" @click="share"><Icon icon="lucide:share-2" class="size-4 text-muted-foreground" aria-hidden="true" /></Button>
    </div>
    <div v-if="page.metadata.author || page.metadata.date || page.metadata.keywords.length || page.metadata.summary" class="doc-metadata">
      <p v-if="page.metadata.summary" class="doc-metadata__summary">{{ page.metadata.summary }}</p>
      <div class="doc-metadata__details">
        <span v-if="page.metadata.author"><Icon icon="lucide:user-round" class="size-3.5" aria-hidden="true" /><strong>{{ t('docs.author') }}</strong>{{ page.metadata.author }}</span>
        <span v-if="page.metadata.date"><Icon icon="lucide:calendar-days" class="size-3.5" aria-hidden="true" /><strong>{{ t('docs.date') }}</strong>{{ page.metadata.date }}</span>
        <span v-if="page.metadata.keywords.length"><Icon icon="lucide:tags" class="size-3.5" aria-hidden="true" /><strong>{{ t('docs.keywords') }}</strong>{{ page.metadata.keywords.join(' · ') }}</span>
      </div>
    </div>
    <div class="prose-docs" @click="handleContentClick" @keydown="handleContentKeydown" v-html="page.html" />
    <nav class="doc-pagination" :aria-label="t('docs.pagination')">
      <RouterLink v-if="previous" :to="`/docs/${previous.section}/${previous.slug}`" class="doc-pagination__link doc-pagination__link--previous"><small>{{ t('docs.previous') }}</small><strong>← {{ previous.title }}</strong></RouterLink>
      <span v-else />
      <RouterLink v-if="next" :to="`/docs/${next.section}/${next.slug}`" class="doc-pagination__link doc-pagination__link--next"><small>{{ t('docs.next') }}</small><strong>{{ next.title }} →</strong></RouterLink>
    </nav></div><aside v-if="page.toc.length" class="doc-toc" :aria-label="t('docs.toc')"><a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" :class="`doc-toc__item doc-toc__item--${item.level}`">{{ item.text }}</a></aside></div>
  </div>
  <div v-else class="prose-docs"><h1>{{ t('docs.notFound') }}</h1><RouterLink to="/docs">{{ t('docs.backToDocs') }}</RouterLink></div>
  <div v-if="drawioSource" class="drawio-modal" role="dialog" aria-modal="true" :aria-label="t('docs.drawioEditor')">
    <div ref="drawioPanel" class="drawio-modal__panel">
      <div class="drawio-modal__header"><strong>{{ t('docs.drawioEditor') }}</strong><div class="drawio-modal__header-actions"><Button variant="ghost" size="icon" :aria-label="t('docs.toggleFullscreen')" :title="t('docs.toggleFullscreen')" @click="toggleFullscreen"><Icon :icon="drawioFullscreen ? 'lucide:minimize-2' : 'lucide:maximize-2'" class="size-4" aria-hidden="true" /></Button><Button variant="ghost" size="icon" :aria-label="t('docs.closeEditor')" :title="t('docs.closeEditor')" @click="closeDrawio"><Icon icon="lucide:x" class="size-4" aria-hidden="true" /></Button></div></div>
      <iframe ref="drawioFrame" class="drawio-modal__frame" title="Drawio editor" :src="drawioUrl" />
      <div class="drawio-modal__footer"><Button variant="outline" @click="closeDrawio">{{ t('docs.closeEditor') }}</Button><Button :disabled="!editedDrawio" @click="downloadEditedDrawio">{{ t('docs.downloadEdited') }}</Button></div>
    </div>
  </div>
</template>
