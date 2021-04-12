<template>
  <div class="home">
    home
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const store = useStore();
    console.log(store.getters.roles);
  },
});
</script>
