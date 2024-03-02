// set game name

let gameName="Guess The Word";

document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created by Zaid Osama - ${new Date().getFullYear()}`

// set game options

let numberOfTries =6;
let numberOfLetters =6;
let currentTry=1;
let numberOfHints=3;

//manage words
let wordToGuess="";

const words=["create","appear","Purple","Banana","Window","Rocket","Dragon","Circle","Toggle","Method","Laptop","Shadow","camera","potato","market",
"Turtle","magnet","Silver","basket","square","spirit","planet","winter","doctor","memory","folder","palace","marvel","outlet","purble",
"search","update","delete","branch","school","Impact","Tunnel","Turtle","Lizard","Flower"];
wordToGuess=words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();
// console.log(wordToGuess);
let messageArea=document.querySelector(".message");


//Manage Hints
document.querySelector(".hint span").innerHTML=numberOfHints;
const gitHintButton=document.querySelector(".hint");
gitHintButton.addEventListener("click",getHint);

function generateInputs(){

    const inputsContainer = document.querySelector(".inputs");

    //create Main Try Div
    for(let i=1 ;i<=numberOfTries ;i++){
        const tryDiv =document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try-${i}</span>`;

        if(i !==1){
            tryDiv.classList.add("disabled-input");
        }
        //create input fields
        for(let j=1;j<=numberOfLetters;j++){
            const input=document.createElement("input");
            input.type="text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);

        }

        inputsContainer.appendChild(tryDiv);


    }

    inputsContainer.children[0].children[1].focus();

    //disabled all inputs except the first one
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");

    inputsInDisabledDiv.forEach( (input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input,index)=>{
        //convert input to upper case
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            // console.log(index);
           
            const nextInput = inputs[index + 1];
            if(nextInput)
            nextInput.focus();


        });


        input.addEventListener("keydown",function(event){
           
                // console.log(event);
                const currentIndex= Array.from(inputs).indexOf(this);//or event.target
                // console.log(currentIndex);
                if(event.key === "ArrowRight"){
                    const nextInput= currentIndex + 1;
                    if(nextInput < inputs.length)
                        inputs[nextInput].focus();
                }
                else if(event.key === "ArrowLeft"){
                    const prevInput= currentIndex - 1;
                    if(prevInput >= 0)
                        inputs[prevInput].focus();
                }
                

        });
    });

    



}


const guessButton = document.querySelector(".check");

console.log(wordToGuess);
function handleGuesses(){
let succesGuess = true;
for(let i=1 ;i<=numberOfLetters;i++){
const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
const letter=inputField.value.toLowerCase();
const actualLetter= wordToGuess[i-1];


//Game Logic
    if(letter === actualLetter){
        //letter is correct and in place
        inputField.classList.add("yes-in-place");

        
    }
    else if(wordToGuess.includes(letter)  && letter!==""){
        //letter is correct and not in place
        inputField.classList.add("not-in-place")
        succesGuess=false;
    }
    else{
        inputField.classList.add("no")
        succesGuess=false;
    }

}

//check if user win or lose
if(succesGuess === true){

    messageArea.innerHTML =`Congratulations!! You won   word is ${wordToGuess}`;
   
    //disable all inputs(add disable class on all try divs)
    let allTries=document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv)=> tryDiv.classList.add("disabled-input"));

    //disable guess button
    guessButton.disabled=true;
    gitHintButton.disabled=true;

}
else{

   
document.querySelector(`.try-${currentTry}`).classList.add("disabled-input");

const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
currentTryInputs.forEach((input)=>input.disabled=true);

currentTry++;

const nextTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
nextTryInputs.forEach((input)=>(input.disabled=false));


let el=document.querySelector(`.try-${currentTry}`);

    if(el){
        document.querySelector(`.try-${currentTry}`).classList.remove("disabled-input");
        el.children[1].focus();

    }
    else{

        guessButton.disabled=true;
        gitHintButton.disabled=true;
        messageArea.innerHTML =`Game Over!!! word is ${wordToGuess}`;

    }

}

}

guessButton.addEventListener("click",handleGuesses)



function getHint(){

if(numberOfHints > 0){
    numberOfHints--;
    document.querySelector(".hint span").innerHTML=numberOfHints;
}

 if(numberOfHints === 0){

    gitHintButton.disabled=true;
}

const enabledInputs= document.querySelectorAll("input:not([disabled])");
// console.log(enabledInputs);
const emptyEnabledInputs=Array.from(enabledInputs).filter((input)=>input.value==="");
// console.log(emptyEnabledInputs);

if(emptyEnabledInputs.length > 0){
    const randomIndex= Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput=emptyEnabledInputs[randomIndex];
    const indexToFill=Array.from(enabledInputs).indexOf(randomInput);
    
    if(indexToFill !== -1){
        randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
}
}

function handleBackSpace(event){

    // console.log(currentIndex);
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])")
        const currentIndex= Array.from(inputs).indexOf(document.activeElement);//or event.target
        console.log(currentIndex);
        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const prevInput= inputs[currentIndex - 1];
            currentInput.value="";
            prevInput.value="";
            prevInput.focus();

        }
       
    }


}

document.addEventListener("keydown",handleBackSpace);
window.onload= function(){
    generateInputs();
};