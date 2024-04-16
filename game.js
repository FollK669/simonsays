

var elm;
var waardebutton = 0;
var userSequenceNew = [];
var gamestarter = false;
var timing = 950;
var numbers = [];
var paragraphs = document.getElementById("pi");
var demomodus = false;
var round = 2;
var AdvancetoNxtLvl = false;
var telclick = 0;
function GameStart() {
    
    round = 2
    telclick = 0;
    userSequenceNew = [];
    numbers = [];

    gamestarter = true;
    demoMode();

}
function compareInput(inputArray) {
    // Vergelijk de invoer van de speler met de huidige reeks
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i] !== numbers[i]) {
            return false; // Als zelfs één element niet overeenkomt, return false
        }
    }
    return true; // Als alle elementen overeenkomen, return true
}



function clickMe(lbl, nums) {

    elm = document.getElementById(lbl);
    elm.addEventListener("click", alerter(lbl));


    


    if (gamestarter) {



        //checkscore();

        if (demomodus === true) {
       
            colorbuttonpicker("Deze kilk op " + lbl + " was tijdens play mode ! ", '.boven');
           


            colorbuttonpicker(nums, '.onder');
            colorbuttonpicker(lbl, '.boven');

            userSequenceNew.push(nums);

            paragraphs.textContent = userSequenceNew.join(", ");



          
                if (compareInput(userSequenceNew) === true) {


                    colorbuttonpicker("juiste kleur", '.onder');

                    telclick++;
                    round++;
                    demoMode();

                }


           
            else { colorbuttonpicker("foute kleur", '.onder'); GameStart(); } 
            






        }
        else if (demomodus === false) { 

            

            colorbuttonpicker(nums, '.onder');
            colorbuttonpicker(lbl, '.boven');


            colorbuttonpicker("Deze kilk op " + lbl + " was tijdens demo mode ! ", '.boven');

    






      


        
    }



            



        



    } else { colorbuttonpicker("game is nog niet gestart", '.boven'); }

       
}







function demoMode() {
    demomodus = false;
    telclick = 0;
    colorbuttonpicker("round :" + round + " Demo Start.")



    for (var j = 0; j < round; j++) {
        setTimeout(function () {

            var randomNumber = Math.floor(Math.random() * 4) + 1;
            numbers.push(randomNumber);

            if (randomNumber === 1) { clickMe("yellow", 1) }
            else if (randomNumber === 2) { clickMe("green",2); }
            else if (randomNumber === 3) { clickMe("blue",3); }
            else if (randomNumber === 4) { clickMe("red",4); }



            paragraphs.textContent = numbers.join(", ");
            if (numbers.length === round) {
                paragraphs.textContent = numbers.join(", ");
                document.getElementById("myButton").disabled = false;
            }
        }, timing * (j + 1));
        
    } 
    setTimeout(function () {
        colorbuttonpicker(" jou beurt !", '.boven');
        demomodus = true;


    }, timing * (j + 1));
   
}


function colorbuttonpicker(lbl, lbl2) {
    document.querySelectorAll(lbl2).forEach(function (element) {
        element.textContent = lbl;
    });
}


function alerter(keyss) {
    playSound("./sounds/" + keyss + ".mp3");
    presser();
}



//visueel press effect toevoegen en wegnemen
function presser() {
    elm.classList.add("pressed")
    setTimeout(function () {
        elm.classList.remove("pressed");
    }, 300);
}


//speelt de geluiden af
function playSound(filename) {
    var audio = new Audio(filename);
    var volumeSlider = document.getElementById('volumeSlider');
    audio.volume = volumeSlider.value;
    audio.play();
}



function toggleMute() {
    var audio = document.getElementsByTagName('audio')[0];
    var volumeSlider = document.getElementById('volumeSlider');
    var volumeIcon = document.querySelector('.volume-icon');
    if (audio.volume === 0) {
        // Unmute
        audio.volume = volumeSlider.value;
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
    } else {
        // Mute
        audio.volume = 0;
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    }
}







//zodat meerdere keren klikken niet mogelijk is, die moet nadien vervangen worden
var isFunctionExecuted = false;
function executeFunction() {
    if (!isFunctionExecuted) {
        // Disable the button to prevent multiple rapid executions
        document.getElementById("myButton").disabled = true;

        isFunctionExecuted = true;

        setTimeout(() => {
            isFunctionExecuted = false;
            // Enable the button after delay
            document.getElementById("myButton").disabled = false;
        }, 2000);
    }
}
// Koppel de executeFunction aan de klikgebeurtenis van de knop
document.getElementById("myButton").addEventListener("click", executeFunction);

















