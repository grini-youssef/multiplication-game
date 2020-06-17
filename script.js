$(document).ready(function () {
    $(".resultQuestion").text("Click on Play for start ");
    $(".currentQuestion").text("");
    $(".resultQuestion").css({"color": "red"});

    //number the current question
    var n;
    //count number the question correct
    var a;
    //count number the question error
    var b;
    //resolve the probleme the two answer incorrect in same question
    var confusion2;
    //resolve the probleme the answer after answer incorrect
    var confusion;
    //function for wait between two question
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
    //function for generate quesion and their answer randomly
    function generateQuestion(){
        if(n<=10){
        confusion=false;
        confusion2=false;
        $(".resultQuestion").text("");
        $("#answers button").css("background-color", "#fff");
        $("#question, #answers, .currentQuestion").show();
        var x = Math.floor((Math.random() * 10) + 1);
        var y = Math.floor((Math.random() * 10) + 1);
        correctAnswer = x*y;
        var errorAnswer1 = (x)*(y+1) ;
        var errorAnswer2 = (x+1)*(y) ;
        var errorAnswer3 = errorAnswer1 + 3 ;
        var tab = [1, 2, 3, 4];

        //reordre the table
        for (var i = tab.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = tab[i];
            tab[i] = tab[j];
            tab[j] = temp;
        }
        console.log(tab);

        $("#question").text(x+" x "+y+" = ?");

        $("#button"+tab[0]).text(correctAnswer);
        $("#button"+tab[1]).text(errorAnswer1);
        $("#button"+tab[2]).text(errorAnswer2);
        $("#button"+tab[3]).text(errorAnswer3);

        //current answer
        $(".currentQuestion").text("question "+ n +" of 10");
        n++;
        }
        else{
            $(".resultQuestion").css({"color": "white","font-size": "16px"});
            $(".resultQuestion").html("");
            $(".resultQuestion").html("<p style='font-size: 19px';>The quiz is finish, your resume is :<p style='color: green';>correct answer : "+a+"</p> <p style='color: red';> error answer : "+b+"</p><p style='color: blue';> Your result is :"+a+"/"+"10 </p>");
            $("#question, #answers, .currentQuestion").hide();
            $(".play").removeAttr("disabled");
        }
    }

    //click on buttton play for start 
    $(".play").click(function() {
        $(this).attr("disabled","disabled");
        n=1;
        a=0;
        b=0;
        generateQuestion();
    });

    //WHEN CLICK on answer button
    $("#answers button").click(async function () { 
        var answer = $(this).html();
        if(answer == correctAnswer){
            if(confusion==false){
                //count number the question correct
                console.log(a);
                a++;
                console.log(a);
            }
            $(this).css("background-color", "rgb(34, 180, 4)");
            $(".resultQuestion").css("color", "green");
            $(".resultQuestion").text("Bravo! your answer is correct ");
            await sleep(1000);
            $(this).css("background-color", "#fff");
            generateQuestion();

        }
        else{
            if(confusion2==false){
                b++;
                confusion2=true;
            }
            confusion=true;
            $(".resultQuestion").text("oups! your answer is incorrect ");
            $(".resultQuestion").css("color", "red");
            $(this).css("background-color", "rgb(250, 34, 4)");
        }
        
    });

});
