let cores = ['red', 'green', 'blue', 'yellow'];
let sequencia = [];
let' seqPlayer = [];
let contagemClicks = 0;
var jogo = () => {
    $(document).off().on("keydown", (e) => {
        if(sequencia.length == 0){
            nextSeq();
        }
    });

}


var nextSeq = () => {
    //console.log(sequencia.length);
    $("h1").text("Level " + (sequencia.length + 1));
    var randNumb = Math.floor(Math.random() * 4);
    escolhaCor(randNumb);
    console.log(sequencia);
    click();

}


var click = () => {
    let cliques=0;

    $(".btn").off().on("click", (e) => { //deixar o .off para desabilitar todos os eventos anteriores e não duplicar os cliques
        var btncor ='.' + e.target.id;
        $(btncor).addClass("pressed");
        setTimeout(() => {
            $(btncor).removeClass("pressed");
        }, 150);  
    
        console.log(cliques);
        seqPlayer.push(e.target.id);
        
        som(e.target.id);
        check(cliques);
        cliques++;
    });
}

check = (clicks) => {
    console.log(seqPlayer);
    console.log(seqPlayer[clicks],sequencia[clicks]);
    if(seqPlayer[clicks]==sequencia[clicks]){
        contagemClicks++;
        if (contagemClicks == sequencia.length) {
            nextSeq();
            contagemClicks = 0;
            resetArray(seqPlayer);
        }
    }
    else {
        console.log("false")
        $("body").addClass("game-over");
        new Audio("sounds/wrong.mp3").play();
        $("h1").html("<h2>GAME OVER</h2>");
        level = sequencia.length;
        $("h2").after("<b>Aperte qualquer tecla para Tentar Denovo</b>");
        $("b").after("</br></br><b>Voce perdeu no level </b>" + level);
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        resetArray(seqPlayer);
        resetArray(sequencia);
        contagemClicks = 0;
       jogo();

        }
}

var escolhaCor = (num) => {
    //console.log(c)
    sequencia.push(cores[num]);
    var btnescolhido = "." + cores[num];
    piscar();
}


piscar = () => {
    let i = 0;
    let time = setInterval(() => {
        let btnpis = "." + sequencia[i];
        $(btnpis).fadeOut(400).fadeIn(400);
        som(sequencia[i]);
        i++;
        if(i>=sequencia.length){
            clearInterval(time);
        }
    }, 1000);
}

var som = (key) => {
    if(typeof(key) == 'number'){
        var chosen = "sounds/" + cores[key] + ".mp3";
        var bip = new Audio(chosen);
        bip.play();
    }
    else {
        var chosen = "sounds/" + key + ".mp3";
        var bip = new Audio(chosen);
        bip.play();
    }
}

resetArray = (array) => {
    
    while (array.length) {
        array.pop();
            }
            
}

jogo();
