<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue'

/* eslint-disable */
export default defineComponent({
  props: {
    playerName: String,
    participants: Array as PropType<String[]>
  }
})

</script>

<template>
    <div>
        <p>{{ playerName }}'s Team Proposition:</p>
        <p v-for="player in participants">{{ player }}</p>
        <p>{{ participants?.length }}/2</p>
        <button>Accept</button>
    </div>
</template>