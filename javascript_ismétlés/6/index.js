function Play(){
    var firstPlayerMove = parseInt(document.getElementById("firstPlayerNumber").value);
    var secondPlayerMove = parseInt(document.getElementById("secondPlayerNumber").value);

    document.getElementById("winner").innerHTML = `${CheckWinner(firstPlayerMove, secondPlayerMove)}`;

    /*
        1 => scissors
        2 => paper
        3 => rock
    */

    function CheckWinner(firstPlayerMove, secondPlayerMove){
        if(firstPlayerMove == 1 && secondPlayerMove == 2){
            return "The first player wins"
        }
        else if(firstPlayerMove == 1 && secondPlayerMove == 3){
            return "The second player wins";
        }
        else if(firstPlayerMove == 1 && secondPlayerMove == 1){
            return "The game is a tie";
        }
        else if(firstPlayerMove == 2 && secondPlayerMove == 1){
            return "The second player wins";
        }
        else if(firstPlayerMove == 2 && secondPlayerMove == 3){
            return "The first player wins";
        }
        else if(firstPlayerMove == 2 && secondPlayerMove == 2){
            return "The game is a tie";
        }
        else if(firstPlayerMove == 3 && secondPlayerMove == 1){
            return "The first player wins";
        }
        else if(firstPlayerMove == 3 && secondPlayerMove == 2){
            return "The second player wins";
        }
        else if(firstPlayerMove == 3 && secondPlayerMove == 3){
            return "The game is a tie";
        }
        else{
            return "No such move"
        }
    }
}