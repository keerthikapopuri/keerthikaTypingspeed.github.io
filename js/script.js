const typingtext=document.querySelector(".typing-test p"), inpfield=document.querySelector(" .wrapper .input-feild");
const mistaketag=document.querySelector(".mistake span");
const timetag=document.querySelector(".time span b");
const wpmtag=document.querySelector(".wpm span ");
const cpmtag=document.querySelector(".cpm span b");
const highest=document.querySelector(" .highestscore span");
const timeup=document.querySelector(" .timeup span b");
tryagain=document.querySelector("button");
let wpm;
let charindex=mistakes=0;
let timer,
maxtime=60,istyping=0,
timeleft=maxtime;
function randomParagraph()
{
    let randindex=Math.floor(Math.random()*paragraphs.length);
    typingtext.innerHTML = "";
    paragraphs[randindex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingtext.innerHTML += span;
    });
    // focusing input feild on keydown
    typingtext.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => inpfield.focus());
    document.addEventListener("click",() => inpfield.focus());
}
function initTyping(){
    const characters = typingtext.querySelectorAll("span");
    let typedchar=inpfield.value.split("")[charindex];
    if(!istyping) {
        timer = setInterval(inittimer, 1000);
        istyping = true;
    }
    if(charindex<characters.length-1 && timeleft>0){
        if(typedchar==null){
            charindex--;
            if(characters[charindex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charindex].classList.remove("correct","wrong");
    
        }
        else{
           
       // console.log(characters[0]);
       if(characters[charindex].innerText=== typedchar){
        //console.log(characters[charindex].innerText,typedchar);
        characters[charindex].classList.add("correct");
       }
       else{
        mistakes++;
        console.log(characters[charindex].innerText,typedchar);
        characters[charindex].classList.add("wrong");
       }
       charindex++;
        }
        
       characters.forEach(span => span.classList.remove("active"));
       characters[charindex].classList.add("active");
       mistaketag.innerText=mistakes;
            cpmtag.innerText=charindex-mistakes;
    }
    else{
        inpfield.value="";
        clearTimer(timer);
    }
   
    
  
  //wpmtag.innerText=charindex;
}
function inittimer(){
    if(timeleft >0){
        timeleft--;
        timetag.innerText=timeleft;
        console.log(timeleft);
        wpm = Math.round(((charindex - mistakes)  / 5) / (maxtime - timeleft) * 60);
        wpmtag.innerText = wpm;
    }
    else{
        timeup.innerHTML="Time up. Check the score now.";
        clearInterval(timer);
    }
}
function resetgame(){
    highest.innerText=wpm;
    randomParagraph();
    timeup.innerHTML="";
    inpfield.value="";
        clearTimer(timer);
    timeleft=maxtime,charindex=mistakes=istyping=0;
    timetag.innerText=timeleft;
    mistaketag.innerText=mistakes;
    wpmtag.innerText=0;
    cpmtag.innerText=0;
}
randomParagraph();
inpfield.addEventListener("input",initTyping);
tryagain.addEventListener("click",resetgame);
