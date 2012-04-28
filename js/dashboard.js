if (Meteor.is_client) {

  Template.dashboard.players = function() {
    return Players.find().fetch();
  }
  
  Template.dashboard.open_games = function() {
    return Games.find({closed:false}).fetch();
  }

  Template.dashboard.ongoing_games = function() {
    return Games.find({closed:true}).fetch();
  }
  
  
  Template.dashboard.show_dashboard = function(){
    return Session.get('show_dashboard') && (Session.get('game_id')== null)
  }
  
  Template.dashboard.can_create_game = function(){
    var player1 = Players.findOne(Session.get('player_id'))
    return Games.find({player1: player1._id}).count()==0;
  }

  Template.dashboard.events = {
    
    'click #create-game': function(){
      var player1 = Players.findOne(Session.get('player_id'))
      var opts = {player1: player1._id, closed: false, rounds: [{p1: null, p2:null}]}
      if(Template.dashboard.can_create_game()) {
        Games.insert(opts);  
      }
    }
  }

};

