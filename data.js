const jsonfile = require("jsonfile");

/**
 * @typedef PostRecord
 * @type {object}
 * @property {string} `Helység.megnevezése`
 * @property {string} `IRSZ`
 * @property {number} `Településrész`
 * @property {string} `Helység.KSH kódja`
 * @property {string} `Helység.jogállása`
 * @property {string} `Megye megnevezése`
 * @property {string} `Járáskódja`
 * @property {string} `Járásneve`
 * @property {string} `Járásszékhelye`
 * @property {string} `Polgármesteri hivatal, közös önkormányzati hivatal.kódja`
 * @property {string} `Polgármesteri hivatal, közös önkormányzati hivatal.székhelye`
 * @property {string} `Helység.KSH kódja`
 * @property {string} `Helység.KSH kódja`
 * @property {string} `Lakó-népesség`
 * @property {string} `Lakások száma`
 * @property {string} `Becsült terület-adatokkal`
 * @property {string} `Nemzetiségi önkormányzat.bolgár`
 * @property {string} `Nemzetiségi önkormányzat.görög`
 * @property {string} `Nemzetiségi önkormányzat.horvát`
 * @property {string} `Nemzetiségi önkormányzat.lengyel`
 * @property {string} `Nemzetiségi önkormányzat.német`
 * @property {string} `Nemzetiségi önkormányzat.örmény`
 * @property {string} `Nemzetiségi önkormányzat.roma`
 * @property {string} `Nemzetiségi önkormányzat.román`
 * @property {string} `Nemzetiségi önkormányzat.ruszin`
 * @property {string} `Nemzetiségi önkormányzat.szerb`
 * @property {string} `Nemzetiségi önkormányzat.szlovák`
 * @property {string} `Nemzetiségi önkormányzat.szlovén`
 * @property {string} `Nemzetiségi önkormányzat.ukrán`
 */

/**
 * @type {PostRecord[]}
 */
let data = jsonfile.readFileSync("irsz.json");

/**
* @typedef {Object} PostRecord
* @property {Object} helyseg
* @property {string} helyseg.megnevezes
* @property {string} helyseg.kshKod
* @property {string} helyseg.jogallas
* @property {string} irsz
* @property {string} telepulesresz
* @property {string} megye
* @property {string} jaraskod
* @property {string} jarasnev
* @property {string} jarasszekhely
* @property {Object} hivatal
* @property {string} hivatal.kod
* @property {string} hivatal.szekhely
* @property {string} nepesseg
* @property {string} lakosok
* @property {string} terulet
* @property {Object} nemzetisegiOnkormanyzat
* @property {string} nemzetisegiOnkormanyzat.bolgar
* @property {string} nemzetisegiOnkormanyzat.gorog
* @property {string} nemzetisegiOnkormanyzat.horvat
* @property {string} nemzetisegiOnkormanyzat.lengyel
* @property {string} nemzetisegiOnkormanyzat.nemet
* @property {string} nemzetisegiOnkormanyzat.ormeny
* @property {string} nemzetisegiOnkormanyzat.roma
* @property {string} nemzetisegiOnkormanyzat.roman
* @property {string} nemzetisegiOnkormanyzat.ruszin
* @property {string} nemzetisegiOnkormanyzat.szerb
* @property {string} nemzetisegiOnkormanyzat.szlovak
* @property {string} nemzetisegiOnkormanyzat.szloven
* @property {string} nemzetisegiOnkormanyzat.ukran
*/

/**
 * @param  {PostRecord} record
 * @returns {ParsedRecord}
 */
function parsePostRecord(record) {
    return {
        helyseg: {
            megnevezes: record["Helység.megnevezése"],
            kshKod: record["Helység.KSH kódja"],
            jogallas: record["Helység.jogállása"],
        },
        irsz: record["IRSZ"],
        telepulesresz: record["Településrész"],
        megye: record["Megye megnevezése"],
        jaraskod: record["Járáskódja"],
        jarasnev: record["Járásneve"],
        jarasszekhely: record["Járásszékhelye"],
        hivatal: {
            kod: record["Polgármesteri hivatal, közös önkormányzati hivatal.kódja"],
            szekhely: record["Polgármesteri hivatal, közös önkormányzati hivatal.székhelye"],
        },
        nepesseg: record["Lakó-népesség"],
        lakasok: record["Lakások száma"],
        terulet: record["Becsült terület-adatokkal"],
        nemzetisegiOnkormanyzat: {
            bolgar: record["Nemzetiségi önkormányzat.bolgár"],
            gorog: record["Nemzetiségi önkormányzat.görög"],
            horvat: record["Nemzetiségi önkormányzat.horvát"],
            lengyel: record["Nemzetiségi önkormányzat.lengyel"],
            nemet: record["Nemzetiségi önkormányzat.német"],
            ormeny: record["Nemzetiségi önkormányzat.örmény"],
            roma: record["Nemzetiségi önkormányzat.roma"],
            roman: record["Nemzetiségi önkormányzat.román"],
            ruszin: record["Nemzetiségi önkormányzat.ruszin"],
            szerb: record["Nemzetiségi önkormányzat.szerb"],
            szlovak: record["Nemzetiségi önkormányzat.szlovák"],
            szloven: record["Nemzetiségi önkormányzat.szlovén"],
            ukran: record["Nemzetiségi önkormányzat.ukrán"],
        },
    };
}

data = data.map(r => parsePostRecord(r));
exports.data = data;
