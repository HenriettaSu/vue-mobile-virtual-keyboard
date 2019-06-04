<template>
  <div>
    <div class="demo-input">
      <div class="demo-input-hd">宅電plugin</div>
      <div class="demo-input-bd" @click="showDefaultKeyboardPlugin()">{{number}}</div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">身份證plugin</div>
      <!-- 利用input的特性限制長度 -->
      <div class="demo-input-bd" @click="showCardIdKeyboardPlugin()">
        <input ref="cardId" v-model="cardId" disabled="disabled" readonly="readonly" max="18">
      </div>
    </div>
    <div class="demo-input">
      <div class="demo-input-hd">姓名plugin</div>
      <!-- 利用input的特性限制長度 -->
      <div class="demo-input-bd" @click="showEnglishKeyboardPlugin()">
        <input ref="name" v-model="name" disabled="disabled" readonly="readonly" max="18">
      </div>
    </div>
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
    <keyboard :show.sync="showKeyboard" :prop-key-list="numberKeyList" @on-key-click="onKeyClick" @on-delete="onDelete"></keyboard>
  </div>
</template>

<script>
    import { Keyboard } from 'vue-mobile-virtual-keyboard';

    export default {
        name: 'demo',
        components: {
            Keyboard
        },
        data () {
            return {
                target: '',
                number: '',
                cardId: '',
                name: '',
                phoneNumber: '',
                showKeyboard: false,
                numberKeyList: []
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
                    propKeyList: [['1', '2', '3'],
                        ['4', '5', '6'],
                        ['7', '8', '9'],
                        ['X', '0', '删除']],
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
                    lowerKeyList = [
                        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                        ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '←'],
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
                    ],
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
                    propKeyList: lowerKeyList,
                    onKeyClick (key) {
                        if (key === '⇧') {
                            vm.$keyboard.update({
                                propKeyList: upperKeyList
                            });
                        } else if (key === '⇩') {
                            vm.$keyboard.update({
                                propKeyList: lowerKeyList
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
            // 局部註冊使用
            toShowKeyboard (target) { // 傳遞編輯target
                this.target = target;
                this.showKeyboard = true;
            },
            showDefaultKeyboard (target) {
                this.numberKeyList = [];
                this.toShowKeyboard(target);
            },
            showCardIdKeyboard (target) {
                this.numberKeyList = [['1', '2', '3'],
                    ['4', '5', '6'],
                    ['7', '8', '9'],
                    ['X', '0', '删除']];
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
</style>
