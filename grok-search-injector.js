let body = $request.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 使用正则精准匹配模型名（忽略大小写），仅对 Grok 加自定义 body 参数
        if (obj.model && /grok/i.test(obj.model)) {
            // 初始化 tools 数组
            obj.tools = obj.tools ||[];
            
            // 检测是否已存在对应的 search tool
            const hasWebSearch = obj.tools.some(t => t.type === 'web_search');
            const hasXSearch = obj.tools.some(t => t.type === 'x_search');
            
            // 1. 注入web_search 到 tools 数组
            if (!hasWebSearch) {
                obj.tools.push({ type: 'web_search' });
                console.log("✅ 已成功为 Grok 请求注入 web_search 参数");
            }
            
            // 2. 注入 x_search 到 tools 数组
            if (!hasXSearch) {
                obj.tools.push({ type: 'x_search' });
                console.log("✅ 已成功为 Grok 请求注入 x_search 参数");
            }
            
            // 返回修改后的 Body
            $done({ body: JSON.stringify(obj) });
        } else {
            // 非 Grok 模型直接放行
            $done({});
        }
    } catch (e) {
        console.log("❌ Grok Inject 脚本解析异常: " + e);
        $done({});
    }
} else {
    $done({});
}
