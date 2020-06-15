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
        <template v-for="item in tableData">

            <el-card shadow="never"  class="box-card" :key="item.number">
                <div slot="header" class="clearfix">
                  <template v-for="(list,_index) in scrollButtonList">
                    <el-button v-if="list.isShow"  @click.native.prevent="list.atClick(item)" :type="list.type" size="small" :key="_index">
                        {{list.text}}
                    </el-button>
                  </template>
                </div>
                <el-row :gutter="20" class="card-list">
                    <template v-for="(list,_index) in scrollColumns" >
                      <el-col :key="_index" :span="list.widthPart" class="clearfix"
                              v-if="!list.isIf">
                          <p class="fl">{{list.label}}</p>
                          <p class="fr" v-if="list.prop === 'highestLevel'" >{{item[list.prop] === 1?'总后台':'一级管理员'}}</p>
                          <p class="fr" v-else-if="list.prop === 'reviewStatus'" >{{item[list.prop] === 1?'通过':'不通过'}}</p>
                          <p class="fr" v-else-if="list.prop === 'delFlag'" >{{item[list.prop] === 1?'有效':'无效'}}</p>
                          <p class="fr" v-else>{{item[list.prop]}}</p>
                      </el-col>
                      <div v-else>
                        <el-col :key="_index" :span="list.widthPart" class="clearfix"
                                v-if="userRole!='second'">
                            <p class="fl">{{list.label}}</p>
                            <p class="fr" v-if="list.prop === 'highestLevel'" >{{item[list.prop] === 1?'总后台':'一级管理员'}}</p>
                            <p class="fr" v-else-if="list.prop === 'reviewStatus'" >{{item[list.prop] === 1?'通过':'不通过'}}</p>
                            <p class="fr" v-else-if="list.prop === 'delFlag'" >{{item[list.prop] === 1?'有效':'无效'}}</p>
                            <p class="fr" v-else>{{item[list.prop]}}</p>
                        </el-col>
                      </div>
                    </template>

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
	import Bus from '@/unit/bus.js'
export default {
  props: {
      tableData:{
          default:[]
      },
      scrollColumns:{
          type:Array,
          default:[]
      },
      scrollButtonList:{
          type:Array,
          default:[]
      },
      userRole:{
          default:'second'
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
      awaitRefresh(done){
          let _this = this;
          return new Promise((resolve,reject)=>{
              Bus.$on('refreshEnd',function () {
                  _this.isDown += 1;
                  done();
                  resolve();
              })
          })
      },
      awaitLoad(done){
          let _this = this;
          return new Promise((resolve,reject)=>{
                Bus.$on('loadEnd',function (res) {
                    _this.noData = res;
                    done();
                    resolve();
                })
          })
      },

    handleRS(vsInstance, refreshDom, done) {
        let _this = this;
        _this.$emit('refreshScroll',done);

        async function nextDone() {
            try {
               await _this.awaitRefresh(done)
            }catch (e) {
                done();
            }

        }

        nextDone();


    },
    handleRBD(vm, loadDom, done) {
        done();
    },

    handleLoadStart(vm, dom, done) {
        let _this = this;
        _this.$emit('loadScroll',done);

        async function nextDone() {
            try{
                await _this.awaitLoad(done)
            }catch(e){
                 done();
            }
        }

        nextDone();
    },
    handleLBD(vm, loadDom, done) {
        done();
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