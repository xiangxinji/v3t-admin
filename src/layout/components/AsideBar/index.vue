<template>
  <div class="aside-bar" >
    <el-menu class="el-menu-vertical-aside" :collapse="!fold">
      <el-submenu index="1" >
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    fold: { type: Boolean, default: true },
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
