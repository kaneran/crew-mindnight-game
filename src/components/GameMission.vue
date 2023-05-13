<script lang="ts">
import { defineComponent } from 'vue';

/* eslint-disable */
export default defineComponent({
  props: {
    role: String,
    objective: String
  }
})

</script>

<template>
    <div>
      <div id="role" style="padding: 0;">
        <p style="color: white">YOU ARE AN </p>
        <p style="color: green">&nbsp;{{ role?.toUpperCase() }}</p>
      </div>
        <p id="objective" style="color: green">{{ objective }}</p>
    </div>
</template>

<style scoped>
#role{
  display: flex;
  justify-content: center;
}

#role > p {
  margin: 10px 0px 10px 0px;
}

p{
  font-size: x-large;
}

#objective{
  margin:0;
}
</style>