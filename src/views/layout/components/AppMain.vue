<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <second></second>
      <!--<router-view name="main"></router-view>-->
    </transition>
  </section>
</template>

<script>
import second from '@/views/layout/components/Second.vue'
export default {	
  name: 'AppMain',
	components:{ second },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  padding: 10px;
}
</style>
