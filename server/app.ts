import express from "express"
import process from "process"
import {PORT} from "./index"
import path from "path"
const app = express()

app.use(express.static(path.join(process.cwd(), "..", "client", "dist")));


app.get("/api",(req,res)=>{
  res.send("Hello World")
})
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

