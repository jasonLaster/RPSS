if (Meteor.is_client) {

  Template.welcome.player_name = function(){
    Session.set('player_id', $.cookie('player_id'));
    var player = Players.findOne(Session.get('player_id'));
    return player ? player.name : null;
  }
  
  Template.welcome.show_welcome = function(){
    return !Session.get('show_dashboard') && (Session.get('api') == false);
  }
  
  Template.welcome.create_act = function(){
    return !Session.get("login_section");
  }

  Template.welcome.events = {
    'click a.create-player' : function (event) {
      var $input = $(event.target).siblings('input');
      if($input.val() != "") {
        
        // build player
        opts = {name: $input.val()};
        Players.insert(opts);
        var player = Players.findOne(opts);

        // change session
        Session.set('player_id', player._id);
        $.cookie('player_id', player._id, { expires: 100 })
        
        // change display
        $input.val('');
      }
    },
     
    'click a.continue': function() {
      Session.set('show_dashboard', true);
    },
  
    // LOGIN buttons
    'click a#login-link': function(){
      Session.set("login_section", true);
    },
    
    'click a#login-name': function(event){
      var $input = $(event.target).siblings('input');
      var player_name = $input.val();
      var players = Players.find({name: player_name}).fetch()
      if(players.length >0) {
        var player = players[0];
        Session.set('player_id', player._id);
        $.cookie('player_id', player._id);
        Session.set("login_section", false);
      } else {
        $input = $(event.target).siblings('input').val('');
      }
    },
    
    'click a#cancel-login': function(){
      Session.set("login_section", false);
    }
  
  }

};

var logout = function(){
  $.cookie('player_id', null)
  Session.set('player_id', null)
  Session.set('show_dashboard', false)
}