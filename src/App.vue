<template>
  <PlayerBadge playerName="Speedy" role="Agent"/>
  <PlayerRoom/>
  <GameNodes/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import GameNode from './components/GameNode.vue';
import PlayerRoom from './components/PlayerRoom.vue';
import GameNodes from './components/GameNodes.vue';
import GameMission from './components/GameMission.vue';
import PlayerBadge from './components/PlayerBadge.vue';

@Options({
  components: {
    HelloWorld,
    GameNode,
    PlayerRoom,
    GameNodes,
    GameMission,
    PlayerBadge
  },
})
export default class App extends Vue {}
</script>

<style>
@font-face {font-family: "Mouse"; src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot"); src: url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.eot?#iefix") format("embedded-opentype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff2") format("woff2"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.woff") format("woff"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.ttf") format("truetype"), url("//db.onlinewebfonts.com/t/ea190e72b8a91dc5ff8b8ef953bb1e9f.svg#Mouse") format("svg"); } 
#app {
  font-family: "Mouse", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width:auto;
}
</style>
