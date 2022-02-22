function translate(st) {
    let translated = ""

    let lines = st.split(/\r?\n/)

    for (let i=0; i<lines.length; i++ ) {
        let line = lines[i]
        line = line.trimStart()
        line = line.toLowerCase()

        let words = line.split(" ")

        // Fixing logic
        line = line.replaceAll(" mod ", " % ")
        line = line.replaceAll("tostring", "toString")
        line = line.replaceAll("math.floor", "Math.floor")
        
        // if (words.indexOf("div") != -1) {
        //     console.log("found div")
        //     let bigger = parseInt(words[words.indexOf("div") - 1])
        //     let smaller = parseInt(words[words.indexOf("div") + 1])

        //     let expression = words.slice(words.indexOf("div") - 1, words.indexOf("div") + 2)
        //     let exp = ""
        //     for (let q=0; q<expression.length;q++) {
        //         exp = exp+" "+expression[q]
        //     }
        //     exp = exp.trimStart()
        //     exp = exp.trimEnd()

        //     let js = "Math.floor("+bigger+"/"+smaller+")"
        //     translated = translated+line.replaceAll(exp, js)+"\n"
        // }

        // Checking for IF statements
        if (line.startsWith("if not")) {
            // ...
            line = line.replaceAll("if not ", "")
            line = line.replaceAll("then", "")
            line = line.replaceAll("=", "==")
            line = line.replaceAll(" and ", "&&")
            line = line.replaceAll(" or ", "||")
            
            let js = "if (!("+line+")) {"
            translated = translated+js+"\n"
        } else if (line.startsWith("if")) {
            // ...
            line = line.replaceAll("if ", "")
            line = line.replaceAll("then", "")
            line = line.replaceAll("=", "==")
            line = line.replaceAll(" and ", "&&")
            line = line.replaceAll(" or ", "||")

            let js = "if ("+line+") {"
            translated = translated+js+"\n"
        } else if (line.startsWith("else if")) {
            // ...
            line = line.replaceAll("else if ", "")
            line = line.replaceAll("then", "")
            line = line.replaceAll("=", "==")
            line = line.replaceAll(" and ", "&&")
            line = line.replaceAll(" or ", "||")

            let js = "} else if ("+line+") {"
            translated = translated+js+"\n"
        } else if (line.startsWith("else")) {
            // ...

            let js = "} else {"
            translated = translated+js+"\n"
        }

        // Checking for loops
        else if (line.startsWith("loop while")) {
            // ...
            line = line.replaceAll("loop while ","")
            line = line.replaceAll("=", "==")
            line = line.replaceAll(" and ", "&&")
            line = line.replaceAll(" or ", "||")

            let js = "while ("+line+") {"
            translated = translated+js+"\n"
        } else if (line.startsWith("loop until")) {
            // ...
            line = line.replaceAll("loop until ","")
            line = line.replaceAll("=", "==")
            line = line.replaceAll(" and ", "&&")
            line = line.replaceAll(" or ", "||")

            let js = "while !("+line+") {"
            translated = translated+js+"\n"
        } else if (line.startsWith("loop")) {
            // Any other loop
            
            let v = words[1]
            let js = "for (let "+v+"="+words[3]+"; "+v+"<"+(words[5])+"+1; "+v+"++ ) {"
            translated = translated+js+"\n"
            
        }
        
        // Checking for other keywords
        else if (line.startsWith("output")) {
            // ...
            line = line.replaceAll("output", "")
            line = line.trimStart()

            let js = "jsdfksdj.push("+line+")"
            translated = translated+js+"\n"
        } else if (line.startsWith("end")) {
            // ...
            let js = "}"
            translated = translated+js+"\n"
        } else if (line.startsWith("method")) {
            // ...
            line = line.replaceAll("then", "")
            line = line.replaceAll("method", "function")
            translated = translated+line+"{\n"
        } else if (line.startsWith("function")) {
            line = line.replaceAll("then", "")
            translated = translated+line+"{\n"
        } else {
            translated = translated+line+"\n" 
        }
    }

    return(translated)
}
export default translate

    // break into specific lines
    // find specific structure

    // CONDITIONALS
    // if case = ... then
    //      ....
    // end if

    // LOOPING
    // NUM = [1, 2, 3, 4, 5, 6]
    // loop I from 0 to 99
    //      OUTPUT("Num ", NUM[I])
    // end loop

    // LOOPING THROUGH COLLECTIONS
    // collection = Collection()
    // collection.resetNext()
    // loop while collect.hasNext()
    //     el = collection.getNext()
    //     collection.addItem("Hello")
    //     bool = collection.isEmpty()
    //     length = collection.length()
    // end loop

    // STACKS
    // push(), pop(), isEmpty()

    // QUEUES
    // enqueue(), dequeue(), isEmpty()

    // DIV and MOD
    // 3 div 2
    // 3 mod 2

    // OTHER LOOPS
    // loop until ...
    // loop while ...

    // Data type transformation
    // int(...)
    // str(...)