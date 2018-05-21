## 缓存策略

### Cache, Update and refresh

#### 要求：
    尽快显示数据

#### 问题：
    先显示 cache 中的旧数据，然后获取最新的数据并更新 cache 中的数据，如果新内容可用，就通过其他方式去显示这个新的内容。

#### 解决：
    从 cache 中获得旧内容，同时执行网络请求获得新的缓存条目，并通知界面显示新的内容。

    通知使用 postMessage 进行

#### 总结：
    none