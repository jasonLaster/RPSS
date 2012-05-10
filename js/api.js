if (Meteor.is_client) {
  
  Template.api.show_api = function() {
    return Session.get("api");
  }
  
  Template.api.api_data = function(){
    return Session.get("api_data")
  }
  
  Template.api.events = {
    'click .data': function(event){
      $button = $(event.target);
      var human = $button.attr('id')=='human';
      var data = games_array_data(human);
      Session.set("api_data", data);
    },
  }
  
  
}



// public
var games_array_data = function(human){
  
  // get rounds
  var games = human ? human_games(): computer_games();
  var rounds_array = _.map(games, game_data);
  
  // add game beginning marker
  // concatonate games together
  rounds_array = _.map(rounds_array, function(round) {return "9, 9; " + round;})
  var rounds =  _.reduce(rounds_array, function(s, r){ return s + r; }, "");
  
  // wrap rounds in pretty txt
  round_txt = human ? "human_" : "comp_";
  round_txt += "data = [" + rounds + "];";
  
  
  return round_txt
}


// private
var throw_to_i = function(thro) {
  switch(thro)
  {
  case "rock":
    return 1;
  case "paper":
    return 2;
  case "scissors":
    return 3;
  case "scissor":
    return 3;
  default:
    return null;
  }
}

var game_data = function(game){

    var rounds = game.rounds;
    
    // convert rounds to p1, p2 pairs
    rounds = _.map(rounds, function(round){
      p1 = throw_to_i(round.p1)
      p2 = throw_to_i(round.p2)
      if(p1 != null && p2 != null) {
       return p1 + ", " + p2 + "; ";
      }
    })
    
    // remove bad rounds
    // collapse rounds into one beautiful string
    rounds = _.reject(rounds, function(round){return round == null;})
    rounds = _.reduce(rounds, function(s, r){ return s + r; }, "");

    return rounds;
}

var human_games = function(){
  return Games.find({$or : [{'computer':{'$exists': false}}, {'computer':false}]}).fetch();
}

var computer_games = function(){
  return Games.find({'computer': {'$exists': true}}).fetch();
}

