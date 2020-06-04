<template>
  <div id="app">		
		<!-- <vue-particle-line> -->	
			<router-view></router-view>		
		<!-- </vue-particle-line> -->
		
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    
  },
	watch: {
		// 方法1
		/* '$route' (to, from) { //监听路由是否变化
		let canvas = document.getElementById('canvas')
			if(to.path == "/Login"){ //跳转到哪个页面
				canvas.style.zIndex = 1				
			}else{
				canvas.style.zIndex = -1
			}
		}, */
	},

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {width:100%;height:100%}
body {width:100%;height:100%}
body,html,p,div,h1,h2,h3,h4,h5,h6,table,th,td,ul,ol,li{padding:0;margin:0}
.cell {text-align: center;}
</style>
