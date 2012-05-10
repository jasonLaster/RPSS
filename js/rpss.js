Session.set('player_id', null);
Session.set('show_dashboard', false);
Session.set("game_id", null);
Session.set("display_clock",0);
Session.set("api", false);
Session.set("api_data", "");

Session.set("login_section", false);


Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


if (Meteor.is_client) {

  var RpssRouter = Backbone.Router.extend({
  
    routes: {
      "":"main",
      "api": "api",
      "logout": "logout",
      ":game_id": "game"
    },
  
    main: function(){
      Router.navigate("");
      Session.set("api", false);
      Session.set("game_id", null);
      Session.set('player_id', $.cookie('player_id'));
    },
  
    game: function (game_id) {
      Session.set("api", false);
      Session.set('show_dashboard', true)
      Session.set("game_id", game_id);
      Session.set('player_id', $.cookie('player_id'));
    },
    
    logout: function(){
      Session.set("api", false);
      Session.set('show_dashboard', false);
      Session.set("game_id", null);
      Session.set('player_id', null);
      $.cookie('player_id', null);
      Router.navigate("");
      Router.main();
    },
  
    api: function(){
      Session.set("api", true);
      Router.navigate("api");
    }
    
  });

  Router = new RpssRouter;

  Meteor.startup(function () {
    Backbone.history.start({pushState: true});
  });


}
// 
// 
