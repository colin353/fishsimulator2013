// Generated by CoffeeScript 1.6.2
(function() {
  var CoolTool, Coral, FeedTool, Fish, FishTankCanvasController, GImage, GInputEvent, GMap, HandTool, OverlayCanvasController, SaltTool, SpongeTool, Tank, ViewController, WarmTool, isMobileSafari, tick, viewcontroller,
    __slice = [].slice;

  Coral = (function() {
    function Coral(image) {
      this.image = image;
      viewcontroller.loadImages(image);
      this.position = {
        x: 0,
        y: 0
      };
    }

    Coral.prototype.tick = function() {
      return viewcontroller.renderSprite(this.image, this.position.x, this.position.y, 0.2);
    };

    return Coral;

  })();

  Fish = (function() {
    function Fish(image) {
      this.image = image;
      viewcontroller.loadImages(image);
      this.position = {
        x: 0,
        y: 0
      };
      this.direction = {
        x: Math.random(),
        y: Math.random()
      };
    }

    Fish.prototype.tick = function() {
      var flip;

      flip = this.direction.x < 0;
      viewcontroller.renderSprite(this.image, this.position.x, this.position.y, 0.5, flip);
      this.position.x += this.direction.x * 10;
      this.position.y += this.direction.y * 10;
      if (document.tank.temperature < 60) {
        this.position.x += (Math.random() - 0.5) * 10;
        this.position.y += (Math.random() - 0.5) * 10;
      }
      if (this.position.x > viewcontroller.canvas.width - 0.5 * viewcontroller.images[this.image].image.width || this.position.x < 0) {
        this.direction.x = -this.direction.x;
        this.direction.y = Math.random() - 0.5;
      }
      if (this.position.y > viewcontroller.canvas.height - 0.5 * viewcontroller.images[this.image].image.height || this.position.y < 0) {
        this.direction.y = -this.direction.y;
        this.direction.x = Math.random() - 0.5;
      }
      return document.tank.waste += 0.02;
    };

    return Fish;

  })();

  FishTankCanvasController = (function() {
    function FishTankCanvasController() {
      this.relinquishcontrol = false;
      this.fishes = [];
      this.fishes.push(new Fish('clown-fish.png'));
      this.fishes.push(new Fish('minnow.png'));
      this.corals = [];
      this.corals.push(new Coral('Coral1.png'));
      this.corals[0].position = {
        x: 200,
        y: 200
      };
      this.tank = new Tank('TankBackground.jpg');
      document.tank = this.tank;
    }

    FishTankCanvasController.prototype.tick = function() {
      var a, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;

      this.tank.tick();
      _ref = this.corals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        a.tick();
      }
      _ref1 = this.fishes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        a = _ref1[_j];
        a.tick();
      }
      _ref2 = viewcontroller.inputstack;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        a = _ref2[_k];
        if (a.type === 'M') {
          document.tool.click(a.x, a.y);
        }
        if (a.type === 'MD') {
          document.tool.hold(a.x, a.y);
        }
      }
      return true;
    };

    return FishTankCanvasController;

  })();

  GImage = (function() {
    function GImage(location, owner) {
      var me;

      if (location == null) {
        location = 'broken.png';
      }
      this.image = new Image();
      this.image.src = "game/images/" + location;
      me = this;
      this.image.onload = function() {
        return me.onload();
      };
      this.loaded = false;
      this.owner = owner;
    }

    GImage.prototype.onload = function() {
      this.loaded = true;
      if ((this.owner != null) && (this.owner.imageLoaded != null)) {
        return this.owner.imageLoaded();
      }
    };

    return GImage;

  })();

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

  isMobileSafari = function() {
    return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
  };

  GInputEvent = (function() {
    function GInputEvent() {
      var data, type;

      type = arguments[0], data = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.type = type;
      switch (this.type) {
        case 'K':
          this.key = data[0];
          this.shift = data[1];
          break;
        case 'M':
        case 'MD':
          this.x = data[0];
          this.y = data[1];
          break;
        case 'D':
          this.dir = data[0];
      }
    }

    GInputEvent.prototype.toText = function() {
      var char, shift, textstring;

      textstring = '';
      switch (this.type) {
        case 'K':
          char = String.fromCharCode(this.key);
          shift = '';
          if ((this.shift != null) && this.shift) {
            shift = ' + SHIFT ';
          }
          textstring = "Keyboard event: key number " + this.key + " " + shift + " (which is '" + char + "')";
          break;
        case 'M':
          textstring = "Mouse click at (" + this.x + ", " + this.y + ")";
          break;
        case 'D':
          textstring = "D-pad cilcked (" + this.dir + ")";
          break;
        default:
          textstring = "Input type " + this.type;
      }
      return textstring;
    };

    return GInputEvent;

  })();

  OverlayCanvasController = (function() {
    function OverlayCanvasController(text) {
      var i, line1, line2, _i;

      this.relinquishcontrol = false;
      this.readytofinish = false;
      this.line1 = text;
      this.line2 = '';
      this.text = text;
      this.count = 0;
      if (text.length > 18) {
        for (i = _i = 0; _i <= 18; i = _i += 1) {
          if (text[18 - i] === ' ') {
            line1 = text.slice(0, +i + 1 || 9e9);
            line2 = text.slice(i);
            alert("Okay...");
            break;
          }
        }
      }
    }

    OverlayCanvasController.prototype.dialog = function(line1, line2) {
      viewcontroller.context.drawImage(viewcontroller.images['overlay.png'].image, 50, 450);
      viewcontroller.context.fillStyle = 'black';
      viewcontroller.context.textBaseline = 'middle';
      viewcontroller.context.textAlign = 'left;';
      viewcontroller.context.fillText(this.line1, 95, 520);
      return viewcontroller.context.fillText(this.line2, 95, 575);
    };

    OverlayCanvasController.prototype.tick = function() {
      var i, line1_now, line2_now, _i, _len, _ref;

      _ref = viewcontroller.inputstack;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        switch (i) {
          case "A":
            if (this.readytofinish) {
              this.relinquishcontrol = true;
            }
        }
      }
      this.count++;
      line1_now = this.line1.slice(0, +(this.count / 3) + 1 || 9e9);
      if ((this.count / 3) - line1_now.length > 0) {
        line2_now = this.line2.slice(0, +(this.count / 3 - line1_now.length) + 1 || 9e9);
      } else {
        line2_now = '';
      }
      if (this.count / 3 < this.text.length + 1) {
        return this.dialog(line1_now, line2_now);
      } else if (this.count % 12 === 0) {
        this.readytofinish = true;
        return viewcontroller.renderSprite(32 + this.count % 24, 7.8, 7.2);
      }
    };

    return OverlayCanvasController;

  })();

  Tank = (function() {
    function Tank(image) {
      this.image = image;
      this.temperature = 75;
      this.salt = 0;
      this.supply = 100;
      this.waste = 0;
      viewcontroller.loadImages(image);
    }

    Tank.prototype.tick = function() {
      viewcontroller.renderSprite(this.image, 0, 0, 1.2);
      $("#tank_supply").css('width', this.supply + '%');
      $("#tank_salt").css('width', this.salt + '%');
      $("#tank_waste").css('width', this.waste + '%');
      return $("#tank_temperature").css('width', ((this.temperature - 45) * (20 / 9)) + '%');
    };

    return Tank;

  })();

  WarmTool = (function() {
    function WarmTool(image) {
      this.image = image;
      if (this.image != null) {
        viewcontroller.loadImages(this.image);
      }
      this.scale = 1;
    }

    WarmTool.prototype.click = function(x, y) {
      return true;
    };

    WarmTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
      if (document.tank.temperature < 90) {
        return document.tank.temperature += 0.2;
      }
    };

    return WarmTool;

  })();

  SpongeTool = (function() {
    function SpongeTool(image) {
      this.image = image;
      this.scale = 0.6;
      if (this.image != null) {
        viewcontroller.loadImages(this.image);
      }
    }

    SpongeTool.prototype.click = function(x, y) {
      return this.hold(x, y);
    };

    SpongeTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
      if (document.tank.waste > 0) {
        return document.tank.waste -= 2;
      }
    };

    return SpongeTool;

  })();

  FeedTool = (function() {
    function FeedTool(image) {
      this.image = image;
      this.scale = 1;
      if (this.image != null) {
        viewcontroller.loadImages(this.image);
      }
    }

    FeedTool.prototype.click = function(x, y) {
      return this.hold(x, y);
    };

    FeedTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        return viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
    };

    return FeedTool;

  })();

  CoolTool = (function() {
    function CoolTool(image) {
      this.image = image;
      if (image != null) {
        viewcontroller.loadImages(image);
      }
      this.scale = 1;
    }

    CoolTool.prototype.click = function(x, y) {
      return true;
    };

    CoolTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
      if (document.tank.temperature > 45) {
        return document.tank.temperature -= 0.2;
      }
    };

    return CoolTool;

  })();

  SaltTool = (function() {
    function SaltTool(image) {
      this.image = image;
      if (image != null) {
        viewcontroller.loadImages(image);
      }
      this.scale = 0.5;
    }

    SaltTool.prototype.click = function(x, y) {
      return true;
    };

    SaltTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
      if (document.tank.salt < 100) {
        return document.tank.salt += 0.2;
      }
    };

    return SaltTool;

  })();

  HandTool = (function() {
    function HandTool(image) {
      this.image = image;
      if (image != null) {
        viewcontroller.loadImages(image);
      }
      this.scale = 0.4;
    }

    HandTool.prototype.click = function(x, y) {
      return true;
    };

    HandTool.prototype.hold = function(x, y) {
      if (this.image != null) {
        return viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
      }
    };

    return HandTool;

  })();

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

  viewcontroller = new ViewController;

  viewcontroller.loadImages('TankBackground.jpg');

  viewcontroller.stack.push(new FishTankCanvasController());

  document.viewcontroller = viewcontroller;

  $(function() {
    document.tools = [];
    document.tools['sponge'] = new SpongeTool('sponge3.png');
    document.tools['feed'] = new FeedTool('FishFood.png');
    document.tools['warm'] = new WarmTool('heattool.png');
    document.tools['cool'] = new CoolTool('icecube.png');
    document.tools['salt'] = new SaltTool('salt.png');
    document.tools['hand'] = new HandTool('hand.png');
    return document.tool = document.tools['hand'];
  });

  tick = function() {
    viewcontroller.tick();
    return setTimeout(tick, viewcontroller.timestep);
  };

  tick();

}).call(this);
