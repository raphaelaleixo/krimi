module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Krimi",
    themeColor: "#FFFFFE",
    msTileColor: "#FFFFFE",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    iconsPath: {
      favicon32: "/favicon-32x32.png",
      favicon16: "/favicon-16x16.png",
      appleTouchIcon: "/apple-touch-icon.png",
      maskIcon: "/safari-pinned-tab.svg",
      msTileImage: "/mstile-144x144.png",
    },
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: "/index.html",
    },
  },
};
