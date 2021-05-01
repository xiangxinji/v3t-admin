<template>
  <div class="nav-bar">
   <div class="logo-panel"><logo /></div>
    <div :class="{'fold-panel' : true , 'closed' :!fold}" @click="$emit('change-fold')">
      <i class="icon el-icon-s-fold" v-if="fold"></i>
      <i class="icon el-icon-s-unfold" v-else></i>
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path">
        <span v-if="breadcrumb.current">{{ breadcrumb.label }}</span>
        <router-link v-else :to="breadcrumb.path">{{ breadcrumb.label }}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getBreadcrumbs } from '@/layout/utils';
import Logo from './logo.vue';

export default defineComponent({
  props: {
    fold: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Logo,
  },
  setup() {
    const route = useRoute();
    const breadcrumbs = computed(() => getBreadcrumbs(route));
    console.log(breadcrumbs);
    return {
      breadcrumbs,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables" ;
.nav-bar{
  height:100%;
  display:flex;
  align-items:center;
  background-color: $layout-header-background;
  color:white ;
  .logo-panel{height:100%;}
  .fold-panel{
    cursor:pointer;
    .icon{font-size:18px;}padding:0 10px;
  }
  .icon{color:#666;}
}
</style>
