const Downloader = require("nodejs-file-downloader");
const fs = require("fs");
const cliProgress = require("cli-progress");
const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

async function download(url, fileName) {
    if (fs.existsSync(fileName)) {
        console.log(`A fájl már létezik: ${fileName}`)
        return;
    }
    let fullSize = 0;
    const downloader = new Downloader({
        url,
        directory: ".",
        fileName,
        onProgress: (percentage, chunk, remainingSize) => {
            if (!fullSize) {
                fullSize = remainingSize;
                progressBar.start(fullSize, 0);
            }
            const current = fullSize - remainingSize;
            progressBar.update(current);
        }
    })
    try {
        await downloader.download();
        progressBar.stop();
    } catch (error) {
        progressBar.stop();
    } finally {
        progressBar.stop();
    }
}

exports.download = download;