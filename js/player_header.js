if (Meteor.is_client) {

  Template.player_header.player_name = function(){
    Session.set('player_id', $.cookie('player_id'));
    var player = Players.findOne(Session.get('player_id'));
    return player ? player.name : null;
  }
};

