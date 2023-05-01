<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  <GameNode/>
  <PlayerRoom/>
  <GameNodes/>
  <GameMission role="Agent" objective="SECURE 3 NODES"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import GameNode from './components/GameNode.vue';
import PlayerRoom from './components/PlayerRoom.vue';
import GameNodes from './components/GameNodes.vue';
import GameMission from './components/GameMission.vue';

@Options({
  components: {
    HelloWorld,
    GameNode,
    PlayerRoom,
    GameNodes,
    GameMission
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
