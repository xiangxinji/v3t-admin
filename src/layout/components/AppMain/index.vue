<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="state.includes">
        <component :is="Component" :key="$route.fullPath" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useAppMain } from '@/layout/components/AppMain/utils';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const state = reactive({
      includes: [],
    });
    useAppMain({ store, state });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-main{
  padding:10px;
}
</style>
