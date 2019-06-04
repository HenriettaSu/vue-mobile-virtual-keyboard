<!-- Type: component -->
<template>
  <div v-if="showSync">
    <div class="keyboard-mask" @touchstart="showSync = false"></div>
    <div class="keyboard">
      <div class="keyboard-row" v-for="keys in keyList">
        <template v-for="key in keys">
          <span class="keyboard-key-blank" :style="{'width': key.span ? renderWidth(key.span) : (100 / keys.length) + '%'}" v-if="key === '' || key.code === ''"></span>
          <span class="keyboard-key" @touchstart="onKeyTouchstart(key)" @touchend="onKeyTouchend(key)" :style="{'width': key.span ? renderWidth(key.span) : (100 / keys.length) + '%'}" v-else>{{key.code || key}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
    import { debounce } from 'debounce';
    let timer = null;

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
                keyList: [],
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
            propKeyList (li) {
                this.keyList = li.length ? li : this.defaultKeyList;
            }
        },
        created () {
            this.keyList = this.defaultKeyList;
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
        &:nth-child(1) {
          margin-left: @keyMargin;
        }
        margin-right: @keyMargin;
      }
    }
  }
</style>
