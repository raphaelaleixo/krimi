module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Krimi",
    themeColor: "#FFFFFE",
    msTileColor: "#FFFFFE",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    manifestOptions: {
      icons: [
        {
          src: "./android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },
    iconPaths: {
      favicon32: "./favicon-32x32.png",
      favicon16: "./favicon-16x16.png",
      appleTouchIcon: "./apple-touch-icon.png",
      maskIcon: "./safari-pinned-tab.svg",
      msTileImage: "./mstile-144x144.png"
    },
    workboxOptions: {
      exclude: [/\.css.map$/, ".htaccess"]
    }
  }
};
