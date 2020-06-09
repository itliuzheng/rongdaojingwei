<template>
  <div class="pr-wrap">
    <div  v-if="tableData.length != 0" class="wrap-part">
      <vue-scroll
        ref="vs"
        :ops="ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart"
      >
        <template v-for="(item,index) in tableData">
          <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <el-button @click.native.prevent="check(item)" type="text" size="small">
                        查看
                    </el-button>
                    <el-button @click.native.prevent="edit(item)" type="text" size="small" v-if="role === 'super'">
                        修改
                    </el-button>
                    <el-button @click.native.prevent="del(item)" type="text" size="small" v-if="role === 'super'">
                        删除
                    </el-button>
                    <!-- <el-button @click.native.prevent="up(item)" type="text" size="small" v-if="item.status===1&&role === 'super'">
                        上架
                    </el-button>
                    <el-button @click.native.prevent="down(item)" type="text" size="small" v-if="item.status===2" style='color:red'>
                        下架
                    </el-button> -->
                </div>
                <el-row :gutter="20" class="card-list">
                    <el-col :span="24" class="clearfix">
                        <p class="fl">产品ID:</p>
                        <p class="fr">{{item.id}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix">
                        <p class="fl">产品名称:</p>
                        <p class="fr">{{item.name}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix">
                        <p class="fl">产品类型:</p>
                        <p class="fr">{{formatterList(item.ptype)}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">产品提供方:</p>
                        <p class="fr">{{item.provider}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">额度范围（万）:</p>
                        <p class="fr">{{ item.amountLower }}-{{ item.amountUpper }}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">期限范围（月）:</p>
                        <p class="fr">{{ item.deadlineLower }}-{{ item.deadlineUpper }}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">利率范围(%/月):</p>
                        <p class="fr">{{ item.rateLower }}-{{ item.rateUpper }}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">状态:</p>
                        <p class="fr">{{ item.status == 1?"下架":"上架" }}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">审批层级:</p>
                        <p class="fr">{{item.highestLevel == 1?"总后台":"一级管理员" }}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">创建时间:</p>
                        <p class="fr">{{item.createDate}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p class="fl">更新时间:</p>
                        <p class="fr">{{item.updateDate}}</p>
                    </el-col>
                    <el-col :span="24" class="clearfix" >
                        <p style="text-align: left; margin-bottom: 10px;">产品图片:</p>
                        <el-image :src="item.image" :fit="'fit'" ></el-image>
                    </el-col>
                </el-row>
            </el-card>
        </template>
        <div class="placeholder_height"></div>
        <div
          slot="load-beforeDeactive"
          v-if="noData"
        >
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8056"
          >
            <path
              d="M469.333333 384h85.333334v213.333333h-85.333334z m0 298.666667h85.333334v85.333333h-85.333334z"
              fill=""
              p-id="8057"
            ></path>
            <path
              d="M549.717333 108.032c-14.762667-27.904-60.672-27.904-75.434666 0l-384 725.333333A42.624 42.624 0 0 0 128 896h768a42.581333 42.581333 0 0 0 37.674667-62.592L549.717333 108.032zM198.869333 810.666667L512 219.221333 825.130667 810.666667H198.869333z"
              fill=""
              p-id="8058"
            ></path>
          </svg>
          暂无更多数据
        </div>
      </vue-scroll>
    </div>
      <div v-else class="no-data">暂无更多数据</div>
  </div>
</template>

<script>
	import { productType, formatter } from "@/api/common"
	import Bus from '@/unit/bus.js'
export default {
  props: {
      tableData:{
          default:[]
      },
      role:{
          default:null
      }
  },
  data() {
    const ops = {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true
        },
        // sizeStrategy:390,

        pushLoad: {
          enable: true,
          auto: true,
          autoLoadDistance: 10
        }
      },
        bar: {
          background:'#c1c1c1',
          opacity: 0.5,
            minSize:0.3
        }
    };
      ops.vuescroll.pullRefresh.tips = {
        deactive: '下拉刷新',
        active: '释放刷新',
        start: '刷新中...',
        beforeDeactive: '刷新成功!'
      };
      ops.vuescroll.pushLoad.tips = {
        deactive: '上拉加载',
        active: '释放加载',
        start: '加载中...',
        beforeDeactive: '加载成功!'
      };

    return {
        ops,
        width: '',
        refresh: 1,
        noData: false,
        isDown:0
    };
  },
  computed: {
  },
    watch:{
      isDown:function (newValue,oldValue) {
          if(this.tableData.length != 0){
              if(this.$refs["vs"]) this.$refs["vs"].refresh();
          }
      }
    },
  methods: {
    check(row){
      this.$emit('check',row);
    },
    edit(row){
      this.$emit('edit',row);
    },
    del(row){
      this.$emit('del',row);
    },
    formatterList(val){
        return formatter(val,productType)
    },
    handleRS(vsInstance, refreshDom, done) {
        console.log('刷新');
      let _this = this;
      _this.$emit('refreshScroll',done);
      done();
    },
    handleLoadStart(vm, dom, done) {
      let _this = this;
      console.log('开始下拉1');

      _this.$emit('loadScroll',done);
        done();
    },
    handleLBD(vm, loadDom, done) {
        let _this = this;
        console.log('上拉加载完成');

        Bus.$on('loadEnd',function (res) {
            _this.noData = res;
            done();
        })
    },
    handleRBD(vm, loadDom, done) {
        console.log('下拉刷新完成');
        let _this = this;
        Bus.$on('refreshEnd',function () {
            console.log('refreshEnd---',_this.isDown);
            _this.isDown += 1;
            done();
        })

    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 719px) {
  .pr-wrap {
    flex-wrap: wrap;
    .wrap-part {
      width: 100% !important;
        max-height: 100%;
        .box-card{
            margin: 10px auto 0;
        }
    }
  }
}

.pr-wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    padding-bottom: 20px;
}
    .placeholder_height{
        height: 20px;
    }

    .no-data{
        line-height: 2;
        margin-top: 20px;
    }

</style>