<template>
  <div>
    <div class="demo-title">plugin使用</div>
    <div class="demo-input">
      <div class="demo-input-hd">宅電</div>
      <div class="demo-input-bd" @click="showDefaultKeyboardPlugin()">{{number}}</div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">身份證</div>
      <div class="demo-input-bd" @click="showCardIdKeyboardPlugin()">
        <input ref="cardId" v-model="cardId" disabled="disabled" readonly="readonly" max="18">
      </div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">姓名</div>
      <div class="demo-input-bd" @click="showEnglishKeyboardPlugin()">
        <input ref="name" v-model="name" disabled="disabled" readonly="readonly" max="18">
      </div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">金額</div>
      <div class="demo-input-bd" @click="showDigitKeyboardPlugin()">
        <input ref="digit" v-model="digit" disabled="disabled" readonly="readonly"">
      </div>
    </div>
    <div class="demo-title">template使用</div>
    <div class="demo-input">
      <div class="demo-input-hd">身份證</div>
      <!-- 利用input的特性限制長度 -->
      <div class="demo-input-bd" @click="showCardIdKeyboard('cardId')">
        <input ref="cardId" v-model="cardId" disabled="disabled" readonly="readonly" max="18">
      </div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">手機</div>
      <div class="demo-input-bd" @click="showDefaultKeyboard('phoneNumber')">
        <input ref="phoneNumber" v-model="phoneNumber" disabled="disabled" readonly="readonly" max="11">
      </div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">金額</div>
      <div class="demo-input-bd" @click="showDigitKeyboard('digit')">
        <input ref="digit" v-model="digit" disabled="disabled" readonly="readonly" max="11">
      </div>
    </div>
    <keyboard :show.sync="showKeyboard" :type="keyboardType" @on-key-click="onKeyClick" @on-delete="onDelete"></keyboard>
  </div>
</template>

<script>
//    npm安裝引用
//    import { Keyboard } from 'vue-mobile-virtual-keyboard';
    import keyboard from './../components/keyboard.vue';

    export default {
        name: 'demo',
        components: {
            keyboard
        },
        data () {
            return {
                target: '',
                number: '',
                cardId: '',
                name: '',
                phoneNumber: '',
                showKeyboard: false,
                digit: '',
                keyboardType: ''
            }
        },
        mounted () {
        },
        methods: {
            /*
             * plugin調用
             */
            showDefaultKeyboardPlugin () {
                let vm = this;
                this.$keyboard.show({
                    onKeyClick (key) {
                        vm.number += key;
                    },
                    onDelete () {
                        vm.number = vm.number.slice(0, vm.number.length - 1);
                    }
                });
            },
            showCardIdKeyboardPlugin () {
                let vm = this;
                this.$keyboard.show({
                    title: '我猜會有需求想要這個',
                    type: 'chinaCardId',
                    onKeyClick (key) {
                        if (vm.cardId.length + 1 === parseInt(vm.$refs['cardId'].max)) {
                            return;
                        }
                        vm.cardId += key;
                    },
                    onDelete () {
                        vm.cardId = vm.cardId.slice(0, vm.cardId.length - 1);
                    }
                });
            },
            showEnglishKeyboardPlugin () {
                let vm = this,
                    upperKeyList = [
                        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                        ['⇩', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '←'],
                        [{
                            code: '.',
                            span: '1/16'
                        }, {
                            code: ',',
                            span: '1/16'
                        }, {
                            code: 'space',
                            span: '5/8',
                            alias: ' '
                        }, {
                            code: 'send',
                            span: '2/8'
                        }]
                    ];
                this.$keyboard.show({
                    deleteKey: '←',
                    type: 'englishLowercase', // 在入口文件擴展過keymap
                    onKeyClick (key) {
                        if (key === '⇧') {
                            vm.$keyboard.update({
                                type: upperKeyList
                            });
                        } else if (key === '⇩') {
                            vm.$keyboard.update({
                                type: 'englishLowercase'
                            });
                        } else if (key === 'send') {
                            vm.$keyboard.hide();
                        } else {
                            vm.name += key;
                        }
                    },
                    onDelete () {
                        vm.name = vm.name.slice(0, vm.name.length - 1);
                    }
                });
            },
            showDigitKeyboardPlugin () {
                let vm = this;
                this.$keyboard.show({
                    type: 'digit',
                    prefixCls: 'dark-',
                    onKeyClick (key) {
                        vm.digit += key;
                    },
                    onDelete () {
                        vm.digit = vm.digit.slice(0, vm.digit.length - 1);
                    }
                });
            },
            // 局部註冊使用
            toShowKeyboard (target) { // 傳遞編輯target
                this.target = target;
                this.showKeyboard = true;
            },
            showDefaultKeyboard (target) {
                this.keyboardType = 'number';
                this.toShowKeyboard(target);
            },
            showCardIdKeyboard (target) {
                this.keyboardType = [['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9'],
                    ['X', '0', '删除']];
                this.toShowKeyboard(target);
            },
            showDigitKeyboard (target) {
                this.keyboardType = 'digit';
                this.toShowKeyboard(target);
            },
            onKeyClick (key) {
                if (this.$refs[this.target] && this[this.target].length + 1 === parseInt(this.$refs[this.target].max)) {
                    return;
                }
                this[this.target] += key;
            },
            onDelete () {
                this[this.target] = this[this.target].slice(0, this[this.target].length - 1);
            }
        }
    }
</script>
<style lang="less">
  .demo-input {
    display: flex;
    background-color: #fff;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    margin: 0.8rem;
    border: 1px solid #ececec;
    font-size: 1rem;
    .demo-input-hd {
      color: #666;
    }
    .demo-input-bd {
      flex-grow: 2;
    }
    .demo-input-hd, .demo-input-bd {
      padding: 0.6rem 0;
    }
    .demo-input-bd, input {
      color: #999;
      text-align: right;
      font-size: 1rem;
    }
    input {
      width: 100%;
      border: none;
      &:focus {
        outline: none;
      }
      &:disabled, &[disabled] {
        opacity: 1;
        -webkit-text-fill-color: #999;
        background-color: transparent;
      }
    }
  }
  .demo-title {
    margin: 0.8rem;
    color: #0f99ff;
  }

  /* 自定義鍵盤樣式 */
  @keyMargin: 0.4rem;
  .dark-keyboard-mask {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  .dark-keyboard {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #333;
    .dark-keyboard-row {
      display: flex;
      margin-top: @keyMargin;
      &:last-child {
        margin-bottom: @keyMargin;
      }
      .dark-keyboard-key {
        background-color: #666;
        color: #fff;
        font-size: 1.2rem;
        border-radius: 0.3rem;
        &.active {
          background-color: #444;
          color: #fff;
        }
      }
      .dark-keyboard-key, .dark-keyboard-key-blank {
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
