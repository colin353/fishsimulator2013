// Generated by CoffeeScript 1.6.2
var GMap;

GMap = (function() {
  function GMap(location) {
    var me;

    this.loaded = false;
    this.map = [];
    me = this;
    $.getScript("game/maps/" + location + ".js");
    if (location != null) {
      $.get("game/maps/" + location + ".map", function(r) {
        me.loaded = true;
        return me.map = JSON.parse(r);
      });
    } else {
      this.newMap();
    }
  }

  GMap.prototype.newMap = function(x, y) {
    var i, j, _i, _j;

    if (x == null) {
      x = 10;
    }
    if (y == null) {
      y = 10;
    }
    this.map = Array(y);
    for (i = _i = 0; _i <= y; i = _i += 1) {
      this.map[i] = Array(x);
      for (j = _j = 0; _j <= x; j = _j += 1) {
        this.map[i][j] = {
          sprite: 33
        };
      }
    }
    return this.loaded = true;
  };

  return GMap;

})();
