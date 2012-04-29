if (Meteor.is_client) {

  Template.player_stat.rounds_won = function(){
    
    var p1_games = Games.find({player1: this._id}).fetch();
    var p2_games = Games.find({player2: this._id}).fetch();

    var p2_game_wins = _.map(p2_games, p2_score);
    var p1_game_wins = _.map(p1_games, p1_score);
    return sum(p1_game_wins) + sum(p2_game_wins);
  }

  Template.player_stat.games_won = function(){
    
    var p1_games = Games.find({player1: this._id}).fetch();
    var p2_games = Games.find({player2: this._id}).fetch();

    var p1_game_wins = _.filter(_.map(p1_games, p1_winning), function(game){return game});
    var p2_game_wins = _.filter(_.map(p2_games, p2_winning), function(game){return game});
    return p1_game_wins.length + p2_game_wins.length;
  }


}


var sum = function(list) {
  return _.reduce(list, function(memo, num){ return memo + num; }, 0)
}