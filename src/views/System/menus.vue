<template>
  <div> menus
    <el-button @click="$router.push({ path : '/system/users/' + state.count ++ })"> 跳转</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      count: 0,
    });
    return { state };
  },
});
</script>
<style lang="scss" scoped>

</style>
