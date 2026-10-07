import { describe, expect, it } from 'vitest';
import { getPages } from './content';

describe('design documentation navigation', () => {
  it('keeps design philosophy visible as the parent navigation section', () => {
    const pages = getPages('zh-CN');
    expect(pages.find((page) => page.slug === '02-用户需求-user-needs')?.section).toBe('设计哲学');
    expect(pages.find((page) => page.slug === '03-架构设计-system-architecture')?.section).toBe(
      '设计哲学',
    );
    expect(pages.find((page) => page.slug === 'agent-loop')).toBeUndefined();
    expect(pages.find((page) => page.slug === 'system-design')).toBeUndefined();
  });

  it('renders sequential requirement IDs and status badges in the requirements page', () => {
    const page = getPages('zh-CN').find((entry) => entry.slug === '02-用户需求-user-needs');
    expect(page).toBeDefined();
    const ids = [...(page?.html || '').matchAll(/<code>REQ-(\d+)<\/code>/g)];
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.map((match) => Number(match[1]))).toEqual(
      Array.from({ length: ids.length }, (_, index) => index + 1),
    );
    expect(page?.html).toContain('class="status-tag"');
    expect(page?.html).not.toContain('<status');
    expect(page?.html).toContain('collapsible-block--table');
    expect(page?.html).toContain('Table ·');
  });

  it('provides image controls and a resolved bundled asset for the requirements diagram', () => {
    const page = getPages('zh-CN').find((entry) => entry.slug === '02-用户需求-user-needs');
    expect(page?.html).toContain('data-image-action="fullscreen"');
    expect(page?.html).toContain('data-image-action="download"');
    expect(page?.html).toContain('agentgo-requirements-analysis-dark');
    expect(page?.html).not.toContain('src="./_resources/');
  });

  it('wraps fenced code blocks in collapsible containers', () => {
    const page = getPages('zh-CN').find(
      (entry) => entry.slug === '03-架构设计-system-architecture',
    );
    expect(page?.html).toContain('collapsible-block--code');
    expect(page?.html).toContain('data-code-copy');
  });

  it('resolves the project background logo from its bundled resource folder', () => {
    const page = getPages('zh-CN').find((entry) => entry.slug === '01-项目背景-README');
    expect(page?.html).toContain('agentgo-logo');
    expect(page?.html).not.toContain('src="./_resources/');
  });
});
