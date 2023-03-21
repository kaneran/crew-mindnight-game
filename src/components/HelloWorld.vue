<script lang="ts">
import { defineComponent } from 'vue';
/* eslint-disable */
export default defineComponent({
  props: {
    msg: String
  },
  data:() => {
    return {
      test: "Iam test",
      showButton: true,
      players: [
        {name: "Kane", role: "Agent"},
        {name: "Speedy", role: "Hacker"},
        {name: "ShadowBeatz", role: "Agent"},
      ]
    }
  },
  methods: {
    updateMsg() {
      this.test = this.showButton ? "Updated the message!" : "Iam test"
      this.showButton = !this.showButton
      const header : any = this.$refs.test
      header.classList.add('success')
    }
  },
  computed:{
    numberOfPlayers(){
      return this.players.length
    }
  }
})

</script>

<template>
  <div class="hello">
    <h1 ref="test">{{ test }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button @click="updateMsg">
    <span v-if="showButton">Update</span>
    <span v-else>Undo</span>
    </button>
    <h2>{{ numberOfPlayers }} players in the lobby</h2>
    <ul>
      <li v-for="player in players" :key="player.name">{{ player.name }} - {{ player.role }}
        <img src="../assets/character.jpg" :alt="player.name" :class="{left : true}"/>
      </li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

li img.left{
  transform: scaleX(-1);
}

.success{
  color: #42b983;
}
</style>

