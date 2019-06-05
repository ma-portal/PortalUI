
import gem from './GlobalEventManager';
import NTreeNode from '../datastruct/NTree';
import LinkedList from '../datastruct/LinkedList';

class CombineKey {
    code: string;
    alt: boolean;
    ctrl: boolean;
    shift: boolean;
    constructor(code: string,
        alt: boolean=false,
        ctrl: boolean=false,
        shift: boolean=false)
    {
        this.code = code;
        this.alt = alt;
        this.ctrl = ctrl;
        this.shift = shift;
    }
}

const KEYS = {
    META_LEFT: 'MetaLeft',
    WAKEUP: 'WakeUp',
    CAPSLOCK: 'CapsLock',
    TAB: 'Tab',
    BACKQUOTE: 'Backquote',
    DIGIT1: 'Digit1', DIGIT2: 'Digit2',
    DIGIT3: 'Digit3', DIGIT4: 'Digit4',
    DIGIT5: 'Digit5', DIGIT6: 'Digit6',
    DIGIT7: 'Digit7', DIGIT8: 'Digit8',
    DIGIT9: 'Digit9', DIGIT0: 'Digit0',
    MINUS: 'Minus',
    EQUAL: 'Equal',
    BACKSPACE: 'BackSpace',
    A: 'KeyA', B: 'KeyB', C: 'KeyC',
    D: 'KeyD', E: 'KeyE', F: 'KeyF',
    G: 'KeyG', H: 'KeyH', I: 'KeyI',
    J: 'KeyJ', K: 'KeyK', L: 'KeyL',
    M: 'KeyM', N: 'KeyN', O: 'KeyO',
    P: 'KeyP', Q: 'KeyQ', R: 'KeyR',
    S: 'KeyS', T: 'KeyT', U: 'KeyU',
    V: 'KeyV', W: 'KeyW', X: 'KeyX',
    Y: 'KeyY', Z: 'KeyZ',
    BRACKET_LEFT: 'BracketLeft',
    BRACKET_RIGHT: 'BracketRight',
    BACKSLASH: 'Backslash',
    SEMICOLON: 'Semicolon',
    QUOTE: 'Quote',
    ENTER: 'Enter',
    COMMA: 'Comma',
    PERIOD: 'Period',
    SLASH: 'Slash',
    ARROWUP: 'ArrowUp', ARROWDOWN: 'ArrowDown',
    ARROWLEFT: 'ArrowLeft', ARROWRIGHT: 'ArrowRight'
}

class KeyNode extends NTreeNode<CombineKey> {
    handler: () => void;

    public match(key: CombineKey): boolean {
        return (this.key.alt === key.alt
            && this.key.ctrl === key.ctrl
            && this.key.shift === key.shift
            && this.key.code === key.code);
    }
}

/**
 * 快捷键管理器，以来GlobalEventManager
 */
class AcceleratorManager {

    /**
     * 使用多叉树存储快捷键组合，用KeyNode做节点，CombineKey做节点值
     */
    private root: KeyNode;

    /**
     * 使用链表存储匹配结果
     */
    private matched: LinkedList<KeyNode>;

    constructor() {
        this.root = new KeyNode(null);
        this.matched = new LinkedList();
        gem.on('onkeypress', this.onKeyPress.bind(this));
    }

    /**
     * 按键事件处理，绑定到gem上
     * @param ev 
     */
    private onKeyPress(ev: any) {
        let ck = new CombineKey(ev.code, ev.altKey, ev.ctrlKey, ev.shiftKey);

        let tmp: KeyNode;
        for (let itr = this.matched.iterator(); itr.hasNext();) {
            tmp = itr.next().matchChild(ck) as KeyNode;
            if (tmp != null) {
                // 匹配成功则更新为匹子元素
                itr.update(tmp);
                tmp.handler && tmp.handler();
            }
            else {
                // 匹配失败则移除
                itr.remove();
            }
        }

        tmp = this.root.matchChild(ck) as KeyNode;
        if (tmp != null) {
            this.matched.add(tmp);
            tmp.handler && tmp.handler();
        }
    }

    /**
     * 注册快捷键
     * @param handler 处理器
     * @param keys 要绑定的快捷键组合
     * @returns 如果快捷键已经存在，则会绑定失败，返回false，否则返回true
     */
    public register(handler: () => void, ...keys: CombineKey[]): boolean {
        let parent = this.root, node: KeyNode, item: CombineKey;
        // 匹配树，遇到不存在的节点即创建
        for (let i = 0; i < keys.length; i++) {
            item = keys[i];
            node = parent.matchChild(item) as KeyNode;
            if (node == null) {
                for (let j = i; j < keys.length; j++) {
                    item = keys[j];
                    node = new KeyNode(item);
                    parent.addChild(node);
                    parent = node;
                }
                node.handler = handler;
                return true;
            }
        }
        // 快捷键组合已存在
        return false;
    }

}

export default new AcceleratorManager();
export {
    KEYS,
    CombineKey
}