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
    this.context.font = '45px "Courier"';
    if (isMobileSafari()) {
      this.context.font = '45px "Courier"';
    }
    this.images = [];
    this.map = [];
    this.stack = [];
    this.timestep = 30;
    this.inputstack = [];
    this.dpad_touchstate = [];
    this.mousedown = false;
    this.mousepos = {
      x: 0,
      y: 0
    };
    me = this;
    $(document).mouseup(function(e) {
      return me.mousedown = false;
    });
    $(document).mousemove(function(e) {
      return me.mousepos = {
        x: e.pageX,
        y: e.pageY
      };
    });
    $(this.canvas).mousedown(function(e) {
      me.canvasinput_mouseClick(e.pageX, e.pageY);
      return me.mousedown = true;
    });
    $(document).keypress(function(e) {
      e.preventDefault();
      return me.inputstack.push(new GInputEvent('K', e.keyCode, e.shiftKey));
    });
    $("#spongetool").click(function() {
      return document.tool = document.tools['sponge'];
    });
    $("#warmtool").click(function() {
      return document.tool = document.tools['warm'];
    });
    $("#cooltool").click(function() {
      return document.tool = document.tools['cool'];
    });
    $("#foodtool").click(function() {
      return document.tool = document.tools['feed'];
    });
    $("#handtool").click(function() {
      return document.tool = document.tools['hand'];
    });
    $("#salttool").click(function() {
      return document.tool = document.tools['salt'];
    });
    $("#siphontool").click(function() {
      return document.tool = document.tools['siphon'];
    });
    $("#watertool").click(function() {
      return document.tool = document.tools['water'];
    });
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
      return true;
    }
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

  ViewController.prototype.renderSprite = function(image, x, y, scale, flip) {
    var height, width;

    if (scale == null) {
      scale = 1;
    }
    if (flip == null) {
      flip = false;
    }
    width = this.images[image].image.width;
    height = this.images[image].image.height;
    this.context.save();
    if (flip === true) {
      this.context.translate(this.canvas.width / 2, 0);
      this.context.scale(-1, 1);
      this.context.translate(-this.canvas.width / 2, 0);
      x = this.canvas.width - x - width * scale;
    }
    this.context.drawImage(this.images[image].image, x, y, width * scale, height * scale);
    return this.context.restore();
  };

  ViewController.prototype.imageLoaded = function() {
    return true;
  };

  ViewController.prototype.canvasinput_mouseClick = function(x, y) {
    x = Math.floor(x - $(this.canvas).offset().left);
    y = Math.floor(y - $(this.canvas).offset().top);
    return this.inputstack.push(new GInputEvent('M', x, y));
  };

  ViewController.prototype.canvasinput_mouseDrag = function(x, y) {
    x = Math.floor(x - $(this.canvas).offset().left);
    y = Math.floor(y - $(this.canvas).offset().top);
    return this.inputstack.push(new GInputEvent('MD', x, y));
  };

  ViewController.prototype.tick = function() {
    if (!this.ready()) {
      return false;
    }
    if (this.mousedown === true) {
      this.canvasinput_mouseDrag(this.mousepos.x, this.mousepos.y);
    }
    this.stack[0].tick();
    this.inputstack = [];
    return true;
  };

  return ViewController;

})();
