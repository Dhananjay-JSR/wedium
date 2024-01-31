"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const index_1 = require("./index");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
function HTMLFetch(url) {
    return axios_1.default.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: "https://webcache.googleusercontent.com/search?q=cache:" + url,
        headers: {
            'authority': 'webcache.googleusercontent.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'no-cache',
            // 'cookie': '_dd_s=rum=0&expire=1702394423236', 
            'pragma': 'no-cache',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            'sec-ch-ua-arch': '"x86"',
            'sec-ch-ua-bitness': '"64"',
            'sec-ch-ua-full-version': '"120.0.6099.71"',
            'sec-ch-ua-full-version-list': '"Not_A Brand";v="8.0.0.0", "Chromium";v="120.0.6099.71", "Google Chrome";v="120.0.6099.71"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-ch-ua-platform-version': '"10.0.0"',
            'sec-ch-ua-wow64': '?0',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'x-client-data': 'CIW2yQEIpLbJAQipncoBCPzaygEIk6HLAQj9mM0BCIWgzQEI3L3NAQi5yM0BCLXjzQEIvenNAQjj7M0BCKHuzQEY1dzNARin6s0B'
        }
    });
}
function HTML_Cleaner(BODY) {
    const $ = cheerio_1.default.load(BODY);
    $('script').empty();
    $('link').empty();
    $($('#' + $("body").children().first().attr('id')).remove());
    $('script[src]').remove();
    return $.html();
}
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.static(path_1.default.join(process_1.default.cwd(), "..", "client", "dist")));
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url } = req.query;
    if (url) {
        try {
            res.send(HTML_Cleaner((yield HTMLFetch(url)).data)
            // .replace(/cdn-client.medium.com/g,"sa")
            );
        }
        catch (error) {
            const err = error;
            if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                res.status(404).send("Page Not Found");
            }
        }
    }
    else {
        res.status(400).send("No URL Provided");
    }
}));
app.get('*', (req, res) => res.sendFile(path_1.default.join(process_1.default.cwd(), "..", "client", "dist", "index.html")));
app.listen(index_1.PORT, () => {
    console.log(`Server listening on port ${index_1.PORT}`);
});
