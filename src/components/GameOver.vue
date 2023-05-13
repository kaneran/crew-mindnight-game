<script lang="ts">
import { PropType, defineComponent } from 'vue';
import GameOverData from '@/types/GameOverData';
import ParticipantList from './ParticipantList.vue';

export default defineComponent({
    props: {
        finalGameData: {} as PropType<GameOverData>
    },
    components:{
        ParticipantList
    },
    mounted() {
        var fileName = this.finalGameData?.hackersWin ? 'hackers_win.mp3' : 'agents_win.mp3'
        var gameOverAudio = new Audio(require(`../assets/sounds/${fileName}`))
        gameOverAudio.play()
    },
})
</script>

<template>
    <div id="gameOver">
            <p id="gameStatus" :class="finalGameData.hackersWin ? 'hacker' : 'agent'">{{ finalGameData?.message }} </p>
            <div id="hackers">
              <p :style="{ fontSize: 'x-large' }">Hackers:&nbsp;</p>
              <ParticipantList :participants="finalGameData.participants" />
            </div>
          </div>
</template>

<style scoped>
#hackers {
  display: flex;
}

#gameStatus {
  font-size: xxx-large;
  margin: 30px;
}

#gameOver {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>