// ========= 打印完整请求包 =========
console.log("=== Full Request ===");
console.log("URL: " + $request.url);
console.log("Headers: " + JSON.stringify($request.headers));
console.log("Body: " + ($request.body || "null"));
console.log("====================");
// ==================================

let body = $request.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        if (obj.model && /grok/i.test(obj.model)) {
            obj.tools = obj.tools || [];
            const hasWebSearch = obj.tools.some(t => t.type === 'web_search');
            if (!hasWebSearch) {
                obj.tools.push({ type: 'web_search' });
                console.log("Inject success: web_search");
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
