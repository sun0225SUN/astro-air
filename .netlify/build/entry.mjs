import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DsyWDHzC.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/about.astro.mjs');
const _page1 = () => import('./pages/archive.astro.mjs');
const _page2 = () => import('./pages/atom.xml.astro.mjs');
const _page3 = () => import('./pages/en/about.astro.mjs');
const _page4 = () => import('./pages/en/archive.astro.mjs');
const _page5 = () => import('./pages/en/en/posts/_---slug_.astro.mjs');
const _page6 = () => import('./pages/en/en/tags/_tag_.astro.mjs');
const _page7 = () => import('./pages/en/posts/_---slug_.astro.mjs');
const _page8 = () => import('./pages/en/posts/_---slug_.astro2.mjs');
const _page9 = () => import('./pages/en/tags/_tag_.astro.mjs');
const _page10 = () => import('./pages/en/tags/_tag_.astro2.mjs');
const _page11 = () => import('./pages/en/tags.astro.mjs');
const _page12 = () => import('./pages/en/zh/posts/_---slug_.astro.mjs');
const _page13 = () => import('./pages/en/zh/tags/_tag_.astro.mjs');
const _page14 = () => import('./pages/en.astro.mjs');
const _page15 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page16 = () => import('./pages/robots.txt.astro.mjs');
const _page17 = () => import('./pages/tags/_tag_.astro.mjs');
const _page18 = () => import('./pages/tags.astro.mjs');
const _page19 = () => import('./pages/zh/posts/_---slug_.astro.mjs');
const _page20 = () => import('./pages/zh/tags/_tag_.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/about/index.astro", _page0],
    ["src/pages/archive/index.astro", _page1],
    ["src/pages/atom/index.xml.ts", _page2],
    ["src/astro_tmp_pages_en/about/index.astro", _page3],
    ["src/astro_tmp_pages_en/archive/index.astro", _page4],
    ["src/astro_tmp_pages_en/en/posts/[...slug].astro", _page5],
    ["src/astro_tmp_pages_en/en/tags/[tag].astro", _page6],
    ["src/pages/en/posts/[...slug].astro", _page7],
    ["src/astro_tmp_pages_en/posts/[...slug].astro", _page8],
    ["src/pages/en/tags/[tag].astro", _page9],
    ["src/astro_tmp_pages_en/tags/[tag].astro", _page10],
    ["src/astro_tmp_pages_en/tags/index.astro", _page11],
    ["src/astro_tmp_pages_en/zh/posts/[...slug].astro", _page12],
    ["src/astro_tmp_pages_en/zh/tags/[tag].astro", _page13],
    ["src/astro_tmp_pages_en/index.astro", _page14],
    ["src/pages/posts/[...slug].astro", _page15],
    ["src/pages/robots/index.txt.ts", _page16],
    ["src/pages/tags/[tag].astro", _page17],
    ["src/pages/tags/index.astro", _page18],
    ["src/pages/zh/posts/[...slug].astro", _page19],
    ["src/pages/zh/tags/[tag].astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "b398f6c4-5e35-4573-8803-aeedff401909"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
