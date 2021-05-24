import {IQuestionBuilder} from "./main";

const maganhangzok = ["a", "á", "e", "é", "i", "í", "o", "ó", "ö", "ő", "u", "ú", "ü", "ű"];
const magas_hangrendu_betuk = ["e", "é", "i", "í", "ö", "ő", "ü", "ű"];
const mely_hangrendu_betuk = ["a", "á", "o", "ó", "u", "ú"];

export enum Hangrend {
    MELY,
    MAGAS,
    VEGYES
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

    valVel(szo: string) {
        let eredmeny = "";

        if (maganhangzok.indexOf(szo.substr(-1, 1)) != -1) { //Ha magánhangzóval végződik:
            if (szo.endsWith("a")) { //Ha a-ra végződik:
                eredmeny += (szo.substr(0, szo.length - 1) + "ával");
            } else if (szo.endsWith("e")) { //Ha e-re végződik:
                eredmeny += (szo.substr(0, szo.length - 1) + "ével");
            } else {
                if (this.hangrend(szo) == Hangrend.MELY) { //Ha mély hangrendű:
                    eredmeny += (szo + "val");
                } else if (this.hangrend(szo) == Hangrend.MAGAS) { //Ha magas hangrendű:
                    eredmeny += (szo + "vel");
                } else if (this.hangrend(szo) == Hangrend.VEGYES) { //Ha vegyes hangrendű:
                    eredmeny += (szo + "val");
                }
            }
        } else {
            //Ha mássalhangzóval végződik:

            //A toldalék eleje:
            //Többjegyű mássalhangzó esetén:

            let l = szo.length;
            if (szo.endsWith("gy")) {
                eredmeny += szo.substr(0, l - 2) + "ggy";
            } else if (szo.endsWith("sz")) {
                eredmeny += szo.substr(0, l - 2) + "ssz";
            } else if (szo.endsWith("dz")) {
                eredmeny += szo.substr(0, l - 2) + "ddz";
            } else if (szo.endsWith("zs")) {
                eredmeny += szo.substr(0, l - 2) + "zzs";
            } else if (szo.endsWith("ly")) {
                eredmeny += szo.substr(0, l - 2) + "lly";
            } else if (szo.endsWith("cs")) {
                eredmeny += szo.substr(0, l - 2) + "ccs";
            } else if (szo.endsWith("ny")) {
                eredmeny += szo.substr(0, l - 2) + "nny";
            } else if (szo.endsWith("ty")) {
                eredmeny += szo.substr(0, l - 2) + "tty";
            }
            //dupla mássalhangzó esetén::
            else if (szo.substr(l - 2, 1) == szo.substr(l - 1, 1)) {
                eredmeny += szo;
            }
            //Egyjegyű mássalhangzó esetén:
            else {
                eredmeny += szo + szo.substr(-1, 1);
            }

            //A toldalék vége:
            if (this.hangrend(szo) == Hangrend.MAGAS) { //Ha magas hangrendű:
                eredmeny += "el";
            } else if (this.hangrend(szo) == Hangrend.MELY) { //Ha mély hangrendű:
                eredmeny += "al";
            } else if (this.hangrend(szo) == Hangrend.VEGYES) { //Ha vegyes hangrendű:
                eredmeny += "al";
            }
        }

        return eredmeny;
    }

    nakNek(szo: string): string {
        return this.altalanosToldalek(szo, "nak", "nek");
    }

    raRe(szo:string){
        return this.altalanosToldalek(szo, "ra", "re");
    }

    altalanosToldalek(szo: string, melyToldalek: string, magasToldalek: string) {
        if (szo.endsWith("e")) szo = szo.slice(0, -1) + "é"; // rege -> regének
        else if (szo.endsWith("a")) szo = szo.slice(0, -1) + "á"; // Pista -> Pistának
        else if(szo.endsWith(melyToldalek.charAt(0) + melyToldalek.charAt(0))) szo = szo.slice(0,-1); // orr + ra -> orra

        switch (this.hangrend(szo)) {
            case Hangrend.MELY:
            case Hangrend.VEGYES: // Vegyesél a legtöbb esetben a mély is jó.
                return szo + melyToldalek;
            case Hangrend.MAGAS:
                return szo + magasToldalek;
        }
    }

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
        throw new Error("Nem lehet toldalékolni, mert nincs benne egy magánhangzó sem.")
    }

    /**
     *
     * @param szo
     * @param bigA whether the 'a' should be a big 'A'
     * @param addWord whether to add the word to the end of the answer
     */
    az(szo: string, bigA?: boolean, addWord?: boolean) {
        let res = bigA ? "A" : 'a';
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
