import {IQuestionBuilder} from "./main";

const maganhangzok = ["a", "á", "e", "é", "i", "í", "o", "ó", "ö", "ő", "u", "ú", "ü", "ű"];
const erosMagasHangrenduBetuk = ["e", "ö", "ü", "ő", "ű"];
const magas_hangrendu_betuk = ["é", "i", "í", "e", "ö", "ü", "ő", "ű"];
const mely_hangrendu_betuk = ["a", "á", "o", "ó", "u", "ú"];
// későbbiek ne végződjenek korábban jövőkkel
const massalhangzok = ["gy", "cs", "dz", "dzs", "zs", "sz", "ly", "cs", "ny", "ty", "q", "w", "r", "t", "z", "p", "s", "d", "f", "g", "h", "j", "k", "l", "y", "x", "c", "v", "b", "n", "m"];

const melyToldalekuMagasKivetelek = ["cél", "híd", "férfi", "sír"]; // todo add 70 more

export enum Hangrend {
    MELY = 1,
    MAGAS = 2,
    VEGYES = 3
}

export enum ToldalekHangrend {
    MELY = 1,
    MAGAS = 2,
    BARMELYIK = 3
}

function melyBetu(betu: string): boolean {
    return mely_hangrendu_betuk.includes(betu);
}

function magasBetu(betu: string): boolean {
    return magas_hangrendu_betuk.includes(betu);
}

export class HungarianQBuilder implements IQuestionBuilder {
    constructor() {
    }

    howMuchSomethingIsInSomething(thing: string, inWhat: string): string {
        return ""; // todo
    }

    isSomethingSomethingProperty(thing: string, property: string): string {
        return ""; // todo
    }

    toldalekHangrendje(szo: string): ToldalekHangrend {
        const szoMaganhangzoi = this.maganhangzok(szo);
        if (!szoMaganhangzoi.length) return null;

        let mely = false, magas = false;
        for (let m of szoMaganhangzoi) {
            if (melyBetu(m.char)) {
                mely = true;
            } else if (magasBetu(m.char)) {
                magas = true;
            }
            if (mely && magas) {
                mely = false;
                magas = false;
                break;
            }
        }
        if (magas) {
            return melyToldalekuMagasKivetelek.includes(szo) ? ToldalekHangrend.MELY : ToldalekHangrend.MAGAS;
        } else if (mely)
            return ToldalekHangrend.MELY;

        // Vegyes

        let utolsoSzotag = true;
        for (let i = szoMaganhangzoi.length - 1; i >= 0; i--) {
            const betu = szoMaganhangzoi[i].char;

            if (utolsoSzotag && betu === "e")
                return ToldalekHangrend.BARMELYIK;

            if (erosMagasHangrenduBetuk.includes(betu))
                return ToldalekHangrend.MAGAS;

            if (melyBetu(betu)) {
                return ToldalekHangrend.MELY;
            }

            // Ha é/i/í, azaz gyenge magánhangzók voltak, akkor az előtte lévőt nézzük a követlező körben
            utolsoSzotag = false;
        }
        console.error(szo + " was rossz")
        return null;
    }

    // kisbetűket vár
    maganhangzok(szo: string): SzoMaganhangzoja[] {
        let szoMaganhangzoi: SzoMaganhangzoja[] = [];
        for (let i = 0; i < szo.length; i++) {
            if (maganhangzok.indexOf(szo.charAt(i)) != -1) {
                szoMaganhangzoi.push({
                    pos: i,
                    char: szo.charAt(i)
                });
            }
        }
        return szoMaganhangzoi;
    }

    valVel(szo: string): string[] {
        return this.altalanosToldalek(szo, "val", "vel", true);
    }


    nakNek(szo: string): string[] {
        return this.altalanosToldalek(szo, "nak", "nek");
    }

    raRe(szo: string) {
        return this.altalanosToldalek(szo, "ra", "re");
    }

