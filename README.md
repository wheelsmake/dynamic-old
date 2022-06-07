# dynamic
一个简单的前端库（弱框架），用于创建动态网页。

# 特性

dynamic 实例在创建时**不会主动接管任何 DOM 元素**，也**不会生成 vDOM**。

dynamic 只对自己对 DOM 做的事进行优化，程序员大可以写 `for` 循环应用模板。

- 正确的方案是调用 dynamic 的[重复 DOM 操作优化](#重复 DOM 操作优化)方法。

dynamic 接管由其模板创建的实例、由其 `render()` 方法生成的 DOM 和 `dy.dataFlow.new()` 声明的元素。

- 可以指定 dynamic 接管某个元素。接管后任何插入变量将可用。未接管前 dynamic 不会修改 HTML 中的任何东西。
- 因此仅在需要不同配置时有创建多个 dynamic 实例的需求。

dynamic 的模板引擎基于 `HTMLElement` 类型（即：模板内容只能是**一个非文本或注释**的 DOM 元素）。但是 dynamic 的 DOM 监控引擎基于 `Node[]` 类型。

#  开始使用

实例化。

```typescript
const dy = new Dynamic(options? :object);
```

|   参数    |                      描述                       |
| :-------: | :---------------------------------------------: |
| `options` | 用于更改某些行为，详情请见[实例配置](#实例配置) |

对一般的页面来说，创建一个实例即可。

# 复用HTML

## 关于 `tuID`

`tuID` 是 dynamic 内部识别模板的唯一方式。它是一个长度大于等于 3 个字符的字符串，只能包含小写字母、数字或连字符 `-`，且在不是开头和结尾的字符中有至少一个连字符。

当 dynamic 自动生成 `tuID` 时，其长度总是为 29 字符，并且第 12 个字符总为连字符 `-`，因为 dynamic 的开发者是 LJM**129**14。总共可能生成 4.23e+37 个 `tuID`，基本不用担心碰撞，并有[碰撞检测](#enableAntiClash)功能（需在 `options` 参数中设置）。

此规范的目的是能将每一个 `tuID` 都作为一个有效的自定义元素（[Web Component](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)）使用。

以下给出正确和错误示例：

```typescript
"p-u" //正确
"qwer-tyuiop" //正确
"multiple-hyphen-element" //正确
"repeated---hyphens" //正确
"ewr-3a" //正确

"q" //错误，字符数太少
"-adadad" //错误，在开头出现连字符
"asdfg" //错误，无连字符

"asdfg-" //错误，在结尾出现连字符（但却是有效的自定义元素，dynamic为了保持标签美观而将其视为错误。）
```

## 注册一个模板（组件）

### 从 `<template>` 元素

dynamic 会默认转换文档中所有的 `<template>` 元素为 dynamic 模板。

如果一个 `<template>` 具有 `dynamic` attribute，那么它将会被 dynamic 声明式注册，并**从文档中移除**。

如果一个 `<template>` 具有 `nodynamic` attribute，那么它将会被 dynamic 忽略。

如果一个 `<template>` 不具有以上两个 attribute，那么它将会被 dynamic 声明式注册，但不会被移除。

- dynamic 会监听DOM变化。运行时释放 `<template>` 元素也会被 dyanmic 处理。
- 使用 `tuid` attribute 可自定义 `<template>` 元素被注册为模板时的 `tuID`。无效的 `tuid` attribute 会使 dynamic 自己生成一个。

- 从 `<template>` 元素注册存在弊端：dynamic 缺少对 shadow DOM 的支持，所以所有 `<template>` 元素转换为模板后都会**丢失其 shadow DOM 状态**，其内容被一个顶级 `<div>` 元素包裹。这是写死在 dynamic 里的逻辑。

### 从命令

```typescript
dy.template.register({
    element :HTMLElement,
    tuID? :string,
    remove? :boolean
}) :string;
```

|   参数    |              描述              |
| :-------: | :----------------------------: |
| `element` |       要注册为模板的元素       |
|  `tuID`   |      自定义元素的 `tuID`       |
| `remove`  | 是否在注册后从文档中删除该元素 |

使用 `tuID` 参数时，请注意遵循 [`tuID` 格式](#关于 tuID)，否则报错。

该方法返回模板的 ID `tuID`，用于使用该模板。

- 当已存在相同 `tuID` 时，dynamic 不会默默地用新的 `tuID` 代替，而是会直接报错。如果设置了[碰撞检测](#enableAntiClash)，那么 dynamic 会调用 `clashHandler` 方法。

## 使用一个模板

在文档的指定位置插入模板：

```typescript
dy.template.render({
    tuID :string,
    element :HTMLElement,
    slots? :Record<string, any>,
    removeOuterElement? :boolean,
    insertAfter? :boolean,
    append? :boolean,
    disableDF? :boolean
}) :Nodes[];
```

|         参数         |                             描述                             |
| :------------------: | :----------------------------------------------------------: |
|        `tuID`        |                          模板的 ID                           |
|      `element`       |                         插入目标元素                         |
|       `slots`        |               模板变量，详见[下文](#模板变量)                |
| `removeOuterElement` |      是否将模板最外层的元素（通常是打包用元素）自动删除      |
|    `insertAfter`     | `true`：在目标元素后插入模板；`false`：在目标元素前插入模板  |
|       `append`       | `true`：在目标元素中的最后插入模板；`false`：在目标元素中的最前插入模板；优先级高于`insertAfter` |
|     `disableDF`      | 渲染好的实例会默认被 dynamic 接管，设置该参数为 `true` 以禁用这个行为 |

该方法以节点数组形式返回文档中被插入的模板实例。

或者也可以直接在HTML中释放以 `tuID` 为元素类型的元素，dynamic 会自动将其替换为模板内容。必须正确地关闭标签。

```html
<!--tuID = my-tuid-->
<my-tuid></my-tuid>
```

```typescript
document.createElement("my-tuid");
```

释放带 `slot` 模板变量的模板：注意模板变量的赋值与顺序无关。dynamic 会自动将模板中的变量与元素中赋值的模板变量进行比对并插入，若模板中无此模板变量，则会被直接就地转换为文本节点。

```html
<!--tuID = my-tuid-->
<my-tuid>
    <slot name="ass">ass</slot>
    <slot name="saa">saa</slot>
</my-tuid>
```

## 其他操作

### 更新一个模板

```typescript
dy.template.update({
    tuID :string,
    element :HTMLElement
}) :HTMLElement | null;
```

|   参数    |           描述           |
| :-------: | :----------------------: |
|  `tuID`   |        模板的 ID         |
| `element` | 要替换原来模板元素的元素 |

该方法返回旧的模板内容。当不存在相应模板时返回 `null`。

### 删除一个模板

```typescript
dy.template.delete(tuID :string) :HTMLElement | null;
```

|  参数  |   描述    |
| :----: | :-------: |
| `tuID` | 模板的 ID |

该方法返回模板内容。当不存在相应模板时返回 `null`。

### 获取模板内容

```typescript
dy.template.getContent(tuID :string) :HTMLElement | null;
```

|  参数  |   描述    |
| :----: | :-------: |
| `tuID` | 模板的 ID |

该方法返回模板内容。当不存在相应模板时返回 `null`。

### 检查一个 `tuID` 是否存在

```typescript
dy.template.existsTUID(tuID :string) :boolean;
```

|  参数  |   描述    |
| :----: | :-------: |
| `tuID` | 模板的 ID |

返回是否在已注册模板中找到了 ID 与传入 `tuID` 相同的模板。

- 该方法完全可以用 [`dy.template.getContent()`](#获取模板内容) 代替，我也觉得没啥用。

### 检查一个模板内容是否存在

```typescript
dy.template.existsElement(element :HTMLElement) :string | null;
```

|   参数    |      描述      |
| :-------: | :------------: |
| `element` | 模板的内容元素 |

如果在已注册模板中找到了内容与传入 `element` **等价**（`Node.isEqualNode()`）的模板，则返回该已注册模板的 `tuID`；否则返回 `null`。

- 模板内容不可能与任何节点相同，因为注册时使用了 `cloneNode()` 获得原内容的拷贝。

### 获取所有模板信息

```typescript
dy.template.getTemplates() :object[];
```

该方法返回如下结构的对象：

```json
[
    {
        id: "tuid",
        content: [HTMLElement]
    },
    ...
]
```

|   属性    |    描述    |
| :-------: | :--------: |
|   `id`    | 模板的 ID  |
| `content` | 模板的内容 |

## 模板进阶（TODO）

### 模板变量（TODO）

原生 API 中，`<slot>` 元素是用于插入变量的占位符，但其兼容性弱。在 dynamic 中，可以通过 `<slot>` 在模板中插入变量，通过 dynamic 的 polyfill，其在功能与原生几乎相同的同时增强了兼容。

- 模板变量不是数据节点，与[管理数据流](#管理数据流)中的数据节点不是同一个概念。模板变量被设计为一次性的替换。

下面演示一个例子：

```html
<template tuid="my-template">
    <div>
        <slot name="slot1"></slot>
        <p>............<slot name="slot2">default content</slot>.....</p>
    </div>
</template>
```

使用：

```typescript
dy.template.render({
    tuID: "my-template",
    element: dy.e("#targetElement"),
    slots: {
        "slot1": "slot1's content",
        "slot2": "slot2's content"
    },
    removeOuterElement: true,
    insertAfter: false,
    append: false,
    disableDF: false
});
```

- `slot` 元素必须拥有 `name` 属性，否则会被直接就地转换为文本节点。
- `slot` 元素若含有内部内容（如上文的 `#slot2`），则其将成为缺省值，在没有提供该 `slot` 的变量值而使用模板时将会使用该值。
- `slot` 元素在渲染前均会被转换为文本节点。如需插入 HTML 元素，则建议事后使用直接渲染方法。

### 模板追踪（TODO）

获取指定模板的实例：

```typescript
dy.template.getInstance(tuID :string) :object[];
```

|  参数  |   描述    |
| :----: | :-------: |
| `tuID` | 模板的 ID |

该方法返回如下结构的对象：

```json
[
    {
        reference: [HTMLElement],
        slots:[
            slot_name: "slot_value",
            ...
        ]
    },
    ...
]
```

|    属性     |                        描述                        |
| :---------: | :------------------------------------------------: |
| `reference` |                     模板的实例                     |
|   `slots`   | 该实例使用的变量，如未赋值则为缺省值或 `undefined` |
| `slot_name` |                       变量名                       |

- 该方法**不能获取**渲染时 `removeOuterElement` 参数为 `true` 的元素，因为其最外层元素已被删除。这时需要使用数据流中的获取作用域然后手动筛选的方案。

# 数据流管理（TODO）

## dynamic 的数据流管理

dynamic 使用节点 + 网结构来管理数据流。

每个数据节点都可以有 上游节点（`prevNodes[]`），但是只有 JavaScript 中的数据节点可以有 下游节点（`nextNodes[]`），因为 HTML 中的数据节点不能被侦测。因此我们将 HTML 中的数据节点也称为 `导出节点`。

数据节点可以被插入到任何地方，并且可以包含任何 JavaScript 对象。在目前的 dynamic 中，数据节点内容是**动态类型**的。以后可能会更改为**动静混合类型**以提供类型检测功能。

## 关于 `dfID`

每个节点都有独一无二的 ID，称为 `dfID`。有效 `dfID` 是长度不小于 8 位的字符串，前 5 位为固定字符串 `dfid-`，后为**小写字母或数字**。

此规范的目的是能将每一个 `dfID` 放入 HTML 文档的任意部位，包括：标签名、属性名、属性值、内容。

当 dynamic 自动生成 `dfID` 时，其长度总是为 29 字符，因为 dynamic 的开发者是 LJM1**29**14。总共可能生成 2.25e+37 个 `dfID`，基本不用担心碰撞，并有[碰撞检测](#enableAntiClash)功能（需在 `options` 参数中设置）。

## 新建作用域

数据流管理仅在作用域内有效，这样做一是为了防止不同示例的作用域混淆（不过由于 `dfID` 难以重复，即使多个实例有相同的作用域也几乎完全不会造成数据问题，只是性能会下降，并且开发者会看懵），二是减少不必要的性能开销。

声明 dynamic 应接管某元素及其后代：

```typescript
dy.dataFlow.new(element :HTMLElement) :void;
```

|   参数    |     描述     |
| :-------: | :----------: |
| `element` | 应查看的元素 |

声明后，dynamic 才会识别并转换其中的所有有效数据节点。

## 利用数据流简化操作



在之前已经出现过一些声明式指令：`<template>` 的 `tuID` 和 `dynamic`。

### 动态替换attribute

```html
<div :id="dfID"></div>
```

和 Vue 的简化 API 一模一样。

其实就是给 div 的 `id` 属性绑定了一个数据节点。然后用 JavaScript 连接节点，即可控制这个 div 的 `id` 属性。

### 是否显示这个 DOM

```html
<div :style="display: {{dfID}}"></div>
```

其实和上面的一模一样。dynamic 不会将 HTML 文档中的字符串的一部分识别为有效 `dfID`，若要达到上面的插值效果，需要给 `dfID` 两侧添加 `{{}}` 双大括号来指示 dynamic。

或者也可以通过一个处理数据节点处理字符串插值后再流动到 HTML 文档中，此时由于整个字符串都是 `dfID` 内容，故不需要添加指示：

```html
<div :style="dfID"></div>
```

# 其他工具

## 直接渲染

向文档中渲染任意HTML。

```typescript
dy.render({
    HTML :string | HTMLElement | HTMLCollection | Node | NodeList | Node[],
    element :HTMLElement,
    insertAfter? :boolean,
    append? :boolean,
    disableDF? :boolean
}) :Node[];
```

|     参数      |                             描述                             |
| :-----------: | :----------------------------------------------------------: |
|    `HTML`     | 要渲染的 HTML，可以是上文提到的所有类型，方法会自动将其转换  |
|   `element`   |                           目标元素                           |
| `insertAfter` | `true`：在目标元素后插入 HTML；`false`：在目标元素前插入 HTML |
|   `append`    | `true`：在目标元素中的最后插入 HTML；`false`：在目标元素中的最前插入 HTML；优先级高于 `insertAfter` |

`insertAfter` 和 `append` 的共同缺省值是：在目标元素后插入 HTML。

其实可以用原生 API 直接做到这一点，为了节省一点键盘耐久度搞了这个组合方法。

该方法返回一个由 Node 组成的 Array，包括传入的HTML字符串中的所有顶级元素。

## 重复填充

从单个对象获取重复填充该对象的数组。

```typescript
dy.repeat({
    item :any,
    count :number
}) :any[];
```

|  参数   |      描述       |
| :-----: | :-------------: |
| `item`  |    填充对象     |
| `count` | 次数，必须大于0 |

该方法是 `Array.fill()` 的易用版。

该方法返回一个 Array。

## 获取元素

是 `document.querySelectorAll()` 的易用版。

```typescript
dy.e(s :string) :Node[] | Node;
```

| 参数 |    描述    |
| :--: | :--------: |
| `s`  | css 选择器 |

仅当传入选择器的最终选择器为 ID 选择器（即 `#` ）且获取到元素时返回 `Node` 类型单个元素，否则返回  `Node[]` 类型。

## DOM 脱壳（TODO）

将某些同父元素的元素从它们的父元素里脱出，放入祖父元素内。使用模板时非常实用的方法。

```typescript
dy.hatch({
    element :HTMLElement,
    remove? :boolean
}) :Node[]
```

|   参数    |            描述            |
| :-------: | :------------------------: |
| `element` |           父元素           |
| `remove`  | 是否在操作完成后删除父元素 |

该方法返回被脱壳的子元素数组。

## 重复 DOM 操作优化（TODO）

- 浏览器很讨厌这种代码：

```typescript
const myelement = dy.e("#myelement");
for(let i = 0; i < 100; i++){
    dy.template.render({
        tuID: "my-tuid",
    	element: myelement,
    	append: true
    })
}
```

任何对 DOM 的操作都是比较耗时的，特别是那些会触发重排 / 重绘的操作。对此 dynamic 提供了一个优化方法：

```typescript
dy.v({
    processor: ()=>{
        
    },
    receiver: ()=>{
        
    }
}) :Node[];
```

|   参数    |            描述            |
| :-------: | :------------------------: |
| `element` |           父元素           |
| `remove`  | 是否在操作完成后删除父元素 |

# 实例配置

在创建实例时传入配置。

```typescript
const dy = new Dynamic(options);
```

下面是对 `options` 对象的有效属性的描述，注意所有属性都是**可选的**。无效的属性将被 dynamic 忽略。

|               有效属性                |     类型      |               描述               |
| :-----------------------------------: | :-----------: | :------------------------------: |
|              `rootScope`              | `HTMLElement` |   创建实例时顺便指定一个作用域   |
| [`enableAntiClash`](#enableAntiClash) |   `boolean`   |         是否开启碰撞检测         |
|            `clashHandler`             |  `Function`   |           碰撞处理方法           |
|          `multiNextDataNode`          |   `boolean`   | 是否允许数据节点存在多个下级节点 |

## enableAntiClash

任意两个模板的 `tuID` 和相连的数据节点的 `dfID` 均不应该重复，并且由于极低的碰撞概率，它们一般也不会重复。但对于拥有许多模板和数据节点的大型程序来说，这貌似有可能，并且考虑到一些开发者愿意用性能换强迫症的开心，所以提供了碰撞检测功能。

将 `enableAntiClash` 设为 `true` 即可打开。此时也必须设置 `clashHandler` 方法，dynamic 的调用参数如下：

```typescript
clashHandler(type :string, clasher :object, clashee :object) :string;
```

|   参数    |                    描述                    |
| :-------: | :----------------------------------------: |
|  `type`   | `tuID`：模板的碰撞；`dfID`：数据节点的碰撞 |
| `clasher` |       碰撞的实例中创建较**晚**的那个       |
| `clashee` |       碰撞的实例中创建较**早**的那个       |

该方法期望的返回值是有效的 `tuID` 或 `dfID`。dynamic 仍会对 `tuID` 或 `dfID` 的有效性做检查，若无效，则抛出异常。

碰撞检测会消耗一些性能，在每一次创建新实例时进行 ID 检查。

## multiNextDataNode

dynamic 默认只允许数据节点存在一个下级节点，因为多下级节点的情况并不是经常发生，并且会大量耗费性能。如果所有数据节点都只存在一个下级节点，那么 dynamic 就会使用非典型的较高效的网络图对数据流进行处理。

- 没有说不允许数据节点存在多个上级节点，不然数据网变数据链了，多没意思。



# 补充说明

## 开发背景

dynamic 对标市面上的 JavaScript 框架（下简：框架）。在我看来，这些框架存在以下优点：

1. 极大提升了 UI 开发效率，**特别是针对某一类 UI 的批量开发**。
2. 声明式编程，更贴近自然思维。
3. 高度 API 化，无需接触底层浏览器 API。
4. 非常便于管理数据的流动与展示。
5. 可以满足服务端渲染需求。

但也存在以下缺点：

1. 各个框架均存在各自不同的语法和编程形式，这让学习一个框架因需要适应新语法而变得困难，相同问题也见于切换框架。
2. 相对原生 API 来说，框架的性能普遍不高。
3. 框架的编程环境搭建费力，特别是某些需要通过预编译器编译代码的框架。
4. 声明式编程让我们对框架在幕后做了什么几乎一无所知，导致我们需要不停地查阅文档。这同时也导致事件处理的混乱和 hook 的诞生，进而导致需要研读大量框架文档。

dynamic 在付出抛弃一些优点的代价后，做到了以下特性：

1. 仅在 HTML 中允许部分声明式编程，其余绝大部分使用命令式编程。
   - 这让我们可以在事件处理到需要调用 dynamic 的时候正确地使用 dynamic，而不是对框架用 hook 函数。
   - 这损失了什么？部分喜好声明式编程的程序员的效率。但是程序员的思维不应该就是命令式的吗？为了提高效率或让开发者读起来舒服而把大量权力交给框架内部，然后不停地翻查文档找它会自己干些什么，我不觉得这是一件聪明事。
   - 如果说 jQuery 是需要全过程编程的工具——就像灶台上的烧水壶，框架是近乎全过程的自动化工具——就像茶水间的直饮水机，那么 dynamic 就是一个需要且仅需要在必要的时候编程的工具——就像桌子上的电热水壶。jQuery 需要一刻不停的参与；框架只需要打开电源、接好水管；dynamic 需要在框架的基础上再从很多个按钮里找出需要的功能，之后无需参与。
2. 抛弃自定义语法，尽可能贴近原生语法与原生 API。
   - 这让学过 JavaScript 和现代浏览器原生 API 的程序员可以快速上手 dynamic。
   - 这损失了一些编程效率，但在可接受的范围内，因为 dynamic 普遍采用命令式编程。
3. 使用节点连接的方式控制数据流。
   - 这存在一定的性能问题。
   - 这几乎完美解决了双向数据流和数据隔离问题，并且可以直接作为一个数据框架使用。

总之：其意义在于在前端开发高度框架化的今天探究一种无框架（弱框架）的编程方式，但同时又最大限度地保留框架带来的好处。

## 版权声明

本软件以 Apache License 2.0 协议开源。使用本软件的任何实体必须遵循 Apache License 2.0 许可条款，否则其使用权将被自动收回，并将因此涉嫌侵权使用。

©2020-2022 LJM12914

## issues与PR

- 欢迎提出issue。
- 请不要在未与我沟通的情况下发起PR，否则PR大概率被拒绝。
