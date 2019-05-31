<!-- Type: component -->
<template>
  <div v-if="showSync">
    <div class="keyboard-mask" @touchstart="showSync = false"></div>
    <div class="keyboard">
      <div class="keyboard-row" v-for="keys in keyList">
        <template v-for="key in keys">
          <span class="keyboard-key" @touchstart="onKeyTouchstart" @touchend="onKeyTouchend" @click="onKeyClick(key)" :style="{'width': (100 / keys.length) + '%'}" v-if="key !== ''">{{key}}</span>
          <span class="keyboard-key-blank" :style="{'width': (100 / keys.length) + '%'}" v-else></span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'keyboard',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            propKeyList: {
                type: Array
            },
            deleteKey: {
                type: String,
                default: '删除'
            },
            confirmKey: {
                type: String,
                default: '确定'
            }
        },
        data () {
            return {
                showSync: false,
                defaultKeyList: [['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9'],
                    ['', '0', '删除']],
                keyList () {
                    return this.defaultKeyList;
                }
            }
        },
        watch: {
            show (val) {
                this.showSync = val;
            },
            showSync (val) {
                this.$emit('update:show', val);
            },
            propKeyList (li) {
                this.keyList = li.length ? li : this.defaultKeyList;
            }
        },
        mounted () {
        },
        methods: {
            onKeyClick (key) {
                if (key === this.deleteKey) {
                    this.$emit('on-delete', '');
                } else if (key === this.confirmKey) {
                    this.showSync = false;
                } else {
                    this.$emit('on-key-click', key);
                }
            },
            onKeyTouchstart (e) {
                e.target.classList.add('active');
            },
            onKeyTouchend (e) {
                e.target.classList.remove('active');
            }
        }
    }
</script>
<style lang="less">
  @keyMargin: 0.4rem;
  .keyboard-mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
  }
  .keyboard {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 1001;
    background-color: #ececec;
    .keyboard-row {
      display: flex;
      margin-top: @keyMargin;
      &:last-child {
        margin-bottom: @keyMargin;
      }
      .keyboard-key {
        background-color: #fff;
        font-size: 1.2rem;
        border-radius: 0.3rem;
        &.active {
          background-color: #f2f2f2;
        }
      }
      .keyboard-key, .keyboard-key-blank {
        display: block;
        text-align: center;
        padding: 0.3rem;
        &:nth-child(1), &:nth-child(3) {
          margin-left: @keyMargin;
          margin-right: @keyMargin;
        }
      }
    }
  }
</style>
