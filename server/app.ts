import express from "express"
import {PORT} from "./index"
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
