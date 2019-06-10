import KeyboardComponent from '../../components/keyboard.vue';
import keymap from '../../utils/keymap';

let $vm,
    watcher,
    util = (() => {
        return {
            deepClone (target, source) {
                let prop,
                    isObject = false,
                    type;
                for (prop in source) {
                    if (source.hasOwnProperty(prop)) {
                        isObject = typeof source[prop] === 'object';
                        switch (isObject) {
                            case true:
                                type = Object.prototype.toString.call(source[prop]);
                                if (type === '[object Array]') {
                                    target[prop] = [];
                                } else if (window.JSON && type !== '[object Function]') {
                                    target[prop] = JSON.parse(JSON.stringify(source[prop]));
                                } else {
                                    target[prop] = {};
                                }
                                util.deepClone(target[prop], source[prop]);
                                break;
                            default:
                                target[prop] = source[prop];
                        }
                    }
                }
                return target;
            }
        }
    })();

const plugin = {
    install (vue, pluginOptions = {}) {
        const Keyboard = vue.extend(KeyboardComponent);
        if (!$vm) {
            $vm = new Keyboard({
                el: document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }
        const defaults = {},
            props = $vm.$options.props;
        for (let i in props) {
            defaults[i] = props[i].default;
        }
        const keyboard = {
            show (options = {}) {
                watcher && watcher();
                watcher = $vm.$watch('showSync', (val) => {
                    $vm.show = val;
                });
                util.deepClone($vm, defaults);
                util.deepClone($vm, options);
                $vm.show = true;
            },
            hide () {
                $vm.show = false;
            },
            isVisible () {
                return $vm.show;
            },
            update (options = {}) {
                util.deepClone($vm, options);
            }
        }

        vue.$keyboard = keyboard;

        vue.mixin({
            created: function () {
                this.$keyboard = vue.$keyboard;
            }
        });
    },
    extend (options = {}, hard) {
        for (let key in options) {
            let val = options[key];
            if (Object.prototype.toString.call(val) !== '[object Array]') {
                console.error('Expected Array, but got value ' + JSON.stringify(val) + '.');
            } else if (keymap[key]) {
                if (hard) {
                    keymap[key] = options[key];
                } else {
                    console.warn(key + 'could not be overwrite when parameter "hard" is False.');
                }
            } else {
                keymap[key] = options[key];
            }
        }
    }
}

export default plugin;
export const install = plugin.install;

