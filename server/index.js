const express = require("express")
const mongoose = require("mongoose")
const config = require("./config/index")
const FakeDB = require("./fake-db")

const productsRouter = require("./routes/products")
const path = require("path")

mongoose.connect(config.DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {
            if(process.env.NODE_ENV !== "production"){
                // 開発環境の場合
                const fakeDB = new FakeDB()
                // fakeDB.initDB()
            }
        }
    )

const app = express()
app.use("/api/v1/products", productsRouter)

// 開発環境と本番環境で処理を切り替える
if(process.env.NODE_ENV === "production"){
    // 本番環境
    // 該当しないGETはindex.htmlを返す
    const appPath = path.join(__dirname, "..", "dist", "reservation-app")
    app.use(express.static(appPath))
    app.get("*", function(req, res){
        res.sendFile(path.resolve(appPath, "index.html"))
    })
}

const PORT = process.env.PORT || "3001"
const HOST = process.env.HOST
app.listen(PORT);
console.log("I am running!")
console.log("PORT:" + PORT)
console.log("HOST:" + HOST)