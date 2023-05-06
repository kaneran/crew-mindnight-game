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
        <p style="color: green">{{ objective }}</p>
    </div>
</template>

<style scoped>
#role{
  display: flex;
  justify-content: center;
}

p{
  font-size: x-large;
}
</style>