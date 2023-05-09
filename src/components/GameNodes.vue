<script lang="ts">
import Node from '@/types/Node';
import GameNode from './GameNode.vue';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  props: {
    nodes: [] as PropType<Node[]>
  },
  components: {
    GameNode
  },
})
</script>

<template>
    <div>
        Game Nodes
        <p>Where to populate the nodes</p>
        <GameNode playerCount="3" :state="{numberOfHackersDetected: 2, result: 'Secure'}"/>
    </div>
</template>

<style scoped>
div{
  border: 5px solid purple;
}
</style>