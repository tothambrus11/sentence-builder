# Universal Sentence Builder (USB)
- USB is plug and play, you only need to give the words for the sentence, and the program will generate the sentence from it. (It is not yet supported)
- Currently only Enlgish and Hungarian languages are supported, since this lib is made for the Code To Give competition.
- Nearly perfect Hungarian conjunction for these endings: -nak/-nek, -ra/-re, -val/-vel

## Hungarian-specific features
### Initializing
```typescript
import {HungarianQBuilder} from "./hungarianQBuilder";

let builder = new HungarianQBuilder();
```
### Definite article before a word
```typescript
let result = builder.az("szó", true, true); // A szó
```
Params:
- word: string
- bigA?: boolean - make the starting A uppercase (default: false)
- addWord?: boolean - whether the function should add the word to the end of the article. (default: true)

### -Val, -vel
```typescript
let result1 = builder.nakNek("Pista"); // Pistával
let result2 = builder.nakNek("menny"); // mennyel
```
### General Conjunctions
There are several conjunctions which has two forms, for example -ra/-re or -nak/-nek. These can be worked out like this:
```typescript
let result1 = builder.altalanosToldalek("kettő", "ra", "re"); // kettőre
let result2 = builder.altalanosToldalek("huszár", "ra", "re"); // huszárra
```
Notice that we should give in the high and low version of the word ending.

# Testing
```
npm run test
```
