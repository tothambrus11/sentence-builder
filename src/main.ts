export interface IQuestionBuilder {
    howMuchSomethingIsInSomething(thing: string, inWhat: string): string;

    isSomethingSomethingProperty(thing: string, property: string): string;
}
