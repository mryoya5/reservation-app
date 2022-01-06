// 開発環境と本番環境でDBを切り替える
if(process.env.NODE_ENV === "production"){
    // 本番環境
    module.exports = require("./prod")
}
else{
    // 開発環境
    module.exports = require("./dev")
}