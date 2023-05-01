<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameNode from './GameNode.vue';

@Options({
  components: {
    GameNode
  },
})
export default class GameNodes extends Vue {}
</script>

<template>
    <div>
        Game Nodes
        <p>Where to populate the nodes</p>
        <GameNode playerCount="3" :state="{NumberOfHackersDetected: 2, Result: 'Secure'}"/>
    </div>
</template>