let body = $request.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        if (obj.model && /grok/i.test(obj.model)) {
            obj.tools = obj.tools ||[];
            
            // 检测是否已经存在搜索工具（兼容带前缀和不带前缀的写法）
            const hasWebSearch = obj.tools.some(t => t.type === 'openrouter:web_search' || t.type === 'web_search');
            const hasXSearch = obj.tools.some(t => t.type === 'openrouter:x_search' || t.type === 'x_search');
            
            // 1. 为 OpenRouter 注入通用网络搜索
            if (!hasWebSearch) {
                obj.tools.push({ type: 'openrouter:web_search' });
                console.log("✅ 已成功为 OpenRouter 注入 openrouter:web_search");
            }
            
            // 2. 为 OpenRouter 注入 X(Twitter) 原生搜索
            if (!hasXSearch) {
                obj.tools.push({ type: 'openrouter:x_search' });
                console.log("✅ 已成功为 OpenRouter 注入 openrouter:x_search");
                
                // (可选) 注入高级参数：OpenRouter 要求挂载在根级的 x_search_filter 下
                obj.x_search_filter = {
                    enable_image_understanding: true,
                    enable_video_understanding: true
                };
            }
            
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({});
        }
    } catch (e) {
        console.log("❌ Grok Inject 脚本解析异常: " + e);
        $done({});
    }
} else {
    $done({});
}