    altalanosToldalek(szo: string, melyToldalek: string, magasToldalek: string, teljesHasonulas: boolean = false) {
        let i;
        for (i = 0; i < melyToldalek.length; i++) {
            if (maganhangzok.includes(melyToldalek.charAt(i))) {
                break;
            }
        }
        let l = szo.length;

        let toldalekEleje = melyToldalek.substring(0, i);
        let melyMaganhangzo = melyToldalek.charAt(i);
        let magasMaganhangzo = magasToldalek.charAt(i);
        let toldalekVege = melyToldalek.substring(i + 1, l);

        let eredmeny = "";
        if (maganhangzok.includes(szo.charAt(l - 1))) { //Ha magánhangzóval végződik:
            if (szo.endsWith("a")) { // Ha a-ra végződik -> almával
                eredmeny = szo.substr(0, l - 1) + "á";
            } else if (szo.endsWith("e")) { // Ha e-re végződik -> tevével
                eredmeny = szo.substr(0, l - 1) + "é";
            } else {
                eredmeny = szo;
            }
            eredmeny += toldalekEleje;
        } else {
            //Ha mássalhangzóval végződik:

            if (teljesHasonulas) {
                let mshFinished = false;
                for (let msh of massalhangzok) {

                    if (szo.endsWith(msh.charAt(0) + msh)) { // msh első karakterének duplázása
                        mshFinished = true; // nem kell jobban duplázni, már így is dupla van
                        eredmeny += szo;
                        break;
                    }
                }

                if (!mshFinished) {
                    for (let msh of massalhangzok) {
                        if (szo.endsWith(msh)) {
                            mshFinished = true; // Mássalhangzó duplázása
                            eredmeny += szo.substr(0, l - msh.length) + msh.charAt(0) + msh;
                            break;
                        }
                    }
                }
            } else if (!szo.endsWith(toldalekEleje.charAt(0) + toldalekEleje.charAt(0))) {
                eredmeny = szo + toldalekEleje;
            } else {
                eredmeny = szo;
            }
        }


        // A toldalék vége:

        const toldalekHangrend = this.toldalekHangrendje(szo);
        switch (toldalekHangrend) {
            case ToldalekHangrend.MAGAS:
                return [eredmeny + magasMaganhangzo + toldalekVege];
            case ToldalekHangrend.MELY:
                return [eredmeny + melyMaganhangzo + toldalekVege];
            case ToldalekHangrend.BARMELYIK:
                return [eredmeny + magasMaganhangzo + toldalekVege, eredmeny + melyMaganhangzo + toldalekVege];
        }
        throw new Error("Wtf miért nincs hangrend");


    }

    // null-t ad vissza, ha nincs benne magánhangzó
    hangrend(szo: string): Hangrend {
        szo = szo.toLowerCase();
        let vanMagas = false;
        let vanMely = false;

        for (let i = 0; i < szo.length; i++) {
            if (magas_hangrendu_betuk.indexOf(szo.charAt(i)) != -1) {
                vanMagas = true;
            } else if (mely_hangrendu_betuk.indexOf(szo.charAt(i)) != -1) {
                vanMely = true;
            }
            if (vanMagas && vanMely) return Hangrend.VEGYES;
        }

        if (vanMely) return Hangrend.MELY;
        if (vanMagas) return Hangrend.MAGAS;
        return null;
    }

    /**
     *
     * @param szo
     * @param bigA whether the "a" should be a big "A"
     * @param addWord whether to add the word to the end of the answer
     */
    az(szo: string, bigA?: boolean, addWord?: boolean) {
        let res = bigA ? "A" : "a";
        if (maganhangzok.indexOf(szo.charAt(0).toLowerCase()) != -1) {
            // magánhangzóval kezdődik
            res += "z";
        }
        if (addWord !== false) {
            res += " " + szo;
        }
        return res;
    }
}

export interface SzoMaganhangzoja {
    pos: number;
    char: string;
}