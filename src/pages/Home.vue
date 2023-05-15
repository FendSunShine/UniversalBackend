<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/images/头像min.jpg" alt="" class="userImg" />
              <div class="userInfo">
                <p id="p1">SunShine</p>
                <p id="p2">超级爱SY</p>
              </div>
            </div>
            <div class="LoginInfo">
              <p class="time">上次登录时间:<span>2021-4-2</span></p>
              <p class="adress">上次登录地点:<span>成都</span></p>
            </div>
          </el-card>
          <el-card style="margin-top: 30px">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                v-for="(value, key) in tableCol"
                :key="key"
                :prop="value"
                :label="key"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
      <el-col :span="16">
        <div style="margin-left: 20px">
          <div class="grid-content bg-purple-light">
            <div class="orders">
              <el-card v-for="item in countData" :key="item.name">
                <div class="order">
                  <span
                    class="icon"
                    :style="{ background: item.color }"
                    :class="`el-icon-${item.icon}`"
                  ></span>
                  <div class="r">
                    <p style="font-size: 30px">
                      ￥<span>{{ item.value }}</span>
                    </p>
                    <p style="color: #999">{{ item.name }}</p>
                  </div>
                </div>
              </el-card>
            </div>
            <el-card id="echart1" style="height: 280px"></el-card>
            <div class="footCharts">
              <el-card id="echart2" style="height: 260px; width: 48%"></el-card>
              <el-card id="echart3" style="height: 260px; width: 48%"></el-card>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableCol: {
        课程: "name",
        今日购买: "todayBuy",
        本月购买: "monthBuy",
        总购买: "totalBuy",
      },
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    getData().then((res) => {
      const newData = res.data.data;
      this.tableData = newData.tableData;

      // 画折线图
      var myChart1 = echarts.init(document.getElementById("echart1"));
      const option1 = { tooltip: {}, yAxis: {} };
      const xAxis = Object.keys(newData.orderData.data[0]);
      option1.xAxis = { data: xAxis };
      const series = [];
      const seriesrName = newData.orderData.date;
      newData.orderData.data.forEach((value, index) => {
        series.push({
          name: seriesrName[index],
          type: "line",
          data: Object.values(value),
        });
      });
      option1.legend = { data: series.name };
      option1.series = series;
      myChart1.setOption(option1);
      // 画折线图

      // 画柱状图
      var myChart2 = echarts.init(document.querySelector("#echart2"));
      const myChart2Data = newData.userData;
      const option2 = {
        color:[ "#4cabce", "#e5323e"], 
        tooltip:{show:true},
        yAxis: {},
        xAxis: { data: myChart2Data.map((item) => item.date) },
        legend: {data: ['新增用户', '活跃用户'], top: '10px'},
        series:[
          {
            name: '新增用户',
            type: 'bar',
            data: myChart2Data.map((item) => item.new)
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: myChart2Data.map((item) => item.active)
          }
        ]
      };
      myChart2.setOption(option2)
      // 画柱状图

      // 画饼状图
      var myChart3 = echarts.init(document.querySelector("#echart3"));
      const myChart3Data = newData.videoData;
      const option3 = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [{type: 'pie', data: myChart3Data}],
        }
      // 画饼状图
      myChart3.setOption(option3)
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .userImg {
    margin-right: 30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userInfo {
    // div内容居中
    text-align: center;

    #p1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    #p2 {
      text-align: center;
      // font-size: 12px;
      color: #999;
    }
  }
}
.LoginInfo {
  margin-top: 20px;
  p {
    color: #999;
    line-height: 38px;
    span {
      margin-left: 100px;
      color: #666;
    }
  }
}
.orders {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .order {
    display: flex;
    // width: 32%;
    .r {
      // text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  }
  .icon {
    margin-right: 15px;
    color: #fff;
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }
}
.footCharts {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>