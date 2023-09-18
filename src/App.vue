<script setup lang="ts">
import Chart from "./components/Chart.vue";
import { ref } from "vue";

const array_size = ref(4);
const type_size = ref(4);
const show_count = ref(false);

const isDev = import.meta.env.MODE === "development";
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div class="md:w-1/2 flex flex-col items-center">
      <div class="array-display flex items-center my-12">
        <span class="bracket">[</span>

        <div
          v-if="type_size"
          v-for="prvek in array_size"
          :key="prvek + 'prvek'"
          class="array-element"
        >
          <div
            v-for="byte in type_size"
            :key="byte"
            :class="{ 'border-l': byte !== 1 }"
            class="byte-box"
          ></div>
          <span class="index">
            {{ show_count ? prvek - 1 : "" }}
          </span>
        </div>
        <span class="bracket">]</span>
      </div>

      <!-- Ovladani -->
      <div
        class="border-4 border-purple-500 border-opacity-20 border-double m-2 p-8 rounded-2xl"
      >
        <div class="input-group mb-4">
          <label for="array_size" class="mr-2">Velikost pole:</label>
          <input
            min="0"
            id="array_size"
            type="number"
            v-model="array_size"
            class="border p-1"
          />
        </div>

        <div class="input-group mb-4">
          <label for="type_size" class="mr-2">Velikost typu v bytech:</label>
          <input
            min="0"
            id="type_size"
            type="number"
            v-model="type_size"
            class="border p-1"
          />
        </div>

        <div class="input-group">
          <label for="show_count" class="mr-2">Zobrazit indexy:</label>
          <input id="show_count" type="checkbox" v-model="show_count" />
        </div>
      </div>
    </div>
  </div>

  <template v-if="isDev">
    <div class="h-screen bg-black rd">
      <Chart />
    </div>
  </template>
</template>
