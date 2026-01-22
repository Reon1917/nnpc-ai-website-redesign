import { p as decodeKey } from './chunks/astro/server_B4COP7G5.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B60zn58P.mjs';

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

const manifest = deserializeManifest({"hrefRoot":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/","cacheDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/node_modules/.astro/","outDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/dist/","srcDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/","publicDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/public/","buildClientDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/dist/client/","buildServerDir":"file:///Users/reon/Documents/Github%20Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"ai-server/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ai-server","isIndex":false,"type":"page","pattern":"^\\/ai-server\\/?$","segments":[[{"content":"ai-server","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ai-server.astro","pathname":"/ai-server","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"markdown-page/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/markdown-page","isIndex":false,"type":"page","pattern":"^\\/markdown-page\\/?$","segments":[[{"content":"markdown-page","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/markdown-page.md","pathname":"/markdown-page","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.6_@types+node@25.0.3_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_0da69b95fe7cb00b4af6bc6eb537e8b9/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/consultation","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/consultation\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"consultation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/consultation.ts","pathname":"/api/consultation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/ai-server.astro",{"propagation":"none","containsHead":true}],["/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/markdown-page.md",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.6_@types+node@25.0.3_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_0da69b95fe7cb00b4af6bc6eb537e8b9/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/ai-server@_@astro":"pages/ai-server.astro.mjs","\u0000@astro-page:src/pages/api/consultation@_@ts":"pages/api/consultation.astro.mjs","\u0000@astro-page:src/pages/markdown-page@_@md":"pages/markdown-page.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BUtkN9w9.mjs","/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/node_modules/.pnpm/astro@5.16.6_@types+node@25.0.3_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30.2_0da69b95fe7cb00b4af6bc6eb537e8b9/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dsa768zv.mjs","/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DNywOrv9.mjs","@astrojs/react/client.js":"_astro/client.EAUERNtn.js","/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.-OfecMgn.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/reon/Documents/Github Repos/nnpc-ai-website-redesign/nnpcai-website-redesign/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const i=window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches,t=document.querySelectorAll(\"[data-reveal]\"),o=()=>{t.forEach(e=>e.classList.add(\"is-visible\"))};if(i){o();return}if(\"IntersectionObserver\"in window){const e=new IntersectionObserver((s,n)=>{s.forEach(r=>{r.isIntersecting&&(r.target.classList.add(\"is-visible\"),n.unobserve(r.target))})},{threshold:.2});t.forEach(s=>e.observe(s))}else o()});"]],"assets":["/_astro/ccEnterprise.D3Ji5kTj.png","/_astro/nnpc_hero_img_3.DUUGx_0o.png","/_astro/about.pqKrvhhc.css","/_astro/about.DXoflKvG.css","/_astro/ai-server.DrcR0y5E.css","/_astro/index.DiPu24d7.css","/favicon.svg","/_astro/client.EAUERNtn.js","/about/index.html","/ai-server/index.html","/markdown-page/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"W0K3bpQJ77VNIjMbpge+tV/tfqTVTBFj5P4VdIxLrF0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
