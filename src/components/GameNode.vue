<script lang="ts">
import { defineComponent } from 'vue';
import Outcome from '../types/Outcome';
import type { PropType } from 'vue'

/* eslint-disable */
export default defineComponent({
  props: {
    playerCount: Number,
    state: Object as PropType<Outcome>,
    participants: Array as PropType<String[]>
  }
})

</script>

<template>
  <div>
    3
    <p>{{ playerCount }} -- {{ state?.NumberOfHackersDetected }} -- {{ state?.Result }}</p>

    <div style="text-align:center;">
      <div class="tooltip">Hover over me
        <span class="tooltiptext">Where to insert data</span>
      </div>

    </div>
  </div>
</template>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>