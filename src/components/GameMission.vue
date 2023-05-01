<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    role: String,
    objective: String
  }
})

</script>

<template>
    <div>
        <p>YOU ARE A {{ role }}</p>
        <p>{{ objective }}</p>
    </div>
</template>