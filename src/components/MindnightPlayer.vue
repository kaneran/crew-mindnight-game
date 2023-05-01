<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    name: String,
    imagePosition: String
  }
})

</script>

<template>
    <div>
        <img src="../assets/character.jpg" :alt="name" :class="{left : imagePosition === 'left'}"/>
        <p>{{ name }}</p>
    </div>
</template>