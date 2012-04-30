Session.set('player_id', null);
Session.set('show_dashboard', false);
Session.set("game_id", null);

Session.set("login_section", false);


Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


if (Meteor.is_client) {

  var RpssRouter = Backbone.Router.extend({
  
    routes: {
      "":"main",
      "logout": "logout",
      ":game_id": "game"
    },
  
    main: function(){
      Router.navigate("");
      Session.set("game_id", null);
      Session.set('player_id', $.cookie('player_id'));
    },
  
    game: function (game_id) {
      Session.set('show_dashboard', true)
      Session.set("game_id", game_id);
      Session.set('player_id', $.cookie('player_id'));
    },
    
    logout: function(){
      Session.set('show_dashboard', false);
      Session.set("game_id", null);
      Session.set('player_id', null);
      $.cookie('player_id', null);
      Router.navigate("");
      Router.main();
    }
  
  });

  Router = new RpssRouter;

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });


}
// 
// 
