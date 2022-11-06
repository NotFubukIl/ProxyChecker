const a = require("./checker/main.js")
const fs = require("fs")

var settings = {
    url: "YOUR_URL",
    type: "YOUR_TYPE"
}
var file = fs.readFileSync("./proxy.txt").toString().split(/\r\n/g)
if (!fs.existsSync("./output")) fs.mkdirSync("./output")
var working = 0
var notWorking = 0
file.forEach(async r => {
    var b = await a({
        ...settings,
        proxy: r
    })
    if (b.code == 200) {
        process.title = `${settings.type.toUpperCase()}: Working: ${working++} | Not Working: ${notWorking} -- !"Dialz_†#0069`
        return fs.appendFileSync("./output/" + settings.type + " working.txt", r + "\n")
    } else {
        process.title = `${settings.type.toUpperCase()}: Working: ${working} | Not Working: ${notWorking++} -- !"Dialz_†#0069`
        return fs.appendFileSync("./output/" + settings.type + " not working.txt", r + "\n")
    }
})

process.on("unhandledRejection", callback => {})
process.on("uncaughtException", callback => {})