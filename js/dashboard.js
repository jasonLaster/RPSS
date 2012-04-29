if (Meteor.is_client) {

  Template.dashboard.players = function() {
    return Players.find().fetch();
  }
  
  Template.dashboard.open_games = function() {
    return Games.find({closed:false}).fetch();
  }

  Template.dashboard.ongoing_games = function() {
    var games = Games.find({closed:true}).fetch();
    games = _.filter(games, function(game){return (game.computer == undefined || !game.computer)})
    return games;
  }
  
  
  Template.dashboard.show_dashboard = function(){
    return Session.get('show_dashboard') && (Session.get('game_id')== null)
  }
  
  Template.dashboard.can_create_game = function(){
    var player1 = Players.findOne(Session.get('player_id'))
    if(player1) {
      return Games.find({player1: player1._id}).count()==0; 
    }
  }

  Template.dashboard.events = {
    
    'click #create-human-game': function(){
      var player1 = Players.findOne(Session.get('player_id'))
      var opts = {player1: player1._id, closed: false, computer:false, rounds: [{p1: null, p2:null}]}
      Games.insert(opts);
    },
    
    'click #create-computer-game': function(){
      var player1 = Players.findOne(Session.get('player_id'))
      var opts = {player1: player1._id, closed: true, computer:true, rounds: [{p1: null, p2:null}]}
      var id = Games.insert(opts);
      Router.game(id)
      Router.navigate(id);
    }
    
  }

};

