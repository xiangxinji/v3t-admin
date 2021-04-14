<template>
  <div class="logo" :style="{ width: fold ? layoutStyles.LogoWidth : '50px'}">
    <router-link class="router-link" to="/">
      <h1>
        {{  title  }}
      </h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import settings from '@/utils/settings';
import { useFolder } from '@/layout/utils';

export default defineComponent({
  inject: ['layoutStyles'],
  setup() {
    const title = settings.appTitle;
    const { fold } = useFolder();
    return {
      title,
      fold,
    };
  },
});
</script>

<style lang="scss" scoped>
  h1{color:white;padding:0 8px}
  .logo{height:100%;line-height:50px;transition:width .3s ease-in-out;}
</style>
