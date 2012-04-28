if (Meteor.is_client) {
  
  Template.game.show_game = function(){
    return Session.get('game_id') != null
  }
  
  Template.game.player1_name = function(){
    return player1().name;
  }
  
  Template.game.player2_name = function(){
    return player2().name;
  }
  

  Template.game.p1_rock = function(move){
    return round_move('p1', 'rock');
  }

  Template.game.p1_paper = function(move){
    return round_move('p1', 'paper');
  }

  Template.game.p1_scissor = function(move){
    return round_move('p1', 'scissor');
  }

  Template.game.p2_rock = function(move){
    return round_move('p2', 'rock');
  }

  Template.game.p2_paper = function(move){
    return round_move('p2', 'paper');
  }

  Template.game.p2_scissor = function(move){
    return round_move('p2', 'scissor');
  }


  
  
  Template.game.events = {
    'click button.move': function(event){
      var $button = $(event.target);
      var move = $button.attr('id');
      var player = $button.parent().attr('id');
      update_round(player, move)
    },
    
    'click #return-btn': function(event){
      Session.set('game_id', null);
    }
    
  }
}

var player_num = function(){
  var game = current_game()
  var player_id = Session.get('player_id')
  return player_id === game.player1 ? "p1" : "p2";
}

var round_move = function(player, move){
  return (current_round()[player] === move) ? "btn-primary" : "";
}



var new_round = function(){
  current_game().rounds.push({p1: null, p2: null})
  Games.update(current_game()._id, {$set: {rounds: current_game().rounds}})
}

var update_round = function(player, move) {
  var game = current_game();
  var round = current_round();
  var rounds = current_game().rounds;
  
  round[player] = move;
  rounds[rounds.length-1] = round
  Games.update(game._id, {$set: {rounds: rounds}});
}

var current_round = function(){
  var game = current_game()
  return game.rounds[game.rounds.length-1]
}


var current_game = function(){
  return Games.findOne(Session.get('game_id'))
}

var player1 = function(){
  var game = current_game();
  return Players.findOne(game.player1)
}

var player2 = function(){
  var game = current_game();
  return Players.findOne(game.player2)  
}