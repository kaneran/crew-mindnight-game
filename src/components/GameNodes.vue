<script lang="ts">
import { PropType, defineComponent } from 'vue';
import GameProgress from '@/types/GameProgress';
import GameNode from './GameNode.vue';
import GameSetup from '@/types/GameSetup';

export default defineComponent({
    props: {
        gameSetup: {} as PropType<GameSetup>,
        gameProgress: {} as PropType<GameProgress>
    },
    components: { GameNode }
})
</script>

<template>
    <div>
        <GameNode v-for="node in gameSetup?.nodes" :key="node.id" :gameProgress="gameProgress" :gameSetup="gameSetup" :nodeId="node.id"/>
    </div>
</template>

<style scoped>
div{
  border: 5px solid purple;
}
</style>