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
      nav: {
        overview: '概览',
        components: '组件示例',
        gettingStarted: '开始使用',
        docs: '阅读文档',
        docsHome: '文档首页',
      },
      actions: {
        toggleTheme: '切换主题',
        switchLanguage: '切换语言',
        viewGithub: '在 GitHub 查看 AgentGo Docs',
        viewComponents: '查看组件',
        readGuide: '阅读指南',
        readDocs: '阅读文档',
        download: '下载',
        share: '分享',
      },
      home: {
        eyebrow: 'AgentGo UI platform',
        brand: 'Agent Go',
        slogan: '少思考，多行动',
        cta: '阅读文档',
        description: 'AgentGo Docs 是一个基于 Vue、Tailwind CSS 和 shadcn-vue 的文档与组件工作台。',
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
      docs: {
        eyebrow: 'DOCUMENTATION',
        title: '开始探索 AgentGo',
        description: '选择一个章节开始阅读，左侧目录支持折叠，右侧可快速跳转当前页面的内容。',
        pages: '篇文档',
        page: '篇文档',
        moduleSummary: '探索这个模块的核心内容。',
        previous: '上一篇',
        next: '下一篇',
        pagination: '文档分页',
        toc: '本页目录',
        author: '作者',
        date: '日期',
        keywords: '关键词',
        searchPlaceholder: '搜索文档、关键词和内容…',
        noResults: '没有找到匹配的文档',
        drawioEditor: 'Drawio 编辑器',
        closeEditor: '关闭编辑器',
        toggleFullscreen: '切换全屏',
        downloadEdited: '下载修改后的文件',
        downloadDrawio: '下载',
        editDrawio: '打开编辑',
        notFound: '文档不存在',
        backToDocs: '返回文档目录',
        emptyHome: '请在 resources/HOME.md 中添加首页内容。',
      },
    },
    'en-US': {
      nav: {
        overview: 'Overview',
        components: 'Components',
        gettingStarted: 'Getting started',
        docs: 'Read Docs',
        docsHome: 'Documentation home',
      },
      actions: {
        toggleTheme: 'Toggle theme',
        switchLanguage: 'Switch language',
        viewGithub: 'View AgentGo Docs on GitHub',
        viewComponents: 'View components',
        readGuide: 'Read the guide',
        readDocs: 'Read Docs',
        download: 'Download',
        share: 'Share',
      },
      home: {
        eyebrow: 'AgentGo UI platform',
        brand: 'Agent Go',
        slogan: 'Think Less. Do More.',
        cta: 'Read the Docs',
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
      docs: {
        eyebrow: 'DOCUMENTATION',
        title: 'Explore AgentGo',
        description:
          'Choose a chapter to begin. Collapse the left navigation or jump through the page outline on the right.',
        pages: 'pages',
        page: 'page',
        moduleSummary: 'Explore the core content in this module.',
        previous: 'Previous',
        next: 'Next',
        pagination: 'Documentation pagination',
        toc: 'On this page',
        author: 'Author',
        date: 'Date',
        keywords: 'Keywords',
        searchPlaceholder: 'Search docs, keywords, and content…',
        noResults: 'No matching documents found',
        drawioEditor: 'Drawio editor',
        closeEditor: 'Close editor',
        toggleFullscreen: 'Toggle fullscreen',
        downloadEdited: 'Download edited file',
        downloadDrawio: 'Download',
        editDrawio: 'Open editor',
        notFound: 'Document not found',
        backToDocs: 'Back to documentation',
        emptyHome: 'Add your landing content to resources/HOME.md.',
      },
    },
  },
});
