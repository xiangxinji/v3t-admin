<template>
  <div class="home">
    <button @click="target"> Click Me </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const router = useRouter();
    return {
      target() {
        router.push('/about/manager');
      },
    };
  },
});
</script>
