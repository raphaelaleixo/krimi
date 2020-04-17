module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Krimi",
    themeColor: "#FFFFFE",
    msTileColor: "#FFFFFE",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "white",
    workboxOptions: {
      skipWaiting: true,
      navigateFallback: "/index.html",
    },
  },
};
