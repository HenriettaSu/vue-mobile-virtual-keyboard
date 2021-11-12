<!-- Type: component -->
<template>
  <div v-if="showSync">
    <div :class="prefixCls + 'keyboard-mask'" :style="{zIndex: maskZIndex}" @touchstart="showSync = false"></div>
    <div :class="prefixCls + 'keyboard'" :style="{zIndex: zIndex}">
      <div :class="prefixCls + 'keyboard-header'">
        <p class="keyboard-title" v-if="title">{{title}}</p>
      </div>
      <div :class="prefixCls + 'keyboard-row'" v-for="keys in keyList">
        <template v-for="key in keys">
          <span :class="prefixCls + 'keyboard-key-blank'" :style="{'width': key.span ? renderWidth(key.span) : (100 / keys.length) + '%'}" v-if="key === '' || key.code === ''"></span>
          <span :class="prefixCls + 'keyboard-key'" @touchstart="onKeyTouchstart(key)" @touchend="onKeyTouchend(key)" :style="{'width': key.span ? renderWidth(key.span) : (100 / keys.length) + '%'}" v-else>{{key.code || key}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import { debounce } from 'debounce';
    import keymap from './../utils/keymap';
    let timer = null;

    export default {
        name: 'keyboard',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            deleteKey: {
                type: String,
                default: '删除'
            },
            confirmKey: {
                type: String,
                default: '确定'
            },
            type: {
                type: [String, Array],
                default: ''
            },
            prefixCls: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            zIndex: {
                type: [String, Number],
                default: '1001'
            },
            maskZIndex: {
                type: [String, Number],
                default: '1000'
            }
        },
        data () {
            return {
                showSync: false,
                keyList: keymap.number,
                _debounce: null
            }
        },
        watch: {
            show (val) {
                this.showSync = val;
            },
            showSync (val) {
                this.$emit('update:show', val);
            },
            type (val) {
                if (typeof val === 'string') {
                    if (val) {
                        if (keymap[val]) {
                            this.keyList = keymap[val];
                        } else {
                            this.keyList = keymap.number;
                            console.error('keymap中沒有' + val + '，展開默認鍵盤');
                            console.error('keymap[' + val + '] got undefined. Default keyboard is shown.');
                            console.error('keymapの中で' + val + 'がありませんから、初期キーボードに戻ります');
                        }
                    } else {
                        this.keyList = keymap.number;
                    }
                } else {
                    if (val.length) {
                        this.keyList = val;
                    } else {
                        this.keyList = keymap.number;
                        console.error('數組為空，展開默認鍵盤');
                        console.error('Empty array is passed. Default keyboard is shown.');
                        console.error('空配列を取得するので、初期キーボードに戻ります');
                    }
                }
            }
        },
        methods: {
            renderWidth (span) {
                let arr = span.split('/'),
                    numerator = parseInt(arr[0]),
                    denominator = parseInt(arr[1]);
                return (100 / denominator * numerator) + '%';
            },
            onKeyClick (key) {
                if (key === this.confirmKey) {
                    this.showSync = false;
                } else {
                    this.$emit('on-key-click', key);
                }
            },
            onDelete () {
                this.$emit('on-delete', '');
            },
            onKeyTouchstart (key) {
                let vm = this,
                    event = window.event || arguments[0],
                    target = event.srcElement || event.target;
                event.preventDefault();
                target.classList.add('active');
                this._debounce = debounce(() => {
                    timer = setInterval(() => {
                        if (key === vm.deleteKey || key.code === vm.deleteKey) {
                            vm.onDelete();
                        }
                    }, 100);
                }, 200);
                this._debounce();
            },
            onKeyTouchend (key) {
                let event = window.event || arguments[0],
                    target = event.srcElement || event.target;
                target.classList.remove('active');
                if (typeof key === 'string' || typeof key === 'number') {
                    if (key === this.deleteKey) {
                        this.onDelete();
                    } else {
                        this.onKeyClick(key);
                    }
                } else {
                    if (key.code === this.deleteKey) {
                        this.onDelete();
                    } else {
                        this.onKeyClick(key.alias || key.code);
                    }
                }
                this._debounce && this._debounce.clear();
                clearInterval(timer);
            }
        }
    }
</script>
<style lang="less">
  @keyboard-bg-color: #ececec;
  @keyboard-title-font-color: #333;
  @keyboard-key-margin: 0.4rem;
  @keyboard-key-bg-color: #fff;
  @keyboard-key-bg-color-active: #f2f2f2;
  @keyboard-key-font-color: #000;
  @keyboard-key-font-color-active: #000;
  .keyboard-mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  .keyboard {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: @keyboard-bg-color;
    .keyboard-header {
      margin: 0.8rem;
    }
    .keyboard-title {
      color: @keyboard-title-font-color;
      text-align: center;
    }
    .keyboard-row {
      display: flex;
      margin-top: @keyboard-key-margin;
      &:last-child {
        margin-bottom: @keyboard-key-margin;
      }
      .keyboard-key {
        background-color: @keyboard-key-bg-color;
        color: @keyboard-key-font-color;
        font-size: 1.2rem;
        border-radius: 0.3rem;
        &.active {
          background-color: @keyboard-key-bg-color-active;
          color: @keyboard-key-font-color-active;
        }
      }
      .keyboard-key, .keyboard-key-blank {
        display: block;
        text-align: center;
        padding: 0.3rem;
        &:nth-child(1) {
          margin-left: @keyboard-key-margin;
        }
        margin-right: @keyboard-key-margin;
      }
    }
  }
</style>
