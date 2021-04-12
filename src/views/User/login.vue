<template>
  <div>
    用户名
    <input type="text" v-model="formData.username">
    密码
    <input type="text" v-model="formData.password">
    <button @click="submit(formData)">提交</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { createLoginSubmit } from './utils';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const formData = reactive({
      username: '',
      password: '',
    });
    return {
      formData,
      submit: createLoginSubmit(store, formData, router),
    };
  },
});
</script>
<style lang="scss" scoped>

</style>
