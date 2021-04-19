<template>
  <div class="home">
    home
    <button @click="target"> Click Me </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      target() {
        router.push('/about/manager');
      },
    };
  },
});
</script>
