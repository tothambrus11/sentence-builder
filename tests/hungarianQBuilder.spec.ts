import {Hangrend, HungarianQBuilder} from "../src/hungarianQBuilder";

const hungarian = new HungarianQBuilder();

describe("-val, -vel", () => {
    it("should generate the correct answers for lowercase words", () => {
        const esetekS = "Miklós-Miklóssal,alma-almával,kesztyű-kesztyűvel,eke-ekével,ági-ágival,Kázmér-Kázmérral,levegő-levegővel,agyag-agyaggal,kedvenc-kedvenccel,dzsumbuj-dzsumbujjal,kas-kassal,jasz-jasszal,Értelmező kéziszótár-Értelmező kéziszótárral,bridzs-briddzsel,vicc-viccel,könny-könnyel,rossz-rosszal,férfi-férfival,sír-sírral,cél-céllal,balett-balettel,balett-balettal,póker-pókerrel,póker-pókerral,kráter-kráterrel,kráter-kráterral,hotel-hotellel,hotel-hotellal,tróger-trógerrel,tróger-trógerral,kevlár-kevlárral,lekvár-lekvárral,tea-teával,sofőr-sofőrrel,szuverén-szuverénnel,alélt-alélttal,hari-harival,audi-audival,ametiszt-ametiszttel,andezit-andezittel,röplabda-röplabdával,keksz-keksszel";

        let resultS = "";
        esetekS.split(",").map(k => k.split("-")).forEach(data => {
            resultS += data[0] + " \t-> ";
            resultS += hungarian.valVel(data[0]).join(', ') + "\n";
            expect(hungarian.valVel(data[0])).toContain(data[1]);
        })

        console.log(resultS);
    });


    it("shouldn't generate bad results", ()=>{
        const rosszEsetek = "andezit-andezittal,szuverén-szuverénnal,sín-sínnal,bádog-bádoggel";
        rosszEsetek.split(",").map(k => k.split("-")).forEach(data => {
            expect(!hungarian.valVel(data[0]).includes(data[1])).toBeTruthy();
        });
    })
})

describe("hangrend", () => {
    const mely = ["asztal", "ország", "hosszú", "unalmas", "olcsó"];
    const magas = ["gyerek", "gyümölcs", "csípni", "késő"];
    const vegyes = ["hiba", "kávé", "április", "vidám", "udvarias", "sétál"];

    it("should give the correct hangrend of the test cases", () => {
        mely.forEach(sz => expect(Hangrend[hungarian.hangrend(sz)]).toBe(Hangrend[Hangrend.MELY]));
        magas.forEach(sz => expect(Hangrend[hungarian.hangrend(sz)]).toBe(Hangrend[Hangrend.MAGAS]));
        vegyes.forEach(szo => expect(Hangrend[hungarian.hangrend(szo)]).toBe(Hangrend[Hangrend.VEGYES]));
    })

    it("should be correct for uppercase letters", () => {
        mely.forEach(sz => expect(Hangrend[hungarian.hangrend(sz.toUpperCase())]).toBe(Hangrend[Hangrend.MELY]));
        magas.forEach(sz => expect(Hangrend[hungarian.hangrend(sz.toUpperCase())]).toBe(Hangrend[Hangrend.MAGAS]));
        vegyes.forEach(szo => expect(Hangrend[hungarian.hangrend(szo.toUpperCase())]).toBe(Hangrend[Hangrend.VEGYES]));
    });
})

