const express = require("express");
const fs = require("fs");
const { exit } = require("process");
const { prepare } = require("./prepare");
const app = express();
const port = 4000;

if (!fs.existsSync("irsz.json")) {
    console.log("Hiányzó irsz.json fájl letöltése...");
    (async () => {
        try {
            await prepare();
            run();
        } catch (err) {
            console.error("Hiba!", err);
            exit(1);
        }
    })();
} else {
    run();
}

function run() {
    const { data } = require("./data");
    app.get("/", function (req, res) {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(data));
    });

    app.listen(port, () => {
        console.log(`HunLocator itt fut: http://localhost:${port}`)
    });
}
