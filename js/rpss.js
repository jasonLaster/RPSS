Session.set('player_id', null);
Session.set('show_dashboard', false);
Session.set("game_id", null);



Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


if (Meteor.is_client) {

  var RpssRouter = Backbone.Router.extend({
  
    routes: {
      "":"main",
      ":game_id": "game"
    },
  
    main: function(){
      Session.set("game_id", null);
      Session.set('player_id', $.cookie('player_id'));
    },
  
    game: function (game_id) {
      Session.set('show_dashboard', true)
      Session.set("game_id", game_id);
      Session.set('player_id', $.cookie('player_id'));
    }
  
  });

  Router = new RpssRouter;

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });


}
// 
// 
