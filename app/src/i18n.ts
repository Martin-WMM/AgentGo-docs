import { createI18n } from 'vue-i18n';

export const locales = ['zh-CN', 'en-US'] as const;
export type Locale = (typeof locales)[number];

const savedLocale = localStorage.getItem('agentgo-locale') as Locale | null;
const locale: Locale = savedLocale && locales.includes(savedLocale) ? savedLocale : 'zh-CN';

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': {
      nav: { overview: '概览', components: '组件示例', gettingStarted: '开始使用' },
      actions: {
        toggleTheme: '切换主题',
        switchLanguage: '切换语言',
        viewComponents: '查看组件',
        readGuide: '阅读指南',
      },
      home: {
        eyebrow: 'AgentGo UI platform',
        title: '构建清晰、可靠的开发体验。',
        description:
          'AgentGo Docs 是一个基于 Vue、Tailwind CSS 和 shadcn-vue 的文档与组件工作台。',
        cards: {
          modern: {
            title: '现代技术栈',
            description: 'Vue 3、Vite 和 Tailwind CSS 4，快速构建一致的界面。',
          },
          shared: {
            title: '共享组件',
            description: '所有 UI 组件集中在独立 workspace 包中，方便复用和演进。',
          },
          monorepo: {
            title: 'Monorepo',
            description: 'pnpm workspace 让应用与组件库保持清晰边界。',
          },
        },
      },
      components: {
        eyebrow: '基础组件',
        title: '组件示例',
        description: '来自 @agentgo/ui 的可复用组件。',
        controls: '控件',
        input: '输入内容...',
        submit: '提交',
      },
      variants: {
        primary: '主要操作',
        secondary: '次要操作',
        outline: '描边',
        ghost: '幽灵',
        destructive: '危险操作',
        default: '默认',
        warning: '警告',
      },
    },
    'en-US': {
      nav: { overview: 'Overview', components: 'Components', gettingStarted: 'Getting started' },
      actions: {
        toggleTheme: 'Toggle theme',
        switchLanguage: 'Switch language',
        viewComponents: 'View components',
        readGuide: 'Read the guide',
      },
      home: {
        eyebrow: 'AgentGo UI platform',
        title: 'Build clear, reliable developer experiences.',
        description:
          'AgentGo Docs is a Vue, Tailwind CSS, and shadcn-vue workspace for documentation and components.',
        cards: {
          modern: {
            title: 'Modern stack',
            description:
              'Build consistent interfaces quickly with Vue 3, Vite, and Tailwind CSS 4.',
          },
          shared: {
            title: 'Shared components',
            description: 'Keep reusable UI components in an independent workspace package.',
          },
          monorepo: {
            title: 'Monorepo',
            description: 'Use pnpm workspaces to keep the app and UI package clearly separated.',
          },
        },
      },
      components: {
        eyebrow: 'Base components',
        title: 'Component examples',
        description: 'Reusable components from @agentgo/ui.',
        controls: 'Controls',
        input: 'Type something...',
        submit: 'Submit',
      },
      variants: {
        primary: 'Primary action',
        secondary: 'Secondary action',
        outline: 'Outline',
        ghost: 'Ghost',
        destructive: 'Destructive',
        default: 'Default',
        warning: 'Warning',
      },
    },
  },
});
