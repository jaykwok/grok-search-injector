let body = $request.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        if (obj.model && /grok/i.test(obj.model)) {
            obj.tools = obj.tools || [];
            const hasWebSearch = obj.tools.some(t => t.type === 'web_search' || t.type === 'openrouter:web_search');
            if (!hasWebSearch) {
                obj.tools.push({ type: 'openrouter:web_search' });
                console.log("Inject success: openrouter:web_search");
            }
            if (!obj.x_search_filter) {
                obj.x_search_filter = {
                    enable_image_understanding: false,
                    enable_video_understanding: false
                };
            }
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({});
        }
    } catch (e) {
        console.log("Parse error: " + e);
        $done({});
    }
} else {
    $done({});
}
