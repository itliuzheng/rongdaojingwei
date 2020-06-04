<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>
<script>
  export default{
    name: 'SIdentify',
    props: {
      identifyCode: {
        type: String,
        default: '1234'
      },
      fontSizeMin: {
        type: Number,
        default: 16
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 160
      },
      lineColorMin: {
        type: Number,
        default: 40
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 110
      },
      contentHeight: {
        type: Number,
        default: 44
      }
    },
    methods: {
      // 生成一个随机数
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor (min, max) {
        let r = this.randomNum(min, max)
        let g = this.randomNum(min, max)
        let b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic () {
        let canvas_s = document.getElementById('s-canvas')
        let ctx_s = canvas_s.getContext('2d')
        ctx_s.textBaseline = 'bottom'
        // 绘制背景
        ctx_s.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
        ctx_s.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx_s, this.identifyCode[i], i)
        }
        this.drawLine(ctx_s)
        this.drawDot(ctx_s)
      },
      drawText (ctx_s, txt, i) {
        ctx_s.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx_s.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx_s.translate(x, y)
        ctx_s.rotate(deg * Math.PI / 180)
        ctx_s.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx_s.rotate(-deg * Math.PI / 180)
        ctx_s.translate(-x, -y)
      },
      drawLine (ctx_s) {
        // 绘制干扰线
        for (let i = 0; i < 8; i++) {
          ctx_s.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
          ctx_s.beginPath()
          ctx_s.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx_s.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx_s.stroke()
        }
      },
      drawDot (ctx_s) {
        // 绘制干扰点
        for (let i = 0; i < 100; i++) {
          ctx_s.fillStyle = this.randomColor(0, 255)
          ctx_s.beginPath()
          ctx_s.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
          ctx_s.fill()
        }
      }
    },
    watch: {
      identifyCode () {
        this.drawPic()
      }
    },
    mounted () {
      this.drawPic()
    }
  }
</script>