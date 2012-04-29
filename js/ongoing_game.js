if (Meteor.is_client) {

  Template.ongoing_game.player1_name = function(){
    var player1 = Players.findOne(this.player1);
    return player1.name;
  }

  Template.ongoing_game.player2_name = function(){

    if(this.computer) return "RPSS BOT"
        
    var player2 = Players.findOne(this.player2);
    if(player2) {
     return player2.name; 
    }
  }
  
  Template.ongoing_game.p1_score = function(){
    return p1_score(this)
  }

  Template.ongoing_game.p2_score = function(){
    return p2_score(this)
  }
  
  Template.ongoing_game.p1_winning = function(){
    return p1_winning(this);
  }
  
  Template.ongoing_game.p2_winning = function(){
    return p2_winning(this);
  }
  
  Template.ongoing_game.btn_msg = function(){
    var player_id = Session.get('player_id')
    if(player_id){
      if(this.player1 === player_id || this.player2 === player_id) {
        return "Play Game!"
      } else {
       return "Watch Game!" 
      }      
    }
  }

  Template.ongoing_game.game_status = function(){
    return waiting_msg(this);
  }
  
  
  Template.ongoing_game.events = {
    'click .watch-game': function(){
      Router.game(this._id)
      Router.navigate(this._id);
    }
  }
  
}