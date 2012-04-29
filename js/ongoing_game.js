if (Meteor.is_client) {

  Template.ongoing_game.player1_name = function(){
    var player1 = Players.findOne(this.player1);
    return player1.name;
  }

  Template.ongoing_game.player2_name = function(){
    var player2 = Players.findOne(this.player2);
    return player2.name;
  }
  
  Template.ongoing_game.events = {
    'click .watch-game': function(){
      Router.game(this._id)
    }
  }
  
}