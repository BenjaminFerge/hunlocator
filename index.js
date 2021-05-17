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
        const { irsz, varos } = req.query;
        res.setHeader("Content-Type", "application/json");
        let result;
        if (irsz) {
            result = data.filter(r => r.irsz.startsWith(irsz))
        } else if (varos) {
            result = data.filter(r => r.helyseg.megnevezes
                .toLowerCase()
                .includes(varos)
            );
        } else {
            result = data;
        }
        res.send(JSON.stringify(result));
    });

    app.listen(port, () => {
        console.log(`HunLocator itt fut: http://localhost:${port}`)
    });
}
