let body = $request.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 仅对 Grok 模型生效
        if (obj.model && /grok/i.test(obj.model)) {
            obj.tools = obj.tools ||[];
            
            // 1. 注入 OpenRouter 推荐的专属 web_search 语法
            // 只要注入了这个，OpenRouter 就会在后台【自动】给 Grok 加上 x_search 工具！
            const hasWebSearch = obj.tools.some(t => t.type === 'web_search' || t.type === 'openrouter:web_search');
            
            if (!hasWebSearch) {
                obj.tools.push({ type: 'openrouter:web_search' });
                console.log("✅ 已成功注入 openrouter:web_search，已激活 Grok 的全网搜索与推特原生搜索");
            }
            
            // 2. (可选) 注入推特高级搜索参数
            // OpenRouter 规定：高级参数必须放在最外层的 x_search_filter 中
            if (!obj.x_search_filter) {
                obj.x_search_filter = {
                    // 如果你需要大模型能看懂推特里的图片和视频，可以把下面两行改成 true
                    enable_image_understanding: false, 
                    enable_video_understanding: false
                    
                    // 如果你想让它只搜某个大佬的推特（最多10个），可以取消下面这行的注释
                    // allowed_x_handles: ["elonmusk", "OpenRouterAI"] 
                };
            }
            
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({});
        }
    } catch (e) {
        console.log("❌ 脚本解析异常: " + e);
        $done({});
    }
} else {
    $done({});
}
