import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders the supplied label and variant classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Continue' },
    });

    expect(wrapper.text()).toBe('Continue');
    expect(wrapper.classes()).toContain('bg-secondary');
  });

  it('passes button classes to the slotted element when rendered as a child', () => {
    const wrapper = mount(Button, {
      props: { asChild: true },
      slots: { default: '<a href="/docs">Read Docs</a>' },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.classes()).toContain('bg-primary');
  });
});
