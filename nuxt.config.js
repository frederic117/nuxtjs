require("dotenv").config();
const webpack = require("webpack");
const axios = require("axios");
import { API_URL, NODE_ENV, BACK_URL } from "./env.js";
import shrinkRay from "shrink-ray-current";
import redirectSSL from "redirect-ssl";

export default {
  render: {
    compressor: shrinkRay(),
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter((f) => f.asType === "script" && f.file === "runtime.js")
          .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },
  pageTransition: {
    name: "page",
    mode: "",
    css: true,
  },
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === "production",
    }),
  ],

  head: {
    title: "footfoot - Pour l'amour du foot",
    ////htmlAttrs: {
    ////  lang: "fr",
    ////},
    noscript: [
      {
        innerHTML: "This website requires JavaScript.",
      },
    ],
    script: [
      {
        src: "https://platform.twitter.com/widgets.js",
        id: "twitter-wjs",
        defer: true,
      },
      {
        src: "https://kit.fontawesome.com/6cb2a75ade.js",
        defer: true,
        crossorigin: "anonymous",
      },
      //// {
      ////   src: "https://webrtc.github.io/adapter/adapter-latest.js",
      ////  defer: true,
      //// },
      //// {
      ////  src: "https://unpkg.com/@daily-co/daily-js",
      ////   src: "https://unpkg.com/@daily-co/daily-js",
      ////   defer: true,
      //// },

      ////{
      //// src: "https://unpkg.com/video.js@6.7.1/dist/video.js",
      //// defer: true
      ////},
      ////{
      //// src: "https://cdn.jsdelivr.net/npm/hls.js@latest",
      ////defer: true
      ////},
      //// {
      ////src: "https://vjs.zencdn.net/7.8.4/video.js",
      ////defer: true
      ////},
      ////{
      ////src: "https://unpkg.com/browse/@videojs/http-streaming@1.13.3/dist/videojs-http-streaming.min.js",
      ////defer: true
      ////}
      ////{
      ////src: "https://js.stripe.com/v3/",
      ////defer: true
      ////},
    ],
    ////link: [{
    //// rel: "stylesheet",
    ////href: "https://vjs.zencdn.net/7.8.4/video-js.css",
    ////defer: true
    ////}, ],

    meta: [
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-touch-fullscreen", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: `description`,
        name: "description",
        content:
          "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
      },

      {
        hid: "robots",
        name: "robots",
        content: "index, follow",
      },
      {
        hid: `keywords`,
        name: "keywords",
        keywords:
          "foot, match en direct, mercato, football, joueurs, pronos, polémiques, stats, résultats et classements",
      },
      {
        hid: `og:type`,
        property: "og:type",
        content: "article",
      },
      {
        hid: `og:title`,
        property: "og:title",
        content: "footfoot - Pour l'amour du football",
      },
      {
        hid: `og:url`,
        property: "og:url",
        content: "https://www.footfoot.co",
      },
      {
        hid: `og:image`,
        property: "og:image",
        content: "https://www.footfoot.co/icon.png",
      },
      {
        hid: `og:description`,
        property: "og:description",
        content:
          "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
      },
      {
        hid: `twitter:card`,
        name: `twitter:card`,
        property: "twitter:card",
        content: "summary",
      },
      {
        hid: `twitter:site`,
        name: `twitter:site`,
        property: "twitter:site",
        content: "footfoot.co",
      },
      {
        hid: `twitter:creator`,
        name: `twitter:creator`,
        property: "twitter:creator",
        content: "@InsidersFoot",
      },
      {
        hid: `twitter:title`,
        name: `twitter:title`,
        property: "twitter:title",
        content: "footfoot - Pour l'amour du football",
      },
      {
        hid: `twitter:description`,
        property: "twitter:description",
        content:
          "Le foot en direct sur footfoot. Les infos, polémiques, joueurs, stats, résultats et classements. Directs, images et vidéos à regarder et à partager",
      },
      {
        hid: `twitter:image`,
        name: `twitter:image`,
        property: "twitter:image",
        content: "/icon.png",
      },
    ],
    link: [
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2048-2732.jpg",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2732-2048.jpg",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1668-2388.jpg",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2388-1668.jpg",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1536-2048.jpg",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2048-1536.jpg",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1668-2224.jpg",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2224-1668.jpg",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1620-2160.jpg",
        media:
          "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2160-1620.jpg",
        media:
          "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1284-2778.jpg",
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2778-1284.jpg",
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1170-2532.jpg",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2532-1170.jpg",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1125-2436.jpg",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2436-1125.jpg",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1242-2688.jpg",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2688-1242.jpg",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-828-1792.jpg",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1792-828.jpg",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1242-2208.jpg",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-2208-1242.jpg",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-750-1334.jpg",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1334-750.jpg",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-640-1136.jpg",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        rel: "apple-touch-startup-image",
        href: "/splashscreeniphone/apple-splash-1136-640.jpg",
        media:
          "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
    ],
  },

  router: {
    middleware: ["auth"],
  },
  loading: {
    color: "#ff7d00",
  },

  generate: {
    routes: ["/"],
  },
  css: [
    "@/assets/css/style.css",
    "plyr/dist/plyr.css",
    "@/assets/css/bulma-modifications.scss",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css",
  ],
  buildModules: [
    "@nuxtjs/router",
    //'@nuxtjs/onesignal',
    "@nuxtjs/pwa",
    [
      "nuxt-compress",
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
    ////["@aceforth/nuxt-optimized-images"]
  ],
  modules: [
    "nuxt-helmet",
    "nuxt-custom-headers",
    "nuxt-axios-duplicate-blocker",
    "@nuxtjs/axios",
    ["v-sanitize/nuxt"],
    "nuxt-brotli",
    "@nuxtjs/proxy",
    "@nuxtjs/auth",
    "cookie-universal-nuxt",
    //"nuxt-material-design-icons",
    "nuxt-rfg-icon",
    "@nuxtjs/manifest",
    "@nuxtjs/robots",
    [
      "nuxt-buefy",
      {
        css: false,
      },
    ],
    "nuxt-imagemin",
    "@nuxtjs/component-cache",
    "@nuxtjs/dotenv",
    [
      "nuxt-facebook-pixel-module",
      {
        /////* module options oldPixelCode:"751661871934205"*/
        track: "PageView",
        pixelId: "204259211175190",
        disabled: false,
      },
    ],
    ////["nuxt-social-meta"],
    "nuxt-ssr-cache",
    "nuxt-logrocket",
    "@neneos/nuxt-animate.css",
    "@luxdamore/nuxt-prune-html",
    "vue-social-sharing/nuxt",
    ////'@nuxtjs/amp',
    [
      "nuxt-font-loader-strategy",
      {
        ignoreLighthouse: true,
        ignoredEffectiveTypes: ["2g", "slow-2g"],
        fonts: [
          ////Font
          {
            fileExtensions: ["woff2", "woff"],
            fontFamily: "sofia_pro_light_condensedRg",
            fontFaces: [
              ////Font-Face
              {
                preload: true,
                localSrc: ["sofiaprolicond"],
                src: "@/assets/sofiaprolicond",
                fontWeight: "normal",
                fontStyle: "normal",
              },
            ],
          },
        ],
      },
    ],
    "nuxt-history-state",
    ////'nuxt-purgecss',
    "nuxt-precompress",
    "nuxt-mobile",
    "@nuxtjs/sitemap",
    "@nuxtjs/feed",
  ],
  rfg: {
    design: {
      ios: {
        pictureAspect: "backgroundAndMargin",
        backgroundColor: "#ffffff",
        margin: "0%",
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true,
        },
        appName: "footfoot",
      },
      desktopBrowser: {
        design: "raw",
      },
      windows: {
        pictureAspect: "noChange",
        backgroundColor: "#da532c",
        onConflict: "override",
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false,
          },
        },
        appName: "footfoot",
      },
      androidChrome: {
        pictureAspect: "noChange",
        themeColor: "#ffffff",
        manifest: {
          display: "standalone",
          orientation: "notSet",
          onConflict: "override",
          declared: true,
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false,
        },
      },
      safariPinnedTab: {
        pictureAspect: "silhouette",
        themeColor: "#5bbad5",
      },
    },
    settings: {
      scalingAlgorithm: "Mitchell",
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false,
    },
  },
  feed: [
    // A default feed configuration object
    {
      path: "/feed.xml", // The route to your feed.
      async create(feed) {
        feed.options = {
          title: "Contest",
          link: "https://footfoot.co/feed.xml",
          description: "Pour l'amour du foot ⚽",
        };

        let round = (
          await axios.get(
            "https://footfoot-api-database-bstmw.ondigitalocean.app/api/bets/one-from-public/"
          )
        ).data;
        let babbles = (
          await axios.get(
            "https://footfoot-api-database-bstmw.ondigitalocean.app/api/babbles/insider/5f3ecf7743eb1a0031d21948?page=1"
          )
        ).data;

        round &&
        round.scope &&
        round.scope.length > 0 &&
        round.scope.filter(
          (m) =>
            new Date(m.date).getDate() == new Date().getDate() &&
            new Date(m.date).getMonth() == new Date().getMonth() &&
            new Date(m.date) > new Date()
        ).length > 0
          ? round.scope
              .filter(
                (m) =>
                  new Date(m.date).getDate() == new Date().getDate() &&
                  new Date(m.date).getMonth() == new Date().getMonth() &&
                  new Date(m.date) > new Date()
              )
              .forEach((match) => {
                feed.addItem({
                  id: match._id,
                  title: "⚽⚽⚽ Jour de match dans ton contest",
                  link: `https://www.footfoot.co/contest/${round._id}`,
                  description: `${match.homeTeamId.name} 🆚 ${match.awayTeamId.name}`,
                  content: "As-tu bien fait ton prono ?",
                });
              })
          : babbles && babbles[0]
          ? feed.addItem({
              title: babbles[0].title,
              id: babbles[0]._id,
              link: `https://www.footfoot.co/dashboard/5f3ecf7743eb1a0031d21948`,
              description: "highligths du match",
            })
          : [];
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 60 * 12, // How long should the feed be cached
      type: "rss2", // Can be: rss2, atom1, json1
      //data: ["Some additional data"], // Will be passed as 2nd argument to `create` function
    },
  ],

  robots: {
    UserAgent: "*",
    Disallow: "/admin",
    Sitemap: "https://www.footfoot.co/sitemap.xml",
  },

  ////set options (see below section)
  historyState: {
    reloadable: false, ////or true
    overrideDefaultScrollBehavior: true, ////or false
  },

  ////oneSignal: {
  ////init: {
  ////appId: '05f19aba-2c5b-4ae1-9211-7d0f8df5be51',
  //// allowLocalhostAsSecureOrigin: true,
  //// welcomeNotification: {
  ////   disable: true
  //// }
  ////}
  ////},

  ////purgeCSS: {
  ////enabled: true,
  ////extractors: [{
  //// extractor: content =>
  ////content
  ////.replace(/<style[\s\S]*>[\s\S]*<\/style>/gi, '')
  //// .match(/[\w-/:]+/g) || [],
  ////     extensions: ['vue'],
  ////}, ],
  ////},

  pruneHtml: {
    hideErrorsInConsole: false,
    hideGenericMessagesInConsole: false, ////Disabled in production
    enabled: false, ////Disabled in dev-mode due to the hot reload (is client-side)
    ////Css selectors to prune
    selectors: [
      'link[rel="preload"][as="script"]',
      'script:not([type="application/ld+json"])',
    ],
    ////It use Cheerio under the hood, so this is the config passed in the cheerio.load() method
    cheerio: {
      xmlMode: false,
    },
    ignoreBotOrLighthouse: false, ////Remove selectors in any case, not depending on Bot or Lighthouse
    isBot: true, ////Remove selectors if is a bot
    isLighthouse: true, ////Remove selectors if match the Lighthouse UserAgent
    matchUserAgent: null, ////Remove selectors if this userAgent is matched
    hookRenderRoute: true, ////Activate in `hook:render:route`
    hookGeneratePage: true, ////Activate in `hook:generate:page`
    lighthouseUserAgent: "lighthouse", ////Value of the Lighthouse UserAgent
  },

  logRocket: {
    logRocketId: "gdxe91/insidersfootball",
    devModeAllowed: false,
  },
  cache: {
    ////if you're serving multiple host names (with differing
    ////results) from the same server, set this option to true.
    ////(cache keys will be prefixed by your host name)
    ////if your server is behind a reverse-proxy, please use
    ////express or whatever else that uses 'X-Forwarded-Host'
    ////header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      ////these are prefixes of pages that need to be cached
      ////if you want to cache all pages, just include '/'
      "/",

      ////you can also pass a regular expression to test a path

      ////to cache only root route, use a regular expression
    ],

    key(route, context) {
      ////custom function to return cache key, when used previous
      ////properties (useHostPrefix, pages) are ignored. return
      ////falsy value to bypass the cache
    },

    store: {
      type: "memory",

      ////maximum number of pages to store in memory
      ////if limit is reached, least recently used page
      ////is removed.
      max: 5,

      ////number of seconds to store this page in cache
      ttl: 6000,
    },
  },

  manifest: {
    name: "footfoot.co",
    short_name: "footfoot",
    description: "Pour l'amour du foot",
    theme_color: "#192b41",
    background_color: "#eef1f7",
    display: "standalone",
    lang: "fr",
    crossorigin: "use-credentials",
    ogImage: `https://www.footfoot.co/icon.png`,
    start_url: "/mypage?standalone=true",
  },
  axios: {
    baseURL: API_URL,
    credentials: true,
  },

  sitemap: {
    path: "sitemap.xml",
    hostname: "https://www.footfoot.co",
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false, ////Enable me when using nuxt generate
    exclude: ["/secret", "/admin/**"],
    async routes() {
      let response;
      try {
        response = await axios.get(
          "https://footfoot-api-database-bstmw.ondigitalocean.app/api/sitemap"
        );
      } catch (e) {
        console.log(e);
        return [];
      }
      return response.data;
    },
    defaults: {
      changefreq: "daily",
      priority: 1,
      lastmod: new Date(),
    },
  },
  plugins: [
    {
      src: "~plugins/ga.js",
      mode: "client",
    },
    {
      src: "~plugins/axios.js",
      mode: "client",
    },
    ////{
    ////src: "~/plugins/push.js",
    ////mode: "client",
    ////},
    ////{
    //// src: "~/plugins/sw.js",
    ////mode: "client",
    ////},
    {
      src: "~/plugins/socket.js",
      mode: "client",
    },
    {
      src: "~plugins/jsontocsv.js",
      mode: "client",
    },

    {
      src: "~plugins/vue-pdf.js",
      mode: "client",
    },
    "~plugins/init.js",
    "~plugins/index",
    {
      src: "~plugins/vue-plyr.js",
      mode: "client",
    },

    {
      src: "~plugins/nuxt-quill-plugin.js",
      mode: "client",
    },
    {
      src: "~plugins/vue-infinite-scroll.js",
      mode: "client",
    },
    {
      src: "~plugins/vue-pdf.js",
      mode: "client",
    },
    {
      src: "@/plugins/vue-awesome-swiper",
      mode: "client",
    },
    { src: "@/plugins/aos", mode: "client" },
  ],
  workbox: {
    importScripts: ["truepushsw.js"],
    cachingExtensions: "@/plugins/workbox-range-request.js",
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/login",
            method: "post",
            propertyName: "token",
          },
          logout: false,
          user: {
            url: "/users/userconnected",
            method: "get",
            propertyName: "",
          },
        },
        tokenRequired: true,
        tokenType: "Bearer",
      },
    },

    redirect: {
      ////login: "/",
      logout: "/mypage/all",
    },
  },

  configureWebpack: {
    output: {
      globalObject: "this", ////`typeof self !== 'undefined' ? self : this`'' -- not working
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  },

  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-methods", { loose: true }]],
    },
    extend(config, ctx) {
      config.output.globalObject = "(self || this)";
    },
    extend(config, { isClient }) {
      config.module.rules.push({
        test: /\.(webp)$/i,
        loaders: ["file-loader?hash=sha512&digest=hex&name=[hash].[ext]"],
      });
    },
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ["data-src", "src"];
        vue.transformAssetUrls.source = ["data-srcset", "srcset"];
      }
    },
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty",
      };
    },
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js",
      }),
    ],
    postcss: {
      plugins: {
        "postcss-custom-properties": true,
      },
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
        chunks: "all",
        maxSize: 100000,
      },
    },
  },
  env: {
    NODE_ENV: NODE_ENV,
    API_URL: API_URL,
    BACK_URL: BACK_URL,
  },
};
