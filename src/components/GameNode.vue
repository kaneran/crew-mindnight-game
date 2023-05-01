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
    </div>
</template>