<template>
  <el-submenu v-if="config.hasChildren" :index="config.target">
    <template #title>
      <i :class="config.icon"></i>
      <span>{{  config.title  }}</span>
    </template>
    <aside-bar-item v-for="(child , ind ) in config.children" :config="child" :key="index + '-' + ind " :index="child.target"/>
  </el-submenu>
  <el-menu-item v-else :index="!config.outLink ? config.target : null" @click="handleOpenOutLink(config)">
    <i :class="config.icon"></i>
    <template #title>
      <span>{{  config.title  }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NormolizedMenuTree } from '@/types/system';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<NormolizedMenuTree>,
      required: true,
    },
    index: {
      type: [String, Number],
    },
  },
  name: 'AsideBarItem',
  setup(props) {
    return props;
  },
  methods: {
    handleOpenOutLink(config : NormolizedMenuTree) {
      if (!config.outLink) return;
      window.open(config.target);
    },
  },
});
</script>
<style lang="scss" scoped>

</style>
