import { marked, type Tokens } from 'marked';

type MarkdownModule = { default: string };
export type ContentLanguage = 'zh' | 'en' | 'shared';

export interface DocPage {
  id: string;
  section: string;
  sectionTitle: string;
  title: string;
  slug: string;
  sourcePath: string;
  language: ContentLanguage;
  metadata: DocMetadata;
  navIcon?: string;
  navEmoji?: string;
  sectionNavIcon?: string;
  sectionNavEmoji?: string;
  content: string;
  html: string;
  toc: TocItem[];
}

export interface DocMetadata { author?: string; date?: string; keywords: string[]; summary?: string; navOrder?: number; }
export interface TocItem { id: string; text: string; level: number; }
export interface DocSection { id: string; title: string; pages: DocPage[]; summary?: string; navIcon?: string; navEmoji?: string; }

const markdownFiles = import.meta.glob('/src/resources/**/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string | MarkdownModule>;
const resourceFiles = import.meta.glob('/src/resources/**/_resources/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
// Only text diagram sources belong in the JS bundle. Importing PNG/JPG with ?raw
// previously inlined multi-megabyte binaries into the entry chunk and blanked first paint.
const resourceTextFiles = import.meta.glob(
  '/src/resources/**/_resources/*.{drawio,excalidraw,json,svg,txt,xml}',
  { eager: true, query: '?raw', import: 'default' },
) as Record<string, string | MarkdownModule>;
const sectionOrder = ['设计哲学', '快速上手', '参考文档', '集成与扩展', '二次开发', '关于'];
const defaultSectionIcons: Record<string, string> = {
  设计哲学: 'lucide:compass',
  快速上手: 'lucide:rocket',
  参考文档: 'lucide:book-open',
  集成与扩展: 'lucide:plug',
  二次开发: 'lucide:code-2',
  关于: 'lucide:circle-help',
};

export function displayName(value: string) { return value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()); }
function parseVisualName(value: string): { name: string; icon?: string; emoji?: string } {
  if (value.startsWith('icon-')) return { name: value.slice(5), icon: value.slice(5) };
  if (value.startsWith('emoji-')) {
    const [emoji, ...label] = value.slice(6).split('-');
    return { name: label.join('-') || emoji, emoji };
  }
  return { name: value };
}
function normalizedSection(value: string) { return value.split('/').map((segment) => parseVisualName(segment).name).join('/'); }
function sectionRank(section: string) { const rank = sectionOrder.indexOf(section.split('/')[0]); return rank < 0 ? sectionOrder.length : rank; }
function slugify(value: string) { return value.toLowerCase().trim().replace(/[^\w\u4e00-\u9fff -]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-'); }
function getMarkdown(value: string | MarkdownModule) { return typeof value === 'string' ? value : value.default; }
function parseFrontMatter(raw: string): { metadata: DocMetadata; body: string } {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  const metadata: DocMetadata = { keywords: [] };
  if (!match) return { metadata, body: raw };
  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(':');
    if (separator < 0) return;
    const rawKey = line.slice(0, separator).trim().toLowerCase();
    const key = ({ 作者: 'author', 日期: 'date', 关键字: 'keywords', 关键词: 'keywords', 摘要: 'summary' } as Record<string, string>)[rawKey] || rawKey;
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key === 'keywords') {
      const list = value.replace(/^\[|\]$/g, '').split(',').map((item) => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      metadata.keywords = list;
    } else if (key === 'navorder') {
      const navOrder = Number(value);
      if (Number.isFinite(navOrder)) metadata.navOrder = navOrder;
    } else if (key === 'author' || key === 'date' || key === 'summary') metadata[key] = value;
  });
  return { metadata, body: match[2] };
}
function languageFromLocale(locale: string): 'zh' | 'en' { return locale.toLowerCase().startsWith('zh') ? 'zh' : 'en'; }
function splitLanguageSuffix(filename: string): { base: string; language: ContentLanguage } {
  const match = filename.match(/^(.*)_(zh|en)$/i);
  return { base: match?.[1] || filename, language: (match?.[2]?.toLowerCase() as 'zh' | 'en' | undefined) || 'shared' };
}
function titleFromMarkdown(path: string, content: string, baseName: string) {
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return heading || displayName(baseName || path.split('/').pop()?.replace(/\.md$/i, '') || 'Document');
}
function assetUrl(sourcePath: string, target: string) {
  if (!target.startsWith('./_resources/')) return target;
  const folder = sourcePath.slice(0, sourcePath.lastIndexOf('/'));
  return resourceFiles[`${folder}/${target.slice(2)}`] || target;
}
function resourcePath(sourcePath: string, target: string) {
  const folder = sourcePath.slice(0, sourcePath.lastIndexOf('/'));
  return `${folder}/${target.slice(2)}`;
}
function escapeHtml(value: string) { return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
function statusColor(value: string) { return /^#[0-9a-f]{3,8}$/i.test(value) || /^[a-z]+$/i.test(value) ? value : '#16a34a'; }
function renderStatusTags(html: string) {
  return html.replace(/<status\b([^>]*?)(?:\/>|>.*?<\/status>)/gis, (_, attributes: string) => {
    const value = attributes.match(/\bvalue\s*=\s*["']([^"']*)["']/i)?.[1] || 'unknown';
    const color = statusColor(attributes.match(/\bcolor\s*=\s*["']([^"']*)["']/i)?.[1] || '');
    return `<span class="status-tag" style="--status-color: ${escapeHtml(color)}">${escapeHtml(value)}</span>`;
  });
}
function addRequirementColumns(html: string, sourcePath: string) {
  if (!sourcePath.endsWith('/user-needs.md')) return html;
  let requirementNumber = 0;
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_, table: string) => {
    const withHeaders = table.replace(/(<thead>[\s\S]*?<tr>[\s\S]*?)(<\/tr>)/i, '$1<th>需求标号</th><th>需求状态</th>$2');
    const withRows = withHeaders.replace(/<tbody>([\s\S]*?)<\/tbody>/i, (_, body: string) => {
      const rows = body.replace(/(<tr>[\s\S]*?)(<\/tr>)/gi, (_row: string, content: string, closing: string) => {
        requirementNumber += 1;
        const id = `REQ-${String(requirementNumber).padStart(3, '0')}`;
        return `${content}<td><code>${id}</code></td><td><status value="规划中" color="" /></td>${closing}`;
      });
      return `<tbody>${rows}</tbody>`;
    });
    return `<table>${withRows}</table>`;
  });
}
function resourceKind(target: string) {
  const extension = target.toLowerCase().split('?')[0].split('.').pop();
  if (extension === 'drawio' || target.toLowerCase().endsWith('.drawio.xml')) return 'drawio';
  if (extension === 'excalidraw' || target.toLowerCase().endsWith('.excalidraw.json')) return 'excalidraw';
  if (['mp4', 'webm', 'ogg', 'mov', 'm4v'].includes(extension || '')) return 'video';
  return undefined;
}
function resourceCard(href: string, text: string, sourcePath: string, kind: 'drawio' | 'excalidraw') {
  const label = kind === 'drawio' ? 'Drawio' : 'Excalidraw';
  const filename = href.split('/').pop() || label;
  return `<a class="resource-card resource-card--${kind}" href="${assetUrl(sourcePath, href)}" target="_blank" rel="noreferrer"><span class="resource-card__badge">${label}</span><span><strong>${escapeHtml(text || filename)}</strong><small>${escapeHtml(filename)}</small></span></a>`;
}
function drawioCard(href: string, sourcePath: string) {
  const raw = resourceTextFiles[resourcePath(sourcePath, href)];
  const xml = raw ? (typeof raw === 'string' ? raw : raw.default) : '';
  const filename = href.split('/').pop() || 'diagram.drawio';
  return `<div class="resource-card resource-card--drawio" data-drawio-card data-drawio-source="${encodeURIComponent(xml)}" data-drawio-name="${escapeHtml(filename)}"><span class="resource-card__badge">Drawio</span><span class="resource-card__info"><strong>${escapeHtml(filename)}</strong><small>Drawio diagram</small></span><span class="resource-card__actions"><button type="button" data-drawio-action="download"></button><button type="button" data-drawio-action="edit"></button></span></div>`;
}
function stripHtmlTags(value: string) {
  let previous = '';
  let current = value;
  // Repeat until stable so nested/malformed tags cannot leave residual markup.
  while (previous !== current) {
    previous = current;
    current = current.replace(/<\/?[^>]*>/g, '');
  }
  return current.replace(/\s+/g, ' ').trim();
}
function collapsibleTable(table: string) {
  const headers = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)]
    .map((match) => stripHtmlTags(match[1]))
    .filter(Boolean)
    .slice(0, 3);
  const label = headers.length ? `Table · ${headers.join(' / ')}` : 'Table';
  return `<details class="collapsible-block collapsible-block--table" open><summary>${escapeHtml(label)}</summary><div class="table-scroll">${table}</div></details>`;
}
function renderMarkdown(content: string, sourcePath: string) {
  const toc: TocItem[] = [];
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }: Tokens.Code) => {
    if (lang?.toLowerCase() === 'mermaid') return `<div class="mermaid-diagram" data-mermaid="${encodeURIComponent(text)}"></div>`;
    const label = lang ? `Code · ${escapeHtml(lang)}` : 'Code block';
    return `<details class="collapsible-block collapsible-block--code" open><summary><span>${label}</span><button type="button" class="code-copy-button" data-code-copy></button></summary><pre><code${lang ? ` class="language-${escapeHtml(lang)}"` : ''}>${escapeHtml(text)}</code></pre></details>`;
  };
  renderer.heading = ({ text, depth }: Tokens.Heading) => { const id = slugify(text); if (depth <= 3) toc.push({ id, text, level: depth }); return `<h${depth} id="${id}">${text}</h${depth}>`; };
  renderer.image = ({ href, title, text }: Tokens.Image) => resourceKind(href) === 'video' ? `<video class="markdown-video" controls preload="metadata" src="${assetUrl(sourcePath, href)}"></video>` : `<figure class="markdown-image"><div class="markdown-image__actions"><button type="button" data-image-action="fullscreen"></button><button type="button" data-image-action="download"></button></div><img src="${assetUrl(sourcePath, href)}" alt="${escapeHtml(text)}"${title ? ` title="${escapeHtml(title)}"` : ''} loading="lazy" /><figcaption class="image-caption">${escapeHtml(text)}</figcaption></figure>`;
  renderer.link = ({ href, title, text }: Tokens.Link) => { const kind = resourceKind(href); if (href.startsWith('./_resources/') && kind === 'drawio') return drawioCard(href, sourcePath); if (href.startsWith('./_resources/') && kind === 'excalidraw') return resourceCard(href, text, sourcePath, kind); if (href.startsWith('./_resources/') && kind === 'video') return `<video class="markdown-video" controls preload="metadata" src="${assetUrl(sourcePath, href)}"></video>`; return `<a href="${href}"${title ? ` title="${escapeHtml(title)}"` : ''}>${text}</a>`; };
  const html = marked.parse(content, { renderer }) as string;
  return {
    html: renderStatusTags(addRequirementColumns(html, sourcePath)).replace(
      /<table>[\s\S]*?<\/table>/g,
      collapsibleTable,
    ),
    toc,
  };
}

