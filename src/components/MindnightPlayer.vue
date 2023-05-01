<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    playerName: String,
    imagePosition: String
  }
})

</script>

<template>
    <div>
        <img src="../assets/character.jpg" :alt="playerName" :class="{left : imagePosition === 'left'}"/>
        <p>{{ playerName }}</p>
    </div>
</template>

<style scoped>
img{
  width:60px;
}

img.left{
  transform: scaleX(-1);
}

div{
  min-width: 35%;
  border: 5px solid green;
  flex-grow: 1;
}
</style>