let body = $request.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 使用正则精准匹配模型名（忽略大小写），仅对 Grok 放行
        if (obj.model && /grok/i.test(obj.model)) {
            // 初始化 tools 数组
            obj.tools = obj.tools || [];
            
            // 检测是否已存在 web_search
            const hasWebSearch = obj.tools.some(t => t.type === 'web_search');
            
            // 注入内置搜索标识
            if (!hasWebSearch) {
                obj.tools.push({ type: 'web_search' });
                console.log("✅ 已成功为 Grok 请求注入 web_search 参数");
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
