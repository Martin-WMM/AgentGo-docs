import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const indexPath = join(root, 'app', 'dist', 'index.html');
const sourceHome = readFileSync(join(root, 'app', 'src', 'views', 'HomeView.vue'), 'utf8');
const sourceRouter = readFileSync(join(root, 'app', 'src', 'main.ts'), 'utf8');
const index = readFileSync(indexPath, 'utf8');

const checks = [
  [existsSync(indexPath), 'app/dist/index.html exists'],
  [index.includes('<div id="app"></div>'), 'deployment has the Vue mount point'],
  [index.includes('/AgentGo-docs/assets/'), 'deployment assets use the GitHub Pages base path'],
  [sourceRouter.includes("{ path: '/', component: HomeView }"), 'root route renders HomeView'],
  [
    sourceRouter.includes("{ path: '/docs', component: DocsIndexView }"),
    'docs route is registered',
  ],
  [sourceHome.includes('<RouterLink to="/docs"'), 'root landing CTA links to /docs'],
  [!sourceHome.includes('component-workbench'), 'legacy component-workbench landing is absent'],
];

for (const [passed, description] of checks) {
  if (!passed) throw new Error(`Deployment smoke check failed: ${description}`);
  console.log(`pass: ${description}`);
}