interface PageVariant { section: string; baseName: string; slug: string; language: ContentLanguage; page: DocPage; }

function createVariants() {
  return Object.entries(markdownFiles).filter(([path]) => !path.includes('/_resources/')).map(([sourcePath, raw]) => {
    const rawContent = getMarkdown(raw);
    const { metadata, body: content } = parseFrontMatter(rawContent);
    const relative = sourcePath.replace('/src/resources/', '').replace(/\.md$/i, '');
    const parts = relative.split('/');
    const filename = parts.at(-1) || 'document';
    const { base: baseName, language } = splitLanguageSuffix(filename);
    const rawTopLevelSection = parts[0] || 'general';
    const section = normalizedSection(rawTopLevelSection);
    const visual = parseVisualName(baseName);
    const nestedPath = parts.slice(1, -1).map((segment) => parseVisualName(segment).name);
    const slug = visual.name.toLowerCase() === 'home' ? 'home' : [...nestedPath, visual.name].join('-');
    const rendered = renderMarkdown(content, sourcePath);
    const sectionVisual = parseVisualName(rawTopLevelSection);
    const page: DocPage = { id: `${section}/${slug}`, section, sectionTitle: displayName(sectionVisual.name), title: titleFromMarkdown(sourcePath, content, visual.name), slug, sourcePath, language, metadata, navIcon: visual.icon, navEmoji: visual.emoji, sectionNavIcon: sectionVisual.icon, sectionNavEmoji: sectionVisual.emoji, content: rawContent, ...rendered };
    return { section, baseName, slug, language, page } satisfies PageVariant;
  });
}

