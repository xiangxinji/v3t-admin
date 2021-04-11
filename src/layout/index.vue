<template>
  <el-container>
    <el-header :height="ElementStyles['HeaderHeight']">
      <nav-bar :fold="fold" @change-fold="toggleFolder"/>
    </el-header>
    <el-container>
      <el-aside style="width:auto;">
        <aside-bar :fold="fold" />
      </el-aside>
      <el-main :style="{height: ElementStyles['MainHeight']}">
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { defineComponent } from 'vue';
import { AsideBar, NavBar, AppMain } from './components';
import { getLayoutStyles, useFolder } from './utils';

const r = getLayoutStyles();
export default defineComponent({
  provide: {
    layoutStyles: r,
  },
  components: {
    AsideBar,
    NavBar,
    AppMain,
  },
  setup() {
    const { fold, toggleFolder } = useFolder();
    return {
      ElementStyles: r,
      fold,
      toggleFolder,
    };
  },
});
</script>
<style lang="scss" scoped>
::v-deep .el-main,
.el-header {
  padding: 0;
}
</style>
