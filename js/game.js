if (Meteor.is_client) {
  
  // helper functions
  Template.game.show_game = function(){
    return Session.get('game_id') != null
  }

  Template.game.rounds = function(){
    var game = current_game();
    if(game) {
      var rounds = _.filter(game.rounds, function(r){return (r.p1 != null) && (r.p2 != null)})
      return rounds;
    }
  }
  
  // determine what the players recently played
  Template.game.p_rock = function(){
    var round = current_round();
    var player = player_num()
    return round_move(round, player, 'rock');
  }

  Template.game.p_paper = function(){
    var round = current_round();
    var player = player_num()
    return round_move(round, player, 'paper');
  }

  Template.game.p_scissors = function(){
    var round = current_round();
    var player = player_num()
    return round_move(round, player, 'scissors');
  }

  Template.game.p1_rock = function(move){
    var round = previous_round();
    return round_move(round, 'p1', 'rock');
  }

  Template.game.p1_paper = function(move){
    var round = previous_round();
    return round_move(round, 'p1', 'paper');
  }

  Template.game.p1_scissors = function(move){
    var round = previous_round();
    return round_move(round, 'p1', 'scissors');
  }

  Template.game.p2_rock = function(move){
    var round = previous_round();
    return round_move(round, 'p2', 'rock');
  }

  Template.game.p2_paper = function(move){
    var round = previous_round();
    return round_move(round, 'p2', 'paper');
  }

  Template.game.p2_scissors = function(move){
    var round = previous_round();
    return round_move(round, 'p2', 'scissors');
  }


  // statistic functions
  
  Template.game.player1_name = function(){
    if(player1() != null) {
     return player1() ? player1().name : ""
    }
  }
  
  Template.game.player2_name = function(){
    return player2() ? player2().name : "";
  }
  
  Template.game.player1_score = function(){
    return p1_score()
  }

  Template.game.player2_score = function(){
    return p2_score()
  }

  Template.game.p1_wins_round = function(){
    return p1_wins(this) ? "win" : "lose"
  }
  
  Template.game.p2_wins_round = function(){
    return p2_wins(this) ? "win" : "lose"
  }

  Template.game.round_number = function(){
    var game = current_game();
    if(game) {
      return game.rounds.length;
    }
  }
  
  Template.game.p1_winning = function(){
    return p1_winning()
  }

  Template.game.p2_winning = function(){
    return p2_winning()
  }

  Template.game.round_msg = function(){
    return round_msg(this);
  }
  
  Template.game.prev_round_message = function(){
    return round_msg();
  }
  
  Template.game.p1_prev_move = function(){
    if(previous_round()) {
      return previous_round().p1
    }    
  }

  Template.game.p2_prev_move = function(){
    if(previous_round()) {
      return previous_round().p2
    }
  }


  Template.game.waiting_msg = function(){
    var round = current_round();
    if(round) {
      if( waiting_on_p1()) {
        return "WAITING FOR " + player2().name;
      } else if (waiting_on_p2()) {
        return "WAITING FOR " + player1().name;
      }
      return "";
    }
  }
  
  Template.game.waiting = function(){
    return (waiting_on_p1() || waiting_on_p2()) ? "waiting" : "";
  }
  
  
  Template.game.events = {
    'click button.move': function(event){
      var $button = $(event.target);
      var move = $button.attr('id');
      var player = player_num()
      if (player == "p1" || player == "p2") {
        update_round(player, move)
      }
    },
    
    'click #return-btn': function(event){
      Router.main();
      Router.navigate('');
    }
    
  }
}


// ONGOING HELPER FUNCTIONS

var current_round = function(){
  var game = current_game()
  return game ? game.rounds[game.rounds.length-1] : null;  
}

var current_round = function(){
  var game = current_game()
  if(game){
    return game.rounds[game.rounds.length-1];
  } else {
    return null;
  }
}

var previous_round = function(){
  var game = current_game()
  if(game){
    return game.rounds[game.rounds.length-2];
  } else {
    return null;
  }  
}

var current_game = function(){
  return Games.findOne(Session.get('game_id'))
}

var round_move = function(round, player, move){  
  if(round) {
    return (round[player] === move) ? "btn-primary" : ""
  } else {
    return ""  
  }
}

var new_round = function(){
  var new_round = {p1: null, p2: null}
  var rounds = current_game().rounds

  rounds.push(new_round)
  Games.update(current_game()._id, {$set: {rounds: rounds}})
}

var update_round = function(player, move) {
  var game = current_game();
  var round = current_round();
  var rounds = current_game().rounds;
  
  // make move
  round[player] = move;
  rounds[rounds.length-1] = round
  Games.update(game._id, {$set: {rounds: rounds}});
  
  if((round.p1 != null) && round.p2 != null) {
    new_round()
  }
}




// ROUND HELPER FUNCTIONS
var p1_wins = function(round) {
  if (round.p1 === round.p2) {
    return false;
  } else{
    return ((round.p1 == "paper" && round.p2 == "rock") || (round.p1 == "rock" && round.p2 == "scissors") || (round.p1 == "scissors" && round.p2 == "paper"))
  }
}

var p2_wins = function(round) {
  if (round.p1 === round.p2) {
    return false;
  } else{
    return ((round.p2 == "paper" && round.p1 == "rock") || (round.p2 == "rock" && round.p1 == "scissors") || (round.p2 == "scissors" && round.p1 == "paper"))
  }
}

var round_msg = function(round) {
  if (round === undefined) round = previous_round();
  
  if(round) {
    if(p1_wins(round)) {
      return player1().name + " WON"
    } else if (p2_wins(round)) {
      return player2().name + " WON"
    } else {
      return "TIE"
    }     
  }
  return ""
}

var waiting_on_p1 = function(round) {
  if(round === undefined) round = current_round();
  if(round) {
    return round.p1 != null && round.p2 == null;
  }
}

var waiting_on_p2 = function(round) {
  if(round === undefined) round = current_round();
  if(round) {
    return round.p2 != null && round.p1 == null;
  }
}


// GAME HELPER FUNCTIONS

var player1 = function(game){
  if (game === undefined) game = current_game(); 
  if(game) {
    return Players.findOne(game.player1)
  } else {
    return null
  }    
}

var player2 = function(game){
  if (game === undefined) game = current_game(); 
  if(game) {
    return Players.findOne(game.player2)  
  } else {
    return null;
  }
}

var p1_score = function(game){
  if (game === undefined) game = current_game(); 
  if(game) {
    var rounds = game.rounds
    var p1_score = _.filter(rounds, p1_wins).length
    return p1_score
  }
}

var p2_score = function(game){
  if (game === undefined) game = current_game(); 
  if(game) {
    var rounds = game.rounds
    var p2_score = _.filter(rounds, p2_wins).length
    return p2_score
  }  
}

var player_num = function(game){
  if (game === undefined) game = current_game(); 
  var player_id = Session.get('player_id')

  if(game) {
    if(player_id === game.player1) {
      return "p1"
    } else if (player_id === game.player2) {
      return "p2"
    } else {
      return null
    }
  }
}

var p1_winning = function(game) {
  if (game === undefined) game = current_game(); 
  if(game) {
   return ((p1_score(game) > p2_score(game)) ? "winning" : "") 
  }
}

var p2_winning = function(game) {
  if (game === undefined) game = current_game(); 
  if(game) {
   return !((p1_score(game) > p2_score(game)) ? "winning" : "") 
  }
}


