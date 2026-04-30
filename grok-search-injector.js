console.log("=== Original Request ===");
console.log("URL: " + $request.url);
console.log("Body: " + ($request.body || "null"));

let body = $request.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        if (obj.model && /grok/i.test(obj.model)) {
            obj.tools = obj.tools || [];
            let searchFound = false;
            for (let i = 0; i < obj.tools.length; i++) {
                if (obj.tools[i].type === 'web_search' || obj.tools[i].type === 'openrouter:web_search') {
                    obj.tools[i].type = 'openrouter:web_search';
                    obj.tools[i].parameters = obj.tools[i].parameters || {};
                    obj.tools[i].parameters.max_results = 30;
                    obj.tools[i].parameters.max_total_results = 30;
                    obj.tools[i].parameters.search_context_size = "large";
                    searchFound = true;
                }
            }
            if (!searchFound) {
                obj.tools.push({ 
                    type: 'openrouter:web_search',
                    parameters: {
                        max_results: 30,
                        max_total_results: 30,
                        search_context_size: "large"
                    }
                });
            }
            
            obj.reasoning = { effort: "high" };
            obj.include_reasoning = true;
            
            if (!obj.max_tokens || obj.max_tokens < 16000) {
                obj.max_tokens = 16000;
            }
            
            let newBody = JSON.stringify(obj);
            console.log("=== Modified Body ===");
console.log(newBody);
            
            $done({ body: newBody });
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
