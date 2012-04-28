if (Meteor.is_client) {
  Template.open_game.player1_name = function(){
    var player1 = Players.findOne(this.player1);
    return player1.name;
  }
  
  Template.open_game.player2_name = function(){
    var player2 = Players.findOne(this.player2);
    return player2.name;
  }
  
  Template.open_game.events = {
    'click .join-game': function(){
      var player2 = Players.findOne(Session.get('player_id'));
      if(this.player1 != player2._id) {
        Session.set('game_id', this._id);
        Games.update(this._id, {$set: {player2: player2._id, closed: true}}) 
      }
    }
  }
};

