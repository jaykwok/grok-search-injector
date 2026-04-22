# QX Grok Web Search Injector

A Quantumult X MITM script to dynamically inject the `web_search` payload for Grok models via OpenRouter API.  
通过 Quantumult X 重写脚本，自动拦截并为 OpenRouter 上的 Grok 模型注入原生联网搜索参数。

### ✨ Features / 功能特点

* **Zero Client Configuration (客户端零配置):** No need to change anything in your AI app. / 无需对你正在使用的 AI 客户端（如 OpenCat 等）进行任何修改或复杂设置。
* **Precision Targeting (精准匹配):** Uses regex to match model names, injecting the payload *only* when you use a Grok model (e.g., `grok-2-1212`). / 脚本内置正则判定，仅在你请求带有 "grok" 名称的模型时进行注入，绝不干扰 Claude 或 OpenAI 等其他模型。
* **Privacy First (隐私与安全):** 100% local traffic hijacking via Quantumult X. No cloud proxy is involved. / 完全基于 QX 的本地 MitM 流量劫持，请求直接发往官方，不经过任何第三方云端服务器。
* **Non-destructive (无损注入):** Automatically checks for existing `tools` arrays to prevent payload duplication. / 自动检测并保留原有的工具调用数组，防止参数冲突报错。

---

### 🚀 Installation / 安装使用

**Prerequisites / 前提条件:**
Ensure you have [Quantumult X](https://apps.apple.com/us/app/quantumult-x/id1443988620) installed, with **MitM** enabled and the system certificate trusted.  
确保你的设备已安装 Quantumult X，并且已开启 **MitM（中间人解密）** 并信任了系统证书。

**Step-by-Step / 操作步骤:**

1.  Open Quantumult X, navigate to **Settings** -> **Rewrite** -> **Rewrite Rules** -> **Add**.  
    打开 Quantumult X，进入 **配置 (Settings)** -> **重写 (Rewrite)** -> **引用 (添加)**。
2.  Paste the following **Raw URL** into the resource path:  
    将下方的 **Raw 直链** 粘贴到资源路径/订阅地址中：

    ```url
    [https://raw.githubusercontent.com/jaykwok/grok-search-injector/main/enable-grok-search.snippet](https://raw.githubusercontent.com/jaykwok/grok-search-injector/main/enable-grok-search.snippet)
    ```

3.  Enable the subscription and save.  
    开启该重写引用并保存配置。
4.  Open your AI client, start a chat with any OpenRouter Grok model, and ask a real-time question (e.g., "Search X for today's top tech news") to verify the web search functionality.  
    打开你的 AI 客户端，选择 OpenRouter 的 Grok 模型，询问一个强时效性的问题（例如：“搜索今天 X 平台上关于苹果的最新推文”），即可验证原生搜索是否被成功激活。

---

### 🛠 How it Works / 工作原理

1.  QX performs MitM decryption on traffic going to `openrouter.ai`. / QX 对发往 OpenRouter 的流量进行本地解密。
2.  The Rewrite rule intercepts `POST` requests to `/v1/chat/completions` and triggers the local `grok-search-injector.js` script. / 重写规则拦截对话接口的请求，并触发注入脚本。
3.  The script parses the JSON body. If the `model` contains "grok", it pushes `{"type": "web_search"}` into the `tools` array. / 脚本解析 JSON Body，若检测到 Grok 模型，则强制在 payload 中插入搜索权限声明。
4.  The modified payload is sent to OpenRouter, triggering xAI's native search engine. / 修改后的请求发往 OpenRouter，底层模型识别参数并完美激活联网功能。

> **Disclaimer:** This script is for educational and personal use only. It relies on the current OpenRouter API structure, which may change over time. / 本脚本仅供学习与个人使用，依赖于当前 OpenRouter API 结构，未来可能随官方更新而失效。
