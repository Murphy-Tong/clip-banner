<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ImageInstrument, Instrument, Painter } from "../banner";
const root = ref<HTMLCanvasElement>();
let painter = new Painter({
  immediate: true,
  instrument: new Instrument({
    loop: true,
    keepLastStage: true,
    drawLastStageAsBackground: true,
    stages: [
      new ImageInstrument({
        initIndex: 1,
        img: "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg",
        enterTime: 2000,
        showTime: 2000,
      }),
      new ImageInstrument({
        img: "http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg",
        enterTime: 2000,
        showTime: 2000,
      }),
    ],
  }),
});
onMounted(function () {
  painter.setCanvas(root.value);
});
</script>

<template>
  <button
    @click="
      () => {
        painter?.start();
      }
    "
  >
    start
  </button>
  <button
    @click="
      () => {
        painter?.pause();
      }
    "
  >
    pause
  </button>
  <button
    @click="
      () => {
        painter?.reset();
      }
    "
  >
    reset
  </button>
  <canvas ref="root"></canvas>
</template>

<style scoped>
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
