# QX Grok Web Search Injector

A Quantumult X MITM script to dynamically inject the `web_search` payload for Grok models via OpenRouter API.  
通过 Quantumult X 重写脚本，自动拦截并为 OpenRouter 上的 Grok 模型注入原生联网搜索参数。

---

### ✨ Features / 功能特点

**Zero Client Configuration**  
No need to change anything in your AI app.  
**客户端零配置**  
无需对你正在使用的 AI 客户端（如 OpenCat 等）进行任何修改或复杂设置。

**Precision Targeting**  
Uses regex to match model names, injecting the payload *only* when you use a Grok model (e.g., `grok-2-1212`).  
**精准匹配**  
脚本内置正则判定，仅在你请求带有 "grok" 名称的模型时进行注入，绝不干扰 Claude 或 OpenAI 等其他模型。

**Privacy First**  
100% local traffic hijacking via Quantumult X. No cloud proxy is involved.  
**隐私与安全**  
完全基于 QX 的本地 MitM 流量劫持，请求直接发往官方，不经过任何第三方云端服务器。

**Non-destructive**  
Automatically checks for existing `tools` arrays to prevent payload duplication.  
**无损注入**  
自动检测并保留原有的工具调用数组，防止参数冲突报错。

---

### 🚀 Installation / 安装使用

**Prerequisites**  
Ensure you have [Quantumult X](https://apps.apple.com/us/app/quantumult-x/id1443988620) installed, with **MitM** enabled and the system certificate trusted.  
**前提条件**  
确保你的设备已安装 Quantumult X，并且已开启 **MitM（中间人解密）** 并信任了系统证书。

**Step 1**  
Open Quantumult X, navigate to **Settings** → **Rewrite** → **Rewrite Rules** → **Add**.  
打开 Quantumult X，进入 **配置** → **重写** → **引用** → **添加**。

**Step 2**  
Click the button below to import the rewrite rule with one tap.  
点击下方按钮，一键导入重写规则。

[![Add to Quantumult X](https://img.shields.io/badge/Quantumult%20X-一键导入重写规则-1e90ff?style=for-the-badge&logo=icloud)](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22rewrite_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Fjaykwok%2Fgrok-search-injector%2Fmain%2Fenable-grok-search.snippet%2C%20tag%3DGrok%20Search%20Injector%2C%20update-interval%3D86400%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D)

**Step 3**  
Enable the subscription and save.  
开启该重写引用并保存配置。

**Step 4**  
Open your AI client, select any OpenRouter Grok model, and ask a real-time question (e.g., *"Search X for today's top tech news"*) to verify that web search is working.  
打开你的 AI 客户端，选择 OpenRouter 的 Grok 模型，询问一个强时效性的问题（例如："搜索今天 X 平台上关于苹果的最新推文"），即可验证原生搜索是否被成功激活。

---

### 🛠 How it Works / 工作原理

1. QX performs MitM decryption on traffic going to `openrouter.ai`.  
   QX 对发往 OpenRouter 的流量进行本地解密。

2. The Rewrite rule intercepts `POST` requests to `/v1/chat/completions` and triggers the local script.  
   重写规则拦截对话接口的请求，并触发注入脚本。

3. The script parses the JSON body. If the `model` field contains `"grok"`, it pushes `{"type": "web_search"}` into the `tools` array.  
   脚本解析 JSON Body，若检测到 Grok 模型，则在 payload 中强制插入搜索权限声明。

4. The modified payload is forwarded to OpenRouter, triggering xAI's native search engine.  
   修改后的请求发往 OpenRouter，底层模型识别参数并完美激活联网功能。

---

> **Disclaimer:** This script is for educational and personal use only. It relies on the current OpenRouter API structure, which may change over time.  
> **免责声明：** 本脚本仅供学习与个人使用，依赖于当前 OpenRouter API 结构，未来可能随官方更新而失效。
