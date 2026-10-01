import { describe, expect, it } from 'vitest';
import { getPages } from './content';

describe('design documentation navigation', () => {
  it('selects the requested system design translation under the same page ID', () => {
    const english = getPages('en-US').find((page) => page.slug === 'system-design');
    const chinese = getPages('zh-CN').find((page) => page.slug === 'system-design');
    expect(english).toBeDefined();
    expect(chinese).toBeDefined();
    expect(english?.language).toBe('en');
    expect(chinese?.language).toBe('zh');
    expect(chinese?.id).toBe(english?.id);
  });

  it('renders sequential requirement IDs and status badges in the requirements page', () => {
    const page = getPages('zh-CN').find((entry) => entry.slug === 'solved-problems');
    expect(page).toBeDefined();
    const ids = [...(page?.html || '').matchAll(/<code>REQ-(\d+)<\/code>/g)];
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.map((match) => Number(match[1]))).toEqual(
      Array.from({ length: ids.length }, (_, index) => index + 1),
    );
    expect(page?.html).toContain('class="status-tag"');
    expect(page?.html).not.toContain('<status');
  });

  it('provides image controls and a resolved bundled asset for the requirements diagram', () => {
    const page = getPages('zh-CN').find((entry) => entry.slug === 'solved-problems');
    expect(page?.html).toContain('data-image-action="fullscreen"');
    expect(page?.html).toContain('data-image-action="download"');
    expect(page?.html).toContain('agentgo-requirements-analysis-dark');
    expect(page?.html).not.toContain('src="./_resources/');
  });
});
