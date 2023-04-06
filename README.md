# Clip Banner

<img src="./example.webp"/>

## Install
```shell
yarn add clip-banner
```

## Use
```javascript
let painter = new Painter({
  immediate: true,
  instrument: new Instrument({
    loop: true,
    keepLastStage: true,
    drawLastStageAsBackground: true,
    stages: [
      new ImageInstrument({
        initIndex: 1,
        img: 'path/img1.jpg',
        enterTime: 2000,
        showTime: 2000,
      }),
      new ImageInstrument({
        img: 'path/img2.jpg',
        enterTime: 2000,
        showTime: 2000,
      }),
    ],
  }),
  canvansEl
});

```