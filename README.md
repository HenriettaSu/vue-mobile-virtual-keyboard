# vue-keyboard 1.0.0

受夠了需求老是要求【只能輸入純數字】【只能輸入身份證】的要求了

受夠了動不動就正則替換的人了

受夠了第三方輸入法的單詞聯想了

我要有一個自定義的鍵盤！

支持插件形式調用

## 長這樣

![運行](./demo.png)

## 註冊

### 全局註冊

```javascript
// 在入口文件全局引入
import Vue from 'vue';
import KeyboardComponent from './plugin/keyboard';

Vue.component(KeyboardComponent);
```

### 局部註冊

```vue
<script>
import keyboard from './../components/keyboard.vue';

export default {
  components: {
    keyboard
  }
}
</script>
```

## DEMO

考慮到自由性，暫時不準備將組件和 `input` 強綁定在一起，缺點就是值要自己處理了

下例為精簡demo，如果一個頁面中存在兩個不同佈局的鍵盤，可詳細參看完整demo：`src/pages/index.vue`

### 插件使用

```javascript
// 顯示
this.$keyboard.show({
    onKeyClick (key) {},
    onDelete () {}
});

// 隱藏
this.$keyboard.hide();

// 獲取顯示狀態
this.$keyboard.isVisible();

// 更新配置
this.$keyboard.update({
    propKeyList: lowerKeyList
});
```

### template使用

```vue
<div class="demo-input">
    <div class="demo-input-hd">手機</div>
    <div class="demo-input-bd" @click="toShowKeyboard('phoneNumber')">
        <!-- 定義ref來取得target的dom -->
        <input ref="phoneNumber" v-model="phoneNumber" disabled="disabled" readonly="readonly" max="11">
    </div>
</div>
<keyboard :show.sync="showKeyboard" @on-key-click="onKeyClick" @on-delete="onDelete"></keyboard>

<script>
    export default {
        methods: {
            toShowKeyboard (target) {
                this.target = target; // 傳遞編輯target
                this.showKeyboard = true;
            },
            onKeyClick (key) {
                if (this.$refs[this.target] && this[this.target].length + 1 === parseInt(this.$refs[this.target].max)) {
                    return;
                }
                this[this.target] += key;
            },
            onDelete () { // 刪除
                this[this.target] = this[this.target].slice(0, this[this.target].length - 1);
            }
        }
    }
</script>
```

## API

**插件使用和template使用中，可使用的屬性和事件是一樣的，區別為：插件使用時屬性事件命名為 `駝峰`**

### 屬性

- show [Boolean]：顯示

- propKey-list [Array]：鍵盤keymap，默認為九宮數字鍵盤

  數組中按鈕接收三種格式：String，Number，Object

  [String，Number]：每一行的按鍵大小為 `(100 / 當行按鍵數)%`

  [Object]：必須定義 `code` 和 `span` 屬性，`alias` 選填

  ```javascript
  {
      code: 'space', // 按鍵顯示名
      span: '5/8', // 佔用寬度，分子/分母
      alias: ' ' // 別名，即實際輸出。若不定義，則取code
  }
  ```

- delete-key [String]：指定刪除鍵

- confirm-key [String]：指定確認鍵

### 事件

- on-key-click (key)：普通按鍵點擊時觸發
- on-delete ()：刪除按鈕點擊時觸發

## 更新日誌

- 增加plugin註冊方式；
- 支持定義複雜鍵盤；
- 增加長按刪除功能；
- 因click事件的0.3秒原因，內部將 `click` 事件置換成 `touchend` 事件；

## TODO

- [x] plugin使用
- [ ] 加幾個默認鍵盤

## 聯繫與討論

QQ：3088680950

如果發現八阿哥了或者有功能上的建議，推薦通過 `issue` 發起討論。

~~我已經幾年沒上QQ了（~~

## License

[MIT license](https://opensource.org/licenses/MIT). 有好的想法歡迎提供。
