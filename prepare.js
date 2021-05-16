const fs = require("fs");
const { download } = require("./download");
const csv = require("csv-parser");

function prepareWrapper(onSuccess, onError) {
    const csvUrl = "https://raw.githubusercontent.com/tamas-ferenci/IrszHnk/master/IrszHnk.csv";
    const filename = "./irsz.csv";
    download(csvUrl, filename)
        .then(_ => {
            console.log("Előkészített Magyar Posta adatok CSV formátumban letöltve.");
            console.log("(forrás: https://github.com/tamas-ferenci/IrszHnk)");
            const records = [];
            console.log("CSV -> JSON konvertálás...");
            fs.createReadStream(filename, { encoding: "latin1" })
                .pipe(csv({ separator: ";" }))
                .on("data", (data) => records.push(data))
                .on("end", () => {
                    try {
                        fs.writeFileSync("./irsz.json", JSON.stringify(records), { encoding: "utf-8" });
                        console.log("Előkészítés kész");
                        onSuccess();
                    } catch (err) {
                        onError(err);
                    }
                });
        })
        .catch(err => {
            console.log("Letöltés sikertelen", err);
        });
}

function prepare() {
    return new Promise((resolve, reject) => {
        prepareWrapper(resolve, reject);
    });
}

exports.prepare = prepare;