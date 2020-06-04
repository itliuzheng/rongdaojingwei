<template>
  <div class="pr-wrap">
    <div class="wrap-part first">
      <vue-scroll
        ref="vs"
        :ops="ops"
        @refresh-start="handleRS"
        @load-before-deactivate="handleLBD"
        @refresh-before-deactivate="handleRBD"
        @load-start="handleLoadStart"
      >
        <template v-for="(item,index) in tableData">
          <el-card class="box-card" >
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
                        <p class="fl">利率范围:</p>
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
          暂无更多
        </div>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
	import { productType, formatter } from "@/api/common"
	import Bus from '@/unit/bus.js'
export default {
  props: {
      tableData:{
          default:[]
      }
  },
  mounted() {

  },
  data() {
    const config = {};
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

  config.animateTip = '您也可以通过slot来自定义不同的刷新/加载动画。';

    return {
      ops,
      config,
      width: '',
      operationOps: {
        rail: {
          size: '20px'
        },
        bar: {
          size: '15px',
          opacity: 0.5,
          onlyShowBarOnScroll: false
        }
      },
      refresh: 1,
      noData: false
    };
  },
  computed: {
  },
  methods: {
    formatterList(val){
        return formatter(val,productType)
    },
    handleRS(vsInstance, refreshDom, done) {
        console.log('刷新');
      let _this = this;

      _this.$emit('refreshScroll',done);

      Bus.$on('refreshEnd',function () {
          _this.noData = false;
          done();
      })
      // setTimeout(() => {
      //
      // }, 1500);
    },
    handleLoadStart(vm, dom, done) {
      let _this = this;
      console.log('开始下拉1');

      _this.$emit('loadScroll',done);

      Bus.$on('loadEnd',function (res) {
          if(res){
              _this.noData = true;
          }
          done();
      })
    },
    handleLBD(vm, loadDom, done) {
        console.log('上拉加载完成');
      setTimeout(() => {
        done();
      }, 500);
    },
    handleRBD(vm, loadDom, done) {
        console.log('下拉刷新完成');

      setTimeout(() => {
        done();
      }, 500);
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

      &.first {
        height: 60%;
      }

      &.second {
        height: 40%;
      }
    }
  }
}

.pr-wrap {
  display: flex;
  height: 100%;
  justify-content: center;

  table {
    margin: 0;
  }

  .rl-child {
    width: 100%;
    height: 200px;
  }

  .wrap-part {
    height: 100%;

    &.first {
      width: 40%;
    }

    &.second {
      width: 30%;
    }

    .parent {
      .rl-child {
      }
    }

    table {
      display: table;
      width: 100%;
    }
  }
}

.child1 {
  background-color: #43d2c6;
}

.child2 {
  background-color: #589be5;
}

.child3 {
  background-color: #f3b500;
}

.child4 {
  background-color: #ff705a;
}

.child5 {
  background-color: #fe7a9c;
}

.child6 {
  background-color: #7a85ee;
}

.child7 {
  background-color: #57cc71;
}

.animate-tip {
  text-align: center;
}
</style>