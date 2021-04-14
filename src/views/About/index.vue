<template>
  <div class="about">
    <el-input v-model="state.value"></el-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    const state = reactive({
      value: '',
    });
    return {
      state,
    };
  },
});
</script>
