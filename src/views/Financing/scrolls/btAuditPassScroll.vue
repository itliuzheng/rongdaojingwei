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
          <div v-if="tableType == 'com'">
              <template v-for="(item,index) in tableData">

                <el-card shadow="never"  class="box-card"  :key="item.number">
                    <div slot="header" class="clearfix">
                        <el-button @click.native.prevent="checkCom(item)" type="text" size="small">
                            查看
                        </el-button>
                        <el-button @click.native.prevent="reviewLogCom(item)" type="text" size="small">
                            查看审核记录
                        </el-button>
                    </div>

                    <el-row class="card-list" :gutter="20">
                        <el-col :span="24" class="clearfix">
                            <p class="fl">融资编号:</p>
                            <p class="fr">{{item.number}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" v-if="userRole!='second'">
                            <p class="fl">所属部门:</p>
                            <p class="fr">{{item.officeName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">所属客户经理:</p>
                            <p class="fr">{{item.manageName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">企业名称:</p>
                            <p class="fr">{{item.companyName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">所属行业:</p>
                            <p class="fr">{{item.industry}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">贷款产品:</p>
                            <p class="fr">{{item.productName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请额度（万）:</p>
                            <p class="fr">{{item.amount}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">贷款用途:</p>
                            <p class="fr">{{item.useFunds}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请期限（月）:</p>
                            <p class="fr">{{item.deadline}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请时间:</p>
                            <p class="fr">{{item.applyDate}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">企业联系人:</p>
                            <p class="fr">{{item.name}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">联系方式:</p>
                            <p class="fr">{{item.mobile}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">补录审核状态:</p>
                            <p class="fr">{{item.reviewStatus === 1?'通过':'不通过'}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">审核时间:</p>
                            <p class="fr">{{item.reviewDate}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">审核人:</p>
                            <p class="fr">{{item.reviewUserName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">不通过原因:</p>
                            <p class="fr">{{item.description}}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </template>
          </div>
          <div v-else>
              <template v-for="(item,index) in tableData">
                <el-card shadow="never"  class="box-card"  :key="item.number">
                    <div slot="header" class="clearfix">
                        <el-button @click.native.prevent="checkPer(item)" type="text" size="small">
                            查看
                        </el-button>
                        <el-button @click.native.prevent="reviewLogPer(item)" type="text" size="small">
                            查看审核记录
                        </el-button>
                    </div>

                    <el-row class="card-list" :gutter="20">
                        <el-col :span="24" class="clearfix">
                            <p class="fl">融资编号:</p>
                            <p class="fr">{{item.number}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" v-if="userRole!='second'">
                            <p class="fl">部门:</p>
                            <p class="fr">{{item.officeName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">所属客户经理:</p>
                            <p class="fr">{{item.manageName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">姓名:</p>
                            <p class="fr">{{item.name}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">联系方式:</p>
                            <p class="fr">{{item.mobile}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">户籍:</p>
                            <p class="fr">{{item.registerAddress}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">职业:</p>
                            <p class="fr">{{item.industry}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请时间:</p>
                            <p class="fr">{{item.applyDate}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">贷款产品:</p>
                            <p class="fr">{{item.productName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请额度（万）:</p>
                            <p class="fr">{{item.amount}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">贷款用途:</p>
                            <p class="fr">{{item.useFunds}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">申请期限（月）:</p>
                            <p class="fr">{{item.deadline}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">补录审核状态:</p>
                            <p class="fr">{{item.reviewStatus === 1?'通过':'不通过'}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">审核时间:</p>
                            <p class="fr">{{item.reviewDate}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">审核人:</p>
                            <p class="fr">{{item.reviewUserName}}</p>
                        </el-col>
                        <el-col :span="24" class="clearfix" >
                            <p class="fl">不通过原因:</p>
                            <p class="fr">{{item.description}}</p>
                        </el-col>
                    </el-row>
                </el-card>
            </template>
          </div>
          <div class="placeholder_height"></div>
        <div slot="load-beforeDeactive" v-if="noData">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8056">
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
	import Bus from '@/unit/bus.js'
export default {
  props: {
      tableData:{
          default:[]
      },
      userRole:{
          default:'second'
      },
      tableType:{
          default:'com'
      },
  },
  data() {
    const ops = {
      vuescroll: {
        mode: 'slide',
        pullRefresh: {
          enable: true
        },
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
    checkCom(row){
      this.$emit('checkCom',row);
    },
    reviewLogCom(row){
      this.$emit('reviewLogCom',row);
    },
    checkPer(row){
      this.$emit('checkPer',row);
    },
    reviewLogPer(row){
      this.$emit('reviewLogPer',row);
    },


    handleRS(vsInstance, refreshDom, done) {
      let _this = this;
      _this.$emit('refreshScroll',done);
      done();
    },
    handleLoadStart(vm, dom, done) {
      let _this = this;
      _this.$emit('loadScroll',done);
        done();
    },
    handleLBD(vm, loadDom, done) {
        let _this = this;
        Bus.$on('loadEnd',function (res) {
            _this.noData = res;
            done();
        })
    },
    handleRBD(vm, loadDom, done) {
        let _this = this;
        Bus.$on('refreshEnd',function () {
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