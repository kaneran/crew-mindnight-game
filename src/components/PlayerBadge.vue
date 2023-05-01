<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    playerName: String,
    role: String
  }
})
</script>

<template>
    <div>
        <p>{{ playerName }}</p>
        <p>{{ role }}</p>
    </div>
</template>