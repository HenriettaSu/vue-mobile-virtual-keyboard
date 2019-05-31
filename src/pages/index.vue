<template>
  <div>
    <div class="demo-input">
      <div class="demo-input-hd">宅電</div>
      <div class="demo-input-bd" @click="showDefaultKeyboard('number')">{{number}}</div>
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
                phoneNumber: '',
                showKeyboard: false,
                numberKeyList: []
            }
        },
        mounted () {
        },
        methods: {
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
      &:focus {
        outline: none;
      }
    }
  }
</style>
