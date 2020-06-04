<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
	</div>
</template>
<script>
	//引入基本模板
	let echarts = require('echarts/lib/echarts')

	// 引入折线图等组件
	require('echarts/lib/chart/bar')
	//require('echarts/lib/chart/pictorialBar')
	// 引入提示框和title组件，图例
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	require('echarts/lib/component/legend')

	export default {
		name: 'echartsMain',
		props: {
			className: {
				type: String,
				default: 'yourClassName'
			},
			type: {
				type: Number,
				default: 1
			},
			id: {
				type: String,
				default: 'yourID'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '400px'
			},
			XData: {
				type: Array,
			},
			passData: {
				type: Array,
			},
			/* cancelData: {
				type: Array,
			}, */
		},
		computed: {
			/* _passData() {
				return this.passData 
			},
			_cancelData() {
				return this.cancelData 
			} */
		},
		watch: {
			passData(newValue, oldValue) {
				//console.log("watch")
				//console.log(oldValue)
				//console.log(newValue)
				let valuePass = [];
				newValue.forEach(el => {
					valuePass.push(el);
				})
				this._valuePass	= valuePass
				this.initChart();
			},
			/* cancelData(newValue, oldValue) {
				//console.log("watch")
				//console.log(oldValue)
				//console.log(newValue)
				let valueCancel = [];
				newValue.forEach(el => {
					valueCancel.push(el);
				})
				this._valueCancel	= valueCancel
				this.initChart();
			}, */
		},
		data() {
			return {
				chart: null,
				_valuePass: [],
				_valueCancel: [],
				yName: '百万',
			}
		},
		mounted() {
			this.initChart();
		},
		beforeDestroy() {
			if(!this.chart) {
				return
			}
			this.chart.dispose();
			this.chart = null;
		},
		methods: {
			initChart() {
				if (1 === this.type) {
					this.yName = '万'
				} else {
					this.yName = '个'
				}
				const option = {
					color: ['#519be6', '#ec6262'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						/* formatter:function(parmas){
						} */
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: this.XData,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value',
						name: this.yName,
						splitNumber: '5',
						//interval: 5,
						minInterval: '1',
						//min: 1
					}],
					legend: {
						data: ['批准申请', '取消申请']
					},
					series: [{
						name: '批准申请',
						type: 'bar',
						barWidth: '30%',
						stack: 'apply',
						data:  this._valuePass,
						itemStyle: {
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 10,
							barBorderRadius: [0, 0, 5, 5] //（顺时针左上，右上，右下，左下）
						}
					}, /* {
						name: '取消申请',
						type: 'bar',
						barWidth: '30%',
						stack: 'apply',
						data:  this.cancelData,
						itemStyle: {
							shadowColor: 'rgba(0, 0, 0, 0.5)',
							shadowBlur: 10,
							barBorderRadius: [5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
						}
					} */]
				}
				
				this.chart = echarts.init(this.$refs.myEchart); // 把配置和数据放这里				
				this.chart.setOption(option)
			}
		}
	}
</script>