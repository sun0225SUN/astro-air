import './chunks/index_BDj_P1f5.mjs';
import { N as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_CzcTbIe6.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sunguoqi/Developer/astro-air/","adapterName":"@astrojs/netlify","routes":[{"file":"about.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"archive.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/archive","isIndex":true,"type":"page","pattern":"^\\/archive$","segments":[[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archive/index.astro","pathname":"/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"atom.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/atom.xml","isIndex":true,"type":"endpoint","pattern":"^\\/atom\\.xml$","segments":[[{"dynamic":false,"spread":false,"content":"atom.xml"}]],"params":[],"component":"src/pages/atom/index.xml.ts","pathname":"/atom.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"en/about.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/en/about","pattern":"^\\/en\\/about$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/astro_tmp_pages_en/about/index.astro","pathname":"/en/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}},{"file":"en/archive.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/en/archive","pattern":"^\\/en\\/archive$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/astro_tmp_pages_en/archive/index.astro","pathname":"/en/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}},{"file":"en/tags.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/en/tags","pattern":"^\\/en\\/tags$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/astro_tmp_pages_en/tags/index.astro","pathname":"/en/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}},{"file":"en.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/en","pattern":"^\\/en$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/astro_tmp_pages_en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"never"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":true,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"dynamic":false,"spread":false,"content":"robots.txt"}]],"params":[],"component":"src/pages/robots/index.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"tags.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"never"}}}],"site":"https://localhost:4321/","base":"/","trailingSlash":"never","compressHTML":true,"componentMetadata":[["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/archive/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/en/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/zh/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/en/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/zh/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/en/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/zh/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/astro_tmp_pages_en/about/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/about/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/en/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/zh/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/archive/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/sunguoqi/Developer/astro-air/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/utils/index.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/archive/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/en/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/en/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/zh/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/zh/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/components/astro/blog.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/components/astro/tag.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/zh/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/layouts/post.astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/content/en/about.mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/astro_tmp_pages_en/about/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/content/zh/about.mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/en/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/zh/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/archive/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/sunguoqi/Developer/astro-air/src/pages/atom/index.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/atom/index.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/about/index@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/archive/index@_@astro":"pages/archive.astro.mjs","\u0000@astro-page:src/pages/atom/index.xml@_@ts":"pages/atom.xml.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/about/index@_@astro":"pages/en/about.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/archive/index@_@astro":"pages/en/archive.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/en/posts/[...slug]@_@astro":"pages/en/en/posts/_---slug_.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/en/tags/[tag]@_@astro":"pages/en/en/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/en/posts/[...slug]@_@astro":"pages/en/posts/_---slug_.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/posts/[...slug]@_@astro":"pages/en/posts/_---slug_.astro2.mjs","\u0000@astro-page:src/pages/en/tags/[tag]@_@astro":"pages/en/tags/_tag_.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/tags/[tag]@_@astro":"pages/en/tags/_tag_.astro2.mjs","\u0000@astro-page:src/astro_tmp_pages_en/tags/index@_@astro":"pages/en/tags.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/zh/posts/[...slug]@_@astro":"pages/en/zh/posts/_---slug_.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/zh/tags/[tag]@_@astro":"pages/en/zh/tags/_tag_.astro.mjs","\u0000@astro-page:src/astro_tmp_pages_en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/robots/index.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/zh/posts/[...slug]@_@astro":"pages/zh/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/zh/tags/[tag]@_@astro":"pages/zh/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DsyWDHzC.mjs","/Users/sunguoqi/Developer/astro-air/node_modules/.pnpm/@astrojs+react@4.1.0_@types+node@22.10.2_@types+react-dom@18.3.1_@types+react@18.3.12_jiti@1._3mk4hpwxuja5p57jr6nbp2jieq/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","/Users/sunguoqi/Developer/astro-air/node_modules/.pnpm/astro@5.0.5_@types+node@22.10.2_jiti@1.21.6_rollup@4.27.4_typescript@5.7.2_yaml@2.6.1/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DTShMHH2.mjs","/Users/sunguoqi/Developer/astro-air/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/sunguoqi/Developer/astro-air/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_CtuIb-_y.mjs","~/components/react/language-toggle":"_astro/language-toggle.BK8DI3Sc.js","@astrojs/react/client.js":"_astro/client.BKX-yLGW.js","/Users/sunguoqi/Developer/astro-air/src/components/astro/theme-toggle.astro?astro&type=script&index=0&lang.ts":"_astro/theme-toggle.astro_astro_type_script_index_0_lang.6e6NYRlY.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/sunguoqi/Developer/astro-air/src/components/astro/theme-toggle.astro?astro&type=script&index=0&lang.ts","const t=()=>{const e=document.documentElement.classList.contains(\"dark\");localStorage.setItem(\"theme\",e?\"dark\":\"light\")},n=()=>{const e=document.documentElement;if(!document.startViewTransition){e.classList.toggle(\"dark\"),t();return}document.startViewTransition(()=>{e.classList.toggle(\"dark\"),t()})};document.getElementById(\"themeToggle\").addEventListener(\"click\",n);"]],"assets":["/_astro/index.C89FC0no.css","/favicon.svg","/_astro/client.BKX-yLGW.js","/_astro/index.CcfSqGrV.js","/_astro/language-toggle.BK8DI3Sc.js","/about.html","/archive.html","/atom.xml","/en/about.html","/en/archive.html","/en/tags.html","/en.html","/robots.txt","/tags.html","/index.html"],"buildFormat":"file","checkOrigin":true,"serverIslandNameMap":[],"key":"VE1sf0EyFbqBl+EO0AyhHwLjIPo5GbAyN1F5bwwdYgM="});

export { manifest };
