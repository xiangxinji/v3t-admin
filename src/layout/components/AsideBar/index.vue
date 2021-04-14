<template>
  <div class="aside-bar" >
    <el-menu router class="el-menu-vertical-aside" :collapse="!fold" :default-active="state.defaultActive">
      <aside-bar-item v-for="(menu,index) in state.menus" v-bind:config="menu" :key="index" :index="index"></aside-bar-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useAsideBar } from '@/layout/components/AsideBar/utils';
import { useRoute } from 'vue-router';
import AsideBarItem from './AsideBarItem.vue';

export default defineComponent({
  props: {
    fold: { type: Boolean, default: true },
  },
  components: {
    AsideBarItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      menus: [],
      defaultActive: route.path,
    });
    watch(() => route.path, () => {
      state.defaultActive = route.path;
    });
    useAsideBar({ store, state });
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";
.el-menu-vertical-aside{min-height: calc(100vh - 50px);}
.el-menu-vertical-aside:not(.el-menu--collapse) {
  width: $layout-aside-width;
}
</style>