describe("az", () => {
    it("should be correct for magánhangzós", () => {
        expect(hungarian.az("alumínium")).toBe("az alumínium")
        expect(hungarian.az("árvíz")).toBe("az árvíz")
        expect(hungarian.az("elefánt")).toBe("az elefánt")
        expect(hungarian.az("élet")).toBe("az élet")
        expect(hungarian.az("ital")).toBe("az ital")
        expect(hungarian.az("oltás")).toBe("az oltás")
        expect(hungarian.az("óra")).toBe("az óra")
        expect(hungarian.az("öleb")).toBe("az öleb")
        expect(hungarian.az("őrség")).toBe("az őrség")
        expect(hungarian.az("ugatás")).toBe("az ugatás")
        expect(hungarian.az("úr")).toBe("az úr")
        expect(hungarian.az("ütő")).toBe("az ütő")
        expect(hungarian.az("űrhajó")).toBe("az űrhajó")
    })

    it("should be correct for mássalhangzós", () => {
        expect(hungarian.az("keksz")).toBe("a keksz");
        expect(hungarian.az("láb")).toBe("a láb");
        expect(hungarian.az("baba")).toBe("a baba");
        expect(hungarian.az("retek")).toBe("a retek");
    })

    it("should be correct for uppercase cases", () => {
        expect(hungarian.az("Alumínium")).toBe("az Alumínium")
        expect(hungarian.az("Árvíz")).toBe("az Árvíz")
        expect(hungarian.az("Elefánt")).toBe("az Elefánt")
        expect(hungarian.az("Élet")).toBe("az Élet")
        expect(hungarian.az("Ital")).toBe("az Ital")
        expect(hungarian.az("Oltás")).toBe("az Oltás")
        expect(hungarian.az("Óra")).toBe("az Óra")
        expect(hungarian.az("Öleb")).toBe("az Öleb")
        expect(hungarian.az("Őrség")).toBe("az Őrség")
        expect(hungarian.az("Ugatás")).toBe("az Ugatás")
        expect(hungarian.az("Úr")).toBe("az Úr")
        expect(hungarian.az("Ütő")).toBe("az Ütő")
        expect(hungarian.az("Űrhajó")).toBe("az Űrhajó")
    })

    it("should not include the word when passing false to the end of the function", () => {
        expect(hungarian.az("keksz", false, false)).toBe("a");
        expect(hungarian.az("láb", false, false)).toBe("a");
        expect(hungarian.az("baba", false, false)).toBe("a");
        expect(hungarian.az("üresség", false, false)).toBe("az");
    })

    it("should generate output correctly with big A", () => {
        expect(hungarian.az("keksz", true, false)).toBe("A");
        expect(hungarian.az("láb", true, false)).toBe("A");
        expect(hungarian.az("baba", true, false)).toBe("A");
        expect(hungarian.az("üresség", true, false)).toBe("Az");
    })
})

describe("-nak, -nek", () => {
    it("should be working", () => {
        expect(hungarian.nakNek("asztal")).toStrictEqual(["asztalnak"]);
        expect(hungarian.nakNek("ország")).toStrictEqual(["országnak"]);
        expect(hungarian.nakNek("hosszú")).toStrictEqual(["hosszúnak"]);
        expect(hungarian.nakNek("unalmas")).toStrictEqual(["unalmasnak"]);
        expect(hungarian.nakNek("gyerek")).toStrictEqual(["gyereknek"]);
        expect(hungarian.nakNek("gyümölcs")).toStrictEqual(["gyümölcsnek"]);
        expect(hungarian.nakNek("késő")).toStrictEqual(["későnek"]);
        expect(hungarian.nakNek("hiba")).toStrictEqual(["hibának"]);
        expect(hungarian.nakNek("kávé")).toStrictEqual(["kávénak"]);
        expect(hungarian.nakNek("április")).toStrictEqual(["áprilisnak"]);
        expect(hungarian.nakNek("vidám")).toStrictEqual(["vidámnak"]);
        expect(hungarian.nakNek("udvarias")).toStrictEqual(["udvariasnak"]);
        expect(hungarian.nakNek("szépsál")).toStrictEqual(["szépsálnak"]);
    })

    it("should be working for kiesés", () => {
        expect(hungarian.nakNek("finn")).toStrictEqual(["finnek"]);
        expect(hungarian.nakNek("mann")).toStrictEqual(["mannak"]);
    })
})

describe("-ra, -re", () => {
    it("should be working", () => {
        expect(hungarian.raRe("asztal")).toStrictEqual(["asztalra"]);
        expect(hungarian.raRe("ország")).toStrictEqual(["országra"]);
        expect(hungarian.raRe("hosszú")).toStrictEqual(["hosszúra"]);
        expect(hungarian.raRe("unalmas")).toStrictEqual(["unalmasra"]);
        expect(hungarian.raRe("gyerek")).toStrictEqual(["gyerekre"]);
        expect(hungarian.raRe("gyümölcs")).toStrictEqual(["gyümölcsre"]);
        expect(hungarian.raRe("késő")).toStrictEqual(["későre"]);
        expect(hungarian.raRe("hiba")).toStrictEqual(["hibára"]);
        expect(hungarian.raRe("kávé")).toStrictEqual(["kávéra"]);
        expect(hungarian.raRe("április")).toStrictEqual(["áprilisra"]);
        expect(hungarian.raRe("vidám")).toStrictEqual(["vidámra"]);
        expect(hungarian.raRe("udvarias")).toStrictEqual(["udvariasra"]);
        expect(hungarian.raRe("szépsál")).toStrictEqual(["szépsálra"]);
    })

    it("should be working for kiesés", () => {
        expect(hungarian.raRe("orr")).toStrictEqual(["orra"]);
        expect(hungarian.raRe("sasorr")).toStrictEqual(["sasorra"]);
    })

});
