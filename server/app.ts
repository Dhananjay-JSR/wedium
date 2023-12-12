import express from "express"
import process from "process"
import axios, { AxiosError } from "axios"
import cheerio from 'cheerio'
import {PORT} from "./index"
import path from "path"
const app = express()

function HTMLFetch(url:string){
  return axios.request({
    method: 'get',
    maxBodyLength: Infinity,
    url: "https://webcache.googleusercontent.com/search?q=cache:"+url,
    headers: { 
      'authority': 'webcache.googleusercontent.com', 
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
      'accept-language': 'en-US,en;q=0.9', 
      'cache-control': 'no-cache', 
      'cookie': '_dd_s=rum=0&expire=1702394423236', 
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
  })
}

function HTML_Cleaner(BODY:string){
  const $ = cheerio.load(BODY);
  $('script').empty()
  $($('#' + $("body").children().first().attr('id')).remove());
    return $.html()

}


app.use(express.static(path.join(process.cwd(), "..", "client", "dist")));

app.get("/api",async(req,res)=>{
  const {url}  = req.query
  if (url){
    try{
      res.send(HTML_Cleaner((await HTMLFetch(url as string)).data))
    }
    catch (error){
      const err = error as AxiosError
      if (err.response?.status === 404){
        res.status(404).send("Page Not Found")
      }
    }
  }else{
    res.status(400).send("No URL Provided")
  }
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

