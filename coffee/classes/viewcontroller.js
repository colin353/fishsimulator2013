// Generated by CoffeeScript 1.6.2
var ViewController,
  __slice = [].slice;

ViewController = (function() {
  function ViewController(selector) {
    var me;

    if (selector == null) {
      selector = "pokeCanvas";
    }
    this.canvas = $("#" + selector).get(0);
    this.context = this.canvas.getContext('2d');
    this.context.font = '30px "Pokemon GB"';
    if (isMobileSafari()) {
      this.context.font = '45px "Courier"';
    }
    this.images = [];
    this.map = [];
    this.stack = [];
    this.timestep = 30;
    this.inputstack = [];
    this.dpad_touchstate = [];
    me = this;
    $(this.canvas).mousedown(function(e) {
      return me.canvasinput_mouseClick(e.pageX, e.pageY);
    });
    $(document).keypress(function(e) {
      e.preventDefault();
      return me.inputstack.push(new GInputEvent('K', e.keyCode, e.shiftKey));
    });
    $('#dpad > div').bind('touchstart', this.canvasinput_Dpad_down);
    $('#dpad > div').mousedown(this.canvasinput_Dpad_down);
    $('#dpad > div').bind('touchend', this.canvasinput_Dpad_up);
    $('#dpad > div').mouseup(this.canvasinput_Dpad_up);
  }

  ViewController.prototype.ready = function() {
    var a, b, _i, _j, _len, _len1, _ref;

    _ref = [this.images, this.map];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      a = _ref[_i];
      for (_j = 0, _len1 = a.length; _j < _len1; _j++) {
        b = a[_j];
        if ((b[a].loaded == null) || !b[a].loaded) {
          return false;
        }
      }
    }
    return true;
  };

  ViewController.prototype.loadImages = function() {
    var a, list, _i, _len;

    list = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      a = list[_i];
      this.images[a] = new GImage(a, this);
    }
    return true;
  };

  ViewController.prototype.loadMap = function(location) {
    this.map = new GMap(location);
    return true;
  };

  ViewController.prototype.renderSprite = function(i, x, y) {
    return this.context.drawImage(this.images['spritesheet.png'].image, 112 * (i % 16), Math.floor(i / 16) * 112, 112, 112, x * 75, y * 75, 75, 75);
  };

  ViewController.prototype.imageLoaded = function() {
    return true;
  };

  ViewController.prototype.canvasinput_mouseClick = function(x, y) {
    x = Math.floor(x - $(this.canvas).offset().left / 20);
    y = Math.floor(y - $(this.canvas).offset().left / 20);
    return this.inputstack.push(new GInputEvent('M', x, y));
  };

  ViewController.prototype.canvasinput_Dpad_down = function(e) {
    var DEvent, direction;

    direction = '';
    switch (this.id) {
      case 'dpad_u':
        direction = 'U';
        break;
      case 'dpad_l':
        direction = 'L';
        break;
      case 'dpad_r':
        direction = 'R';
        break;
      case 'dpad_d':
        direction = 'D';
    }
    DEvent = new GInputEvent('D', direction);
    viewcontroller.inputstack.push(DEvent);
    return viewcontroller.dpad_touchstate = DEvent;
  };

  ViewController.prototype.canvasinput_Dpad_up = function(e) {
    return viewcontroller.dpad_touchstate = 0;
  };

  ViewController.prototype.tick = function() {
    if (!this.ready()) {
      return alert("Not ready yet...");
    }
    this.stack[0].tick();
    return true;
  };

  return ViewController;

})();
