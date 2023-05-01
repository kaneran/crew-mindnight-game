<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MindnightPlayer from './MindnightPlayer.vue';

@Options({
  components: {
    MindnightPlayer
  },
})
export default class PlayerRoom extends Vue {}
</script>

<template>
    <div>
        Player Room
        <p>Where to populate the players</p>
        <MindnightPlayer name="Speedy" imagePosition="left"/>
    </div>
</template>