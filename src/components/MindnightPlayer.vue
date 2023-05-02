<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    playerName: String,
    imagePosition: String
  },
  methods: {
    passPlayerName(){
      this.$emit('changeProposition', this.playerName)
    }
  }
})

</script>

<template>
    <div @click="passPlayerName">
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