const variants = createVariants();
function selectVariants(locale: string) {
  const language = languageFromLocale(locale);
  const grouped = new Map<string, PageVariant[]>();
  variants.filter((variant) => variant.slug !== 'home').forEach((variant) => { const key = variant.page.id; grouped.set(key, [...(grouped.get(key) || []), variant]); });
  return [...grouped.values()].map((group) => group.find((variant) => variant.language === language) || group.find((variant) => variant.language === 'shared') || group.find((variant) => variant.language === 'en') || group[0]).map((variant) => variant.page).sort((a, b) => sectionRank(a.section) - sectionRank(b.section) || a.section.localeCompare(b.section) || a.slug.localeCompare(b.slug));
}

export function getPages(locale: string) { return selectVariants(locale); }
export function getSections(locale: string): DocSection[] {
  return getPages(locale).reduce<DocSection[]>((groups, page) => { const group = groups.find((item) => item.id === page.section); if (group) group.pages.push(page); else groups.push({ id: page.section, title: page.sectionTitle, summary: page.metadata.summary, pages: [page], navIcon: page.sectionNavIcon || (!page.sectionNavEmoji ? defaultSectionIcons[page.section] : undefined), navEmoji: page.sectionNavEmoji }); return groups; }, []);
}
export function findPage(section: string, slug: string, locale: string) { return getPages(locale).find((page) => page.section === section && page.slug === slug); }
export function findPageIndex(id: string, locale: string) { return getPages(locale).findIndex((page) => page.id === id); }
export function getHomeContent(locale: string) {
  const language = languageFromLocale(locale);
  const home = variants.filter((variant) => variant.slug === 'home').find((variant) => variant.language === language) || variants.find((variant) => variant.slug === 'home' && variant.language === 'shared') || variants.find((variant) => variant.slug === 'home' && variant.language === 'en');
  return home ? { html: home.page.html } : null;
}

export const pages = getPages('en-US');
export const sections = getSections('en-US');
