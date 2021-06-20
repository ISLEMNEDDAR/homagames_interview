var fs = require('fs');
const readline = require("readline");
const myArgs = process.argv.slice(2);

class Workfinder{
    listWord = []
    async wordFinder(file) {
        const fileStream = fs.createReadStream(file);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            this.listWord.push(line)
        }
    }

    longestWord (text){
        const occurentL = this.getAllOccuenreceCaractere(text)
        const listWordSorted = this.listWord.filter(a => a.length<=12).sort((a,b) =>  b.length - a.length);
        for(let i =0;i<listWordSorted.length;i++){
            const currentWord = listWordSorted[i]
            let j = 0;
            let currentCaractere = currentWord[0]
            let occurenceCaractereinText = occurentL[currentCaractere]
            while( occurenceCaractereinText !== undefined){
                const occurenceCurrentCaractere = this.getOccurenceOneCaractere(currentWord,currentCaractere);
                if(occurenceCurrentCaractere > occurenceCaractereinText) break
                j+=1
                if(j===currentWord.length){
                    return currentWord
                }
                currentCaractere = currentWord[j]
                occurenceCaractereinText = occurentL[currentCaractere]
            }
        }
    }

    getAllOccuenreceCaractere(text){
        let obj = {}
        for(let i = 0; i<text.length;i++){
            obj[text[i]] = this.getOccurenceOneCaractere(text,text[i]);
        }
        return obj
    }

    getOccurenceOneCaractere(text,caractere){
        const regExCharacter = new RegExp(caractere,"g");
        return (text.match(regExCharacter || []).length)
    }
}

const wordFinder = new Workfinder()

wordFinder.wordFinder(myArgs[0]).then(data => {
    console.log(wordFinder.longestWord(myArgs[1]))
})
