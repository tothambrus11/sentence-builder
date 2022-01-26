import {HungarianQBuilder} from "./hungarianQBuilder";

export interface IQuestionBuilder {
    howMuchSomethingIsInSomething(thing: string, inWhat: string): string;

    isSomethingSomethingProperty(thing: string, property: string): string;
}
let qBuilder = new HungarianQBuilder();

console.log(qBuilder.valVel("híd"));