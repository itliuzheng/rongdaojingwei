<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
			:unique-opened='true'
    >
    <el-header class="header">
			<router-link to="/home" class="toMian">{{ title }}</router-link>
		</el-header>
      <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      title:'运营管理系统',
    }
  },
  created(){
  },
  methods:{

  },
  computed: {
    ...mapState([
      'sidebar','routers'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style type="text/css">
	.toMian {
		height: 100%;
		width:100%;
		text-align: center;
		vertical-align: middle;
		line-height: 60px;
		color:#ffffff;
		font-size: 20px;
	}
	.toMian:hover{
		color:#ffffff
	}
	.toMian:focus{
		color:#ffffff
	}
</style>
