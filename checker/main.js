const request = require("request")

module.exports = async (config) => {
    if (!config || typeof config !== "object") return new TypeError("Config Must Be An Object ! Cannot Receive " + typeof config)
    this.url = config.url
    this.type = config.type
    this.proxy = config.proxy

    if (!["http", "socks4", "socks5", "https"].includes(this.type)) return new TypeError(`${this.type} Doesn't Exists !`)
    for (p in this)
        if (this[p] == undefined) return new TypeError(`${p} Is undefined, Please Put a(n) ${p} in the config`)


    return await new Promise(async resolve => {
        request.get(this.url, {
            proxy: this.type + "://" + this.proxy
        }, (err, res, body) => {
            if (err) return resolve({
                code: 400
            })
            if (!res) return
            return resolve({
                code: res.statusCode
            })
        })
    })
}