<template lang="html">
  <div class="progress-track" ref="track" @mousedown.prevent="dumpTrack" @mousewheel.prevent="wheelTrack">
    <div :style="{width: volume * 50 + 'px'}" class="progress-percent" ref="percent"></div>
    <div :style="{left: volume * 50 - 5 + 'px'}" class="progress-control" @mousedown.prevent="bindEvents" ref="control"></div>
  </div>
</template>
<script>
  export default {
    props: {
      volume: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        isDragging: false
      }
    },
    methods: {
      bindEvents () {
        this.isDragging = true
        window.addEventListener('mousemove', this.controlsDragging, false)
        window.addEventListener('mouseup', this.cancelDragging, false)
      },
      controlsDragging (e) {
        if (this.isDragging) {
          this.dumpTrack(e)
        }
      },
      cancelDragging () {
        this.isDragging = false
        window.removeEventListener('mousemove', this.controlsDragging, false)
        window.removeEventListener('mouseup', this.cancelDragging, false)
      },
      dumpTrack (e) {
        let left = e.clientX - this.$refs.track.getBoundingClientRect().left
        let width = this.$refs.track.getBoundingClientRect().width
        if (left <= width && left >= 0) {
          this.$emit('dumpVolumeTrack', left / width)
        }
      },
      wheelTrack (e) {
        if (e.wheelDelta === 120) {
          this.$emit('wheelVolumeTrack', true)
        }
        if (e.wheelDelta === -120) {
          this.$emit('wheelVolumeTrack', false)
        }
      }
    },
    beforeDestroy () {
      window.removeEventListener('mousemove', this.controlsDragging, false)
      window.removeEventListener('mouseup', this.cancelDragging, false)
    }
  }
</script>

<style lang="scss" scoped>
  .progress-track {
    position: relative;
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, .5);
    cursor: pointer;
    .progress-percent {
        height: 100%;
        background-color: rgba(242, 156, 177, 1);
    }
    .progress-control {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      border: 3px solid #fff;
      box-sizing: border-box;
      box-shadow: .5px .5px 1px rgba(0, 0, 0, .8);
      background-color: rgba(242, 156, 177, 1);
      cursor: pointer;
    }
  }
</style>
