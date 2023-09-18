<script setup lang="ts">
import { ref, onMounted, watch, reactive } from "vue";
import * as d3 from "d3";
import { graphs_data } from "./mock";

const svg = ref<SVGSVGElement | null>(null);
const chartClass = "h-60 w-full";
const graphs = ref(graphs_data);
const currentLanguage = ref<"cs" | "en">("en");
const selectedGraphs = reactive(new Set(graphs_data.map((g) => g.name.en)));

const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const chartDiv = ref<HTMLDivElement | null>(null);

function redraw() {
  if (!svg.value) return;

  const svgWidth = chartDiv.value.clientWidth; // Získání šířky rodičovského div
  const svgHeight = chartDiv.value.clientHeight;

  // Odstranění starého obsahu
  d3.select(svg.value).selectAll("*").remove();

  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

  const allData = graphs.value.map((graph) => ({
    name: graph.name,
    data: graph.data.map(([time, value]) => ({ time: parseTime(time), value })),
  }));

  const xScale = d3
    .scaleUtc()
    .domain(
      d3.extent(
        allData.flatMap((d) => d.data),
        (d) => d.time
      ) as [Date, Date]
    )
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        allData.flatMap((d) => d.data),
        (d) => d.value
      ) as number,
    ])
    .range([height, 0]);

  const svgContainer = d3
    .select(svg.value)
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svgContainer.append("g").call(d3.axisLeft(yScale));

  // vykresleni grafu
  allData.forEach((graph, index) => {
    if (selectedGraphs.has(graph.name[currentLanguage.value])) {
      svgContainer
        .append("path")
        .datum(graph.data)
        .attr("fill", "none")
        .attr("stroke", d3.schemeCategory10[index % 10])
        .attr("stroke-width", 2)
        .attr(
          "d",
          d3
            .line()
            .x((d) => xScale(d.time))
            .y((d) => yScale(d.value))
        );
    }
  });
}

onMounted(() => {
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

function toggleGraph(name: string) {
  if (selectedGraphs.has(name)) {
    selectedGraphs.delete(name);
  } else {
    selectedGraphs.add(name);
  }
  redraw();
}

function isSelected(name: string): boolean {
  return selectedGraphs.has(name);
}
</script>

<template>
  <div class="flex flex-col">
    <div :class="chartClass" ref="chartDiv">
      <svg ref="svg"></svg>
    </div>
    <div class="legend">
      <button
        v-for="graph in graphs"
        :key="graph.name.en"
        @click="toggleGraph(graph.name[currentLanguage])"
        :class="{ active: isSelected(graph.name[currentLanguage]) }"
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

.active {
    color: rgb(0, 255, 149);
}
</style>
