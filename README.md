# Krimi: A Game of deduction and deception.

![Krimi](https://miro.medium.com/max/2000/1*pttcKSn12VD0Tpds2EIs0w.png)

I am a huge boardgame fan and collector. Also, I am an UX designer and game designer. I’d been thinking for a while now that I could mix these things into creating digital boardgames.

My idea was that I could make a big screen (as a computer monitor, or — even better — a living room TV) work as the common board, shared by all players, and use the players’ mobile phones as their pieces and method of interaction.

As I said, I love boardgames and I love the social interaction that they allow. I also love the physical component that they have. But I do understand that they take a huge space in any house. And many times they are hard to get, and they are troublesome to transport to places.

So I thought that these digital boardgames could be a fun alternative to a game someone could not yet buy, or as a game you could play anywhere with internet access.

## Krimi
[Deception: Murder in Hong Kong, by Tobey Ho](https://www.greyfoxgames.com/games/deception-murder-in-hong-kong/), is the second game of the Ludoratory.

If you haven’t played it yet, I recommend you to try to get a copy as soon as you can, because it is an amazing game.

My take on it, Krimi, is a realtime multiplayer version of that boardgame, where the big screen holds all the supsects, and the mobile phones are used each players cards. There are some little changes from the original game (I built the game using the house rules that we play), so I’ve written a short article explaining the rules here.

### Credits
I’ve made the design and coding for the game using some help from frameworks, libraries and resources:

- [Vue.js](https://vuejs.org/) for the front-end, using [Vue-CLI](https://cli.vuejs.org/), with PWA support.
- [Firebase](http://firebase.google.com) for managing the real-time updates.
- [Vuetify](https://vuetifyjs.com/en/) for basic layout and design.
- [Vue QRCode](https://github.com/xkeshi/vue-qrcode), by xkeshi, for creating QRCodes for each new game.
- [Vue Translate](https://github.com/javisperez/vuetranslate), by javisperez, to allow the game to be played both in English or Portuguese.
- [person behind fog glass](https://unsplash.com/photos/ZC0EbdLC8G0), by Stefano Pollio, for the background image.
- [Vue Typer](https://github.com/cngu/vue-typer), by cngu, for the homepage effect.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## That’s it!
You can play the game now at https://krimi.ludoratory.com. I am eager to hear any critiques, doubts, comments and suggestions you might have about the game, my code or the Ludoratory project.

Thank you, and I hope you enjoy the game.
