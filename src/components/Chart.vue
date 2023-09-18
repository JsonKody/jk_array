<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import * as d3 from "d3";
import { graphs_data } from "./mock";

const svg = ref<SVGSVGElement | null>(null);
const chartClass = "h-60 w-full";
const graphs = ref(graphs_data);
const currentLanguage = ref<"cs" | "en">("en");
const selectedGraphs = reactive(new Set(graphs_data.map((g) => g.name.en)));

let allData: any = []; // Přesun ven z onMounted

const redraw = () => {
  // Tvůj redraw kód zde
};

onMounted(() => {
  if (!svg.value) return;

  // Ostatní inicializační kód...

  allData = graphs.value.map((graph) => ({
    name: graph.name,
    data: graph.data.map(([time, value]) => ({ time, value })),
  }));

  // Ostatní inicializační kód...

  redraw();
});

watch(
  () => currentLanguage.value,
  () => {
    redraw();
  }
);

watch(
  () => selectedGraphs,
  () => {
    redraw();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col">
    <div :class="chartClass">
      <svg ref="svg"></svg>
    </div>
    <div class="legend">
      <button
        v-for="graph in graphs"
        :key="graph.name.en"
        @click="toggleGraph(graph.name[currentLanguage])"
      >
        {{ graph.name[currentLanguage] }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  text-align: center;
  width: 80px;
  height: 28px;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
