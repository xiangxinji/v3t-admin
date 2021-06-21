<template>
  <div> menus
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
