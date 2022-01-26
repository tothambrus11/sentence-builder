import {Hangrend, HungarianQBuilder} from "../src/hungarianQBuilder";

const hungarian = new HungarianQBuilder();

describe("-val, -vel", () => {
    it("should generate the correct answers for lowercase words", () => {
        const esetekS = "Miklós-Miklóssal,Kázmér-Kázmérral,levegő-levegővel,agyag-agyaggal,kedvenc-kedvenccel,dzsumbuj-dzsumbujjal,kas-kassal,Értelmező kéziszótár-Értelmező kéziszótárral,bridzs-briddzsel";
        esetekS.split(",").map(k => k.split("-")).forEach(data => {
            expect(hungarian.valVel(data[0])).toBe(data[1]);
        })
    });
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
    })
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
        expect(hungarian.nakNek("asztal")).toBe("asztalnak");
        expect(hungarian.nakNek("ország")).toBe("országnak");
        expect(hungarian.nakNek("hosszú")).toBe("hosszúnak");
        expect(hungarian.nakNek("unalmas")).toBe("unalmasnak");
        expect(hungarian.nakNek("gyerek")).toBe("gyereknek");
        expect(hungarian.nakNek("gyümölcs")).toBe("gyümölcsnek");
        expect(hungarian.nakNek("késő")).toBe("későnek");
        expect(hungarian.nakNek("hiba")).toBe("hibának");
        expect(hungarian.nakNek("kávé")).toBe("kávénak");
        expect(hungarian.nakNek("április")).toBe("áprilisnak");
        expect(hungarian.nakNek("vidám")).toBe("vidámnak");
        expect(hungarian.nakNek("udvarias")).toBe("udvariasnak");
        expect(hungarian.nakNek("szépsál")).toBe("szépsálnak");
    })

    it("should be working for kiesés", () => {
        expect(hungarian.nakNek("finn")).toBe("finnek");
        expect(hungarian.nakNek("mann")).toBe("mannak");
    })
})

describe("-ra, -re", () => {
    it("should be working", () => {
        expect(hungarian.raRe("asztal")).toBe("asztalra");
        expect(hungarian.raRe("ország")).toBe("országra");
        expect(hungarian.raRe("hosszú")).toBe("hosszúra");
        expect(hungarian.raRe("unalmas")).toBe("unalmasra");
        expect(hungarian.raRe("gyerek")).toBe("gyerekre");
        expect(hungarian.raRe("gyümölcs")).toBe("gyümölcsre");
        expect(hungarian.raRe("késő")).toBe("későre");
        expect(hungarian.raRe("hiba")).toBe("hibára");
        expect(hungarian.raRe("kávé")).toBe("kávéra");
        expect(hungarian.raRe("április")).toBe("áprilisra");
        expect(hungarian.raRe("vidám")).toBe("vidámra");
        expect(hungarian.raRe("udvarias")).toBe("udvariasra");
        expect(hungarian.raRe("szépsál")).toBe("szépsálra");
    })

    it("should be working for kiesés", () => {
        expect(hungarian.raRe("orr")).toBe("orra");
        expect(hungarian.raRe("sasorr")).toBe("sasorra");
    })

});
