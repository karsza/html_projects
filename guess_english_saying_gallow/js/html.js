const arrayOfSentences = ['EAST OR WEST HOME IS BEST', 'FRIEND IN NEED IS A FRIEND INDEED', 'PRACTICE MAKES PERFECT',
    'LOVE IS BLIND', 'EASY COME EASY GO', 'WHERE THERE IS A WILL THERE IS A WAY', 'BETTER LATE THAN NEVER',
    'TIME IS MONEY', 'EASIER SAID THAN DONE', 'ALL IS WELL THAT ENDS WELL', 'A FRIEND TO ALL IS A FRIEND TO NONE',
    'ALL ROADS LEAD TO ROME'
];

function chooseRandomSentence() {
    var position = Math.floor(Math.random() * arrayOfSentences.length);
    return position;
}
var password = arrayOfSentences[chooseRandomSentence()];

var password1 = "";
var length = password.length;
var zonkCounter = 0;

for (i = 0; i < length; i++) {
    if (password.charAt(i) == " ") password1 = password1 + " ";
    else password1 = password1 + "-";
}

function showPassword() {
    document.getElementById("field").innerHTML = password1;
};
window.onload = function() {
    showPassword();
    start();
}
var letters = new Array(35);
letters[0] = "A";
letters[1] = "B";
letters[2] = "C";
letters[3] = "D";
letters[4] = "E";
letters[5] = "F";
letters[6] = "G";
letters[7] = "H";
letters[8] = "I";
letters[9] = "J";
letters[10] = "K";
letters[11] = "L";
letters[12] = "M";
letters[13] = "N";
letters[14] = "O";
letters[15] = "P";
letters[16] = "Q";
letters[17] = "R";
letters[18] = "S";
letters[19] = "T";
letters[20] = "U";
letters[21] = "V";
letters[22] = "W";
letters[23] = "X";
letters[24] = "Y";
letters[25] = "Z";

function start() {

    var divInsides = "";
    for (i = 0; i <= 25; i++) {
        var element = "letter" + i;
        divInsides = divInsides + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 5 == 0) divInsides = divInsides + '<div style="clear:both;"></div>'
    }

    document.getElementById("alphabet").innerHTML = divInsides;

    showPassword();
};
String.prototype.replaceLetter = function(place, symbol) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + symbol + this.substr(place + 1);
}

function check(no) {
    var bingo = false;

    for (i = 0; i < length; i++) {
        if (password.charAt(i) == letters[no]) {
            password1 = password1.replaceLetter(i, letters[no]);
            bingo = true;
        }
    }
    if (bingo == true) {
        var element = "letter" + no;
        document.getElementById(element).style.background = "#003300";
        document.getElementById(element).style.color = "#00c000";
        document.getElementById(element).style.border = "3px solid #003300";
        document.getElementById(element).style.cursor = "default";

        showPassword();
    } else {
        var element = "letter" + no;
        document.getElementById(element).style.background = "#330000";
        document.getElementById(element).style.color = "#c00000";
        document.getElementById(element).style.border = "3px solid #c00000";
        document.getElementById(element).style.cursor = "default";

        document.getElementById(element).setAttribute("onclick", ";");
        zonkCounter++;

        var picture = "img/s" + zonkCounter + ".jpg";

        document.getElementById("gallows").innerHTML = '<img src="' + picture + '" alt="" />';

    }
    if (password == password1) {
        document.getElementById("alphabet").innerHTML = "BRAVO!! " + password +
            '<br/><br/><span class = "reset" onclick ="location.reload()">PLAY AGAIN?</span>';
    }
    if (zonkCounter >= 9) {
        document.getElementById("alphabet").innerHTML = "YOU LOST! " + password +
            '<br/><br/><span class = "reset" onclick ="location.reload()">PLAY AGAIN?</span>';
    }
}