<template>
  <div class="aside-bar" >
    <el-menu router class="el-menu-vertical-aside" :collapse="!fold" :default-active="state.defaultActive"
      :background-color="styles['asideBackground']"
      :active-text-color="styles['asideActiveColor']"
             :text-color="styles['asideColor']"
    >
      <aside-bar-item v-for="(menu,index) in state.menus" v-bind:config="menu" :key="index" :index="index"></aside-bar-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, watch } from 'vue';
import variables from '@/assets/styles/_variables.scss';
import { useStore } from 'vuex';
import { useAsideBar } from '@/layout/components/AsideBar/utils';
import { useRoute } from 'vue-router';
import AsideBarItem from './AsideBarItem.vue';

function getAsideStyles() {
  const s = variables as any;
  return Object.keys(variables).reduce((result : any, key) => {
    if (key.indexOf('aside') === 0) result[key] = s[key];
    return result;
  }, {});
}

export default defineComponent({
  props: {
    fold: { type: Boolean, default: true },
  },
  components: {
    AsideBarItem,
  },
  setup() {
    const styles = getAsideStyles();
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
      styles,
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
::v-deep .el-menu-item.is-active{
  background-color : $aside-active-background !important;
}

::v-deep .el-menu-item,::v-deep .el-submenu__title{
  color : hsla(0,0%,100%,.7) !important;
}
</style>
