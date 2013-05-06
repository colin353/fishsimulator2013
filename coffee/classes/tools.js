// Generated by CoffeeScript 1.6.2
var BuyTool, CoolTool, FeedTool, HandTool, SaltTool, SiphonTool, SpongeTool, WarmTool, WaterTool;

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
      return document.tank.waste -= 0.2;
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
    var p;

    this.hold(x, y);
    p = new Pellet('pellet.json');
    p.position = {
      x: x,
      y: y
    };
    return document.tankcontroller.pellets.push(p);
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
      return document.tank.salt += 1;
    }
  };

  return SaltTool;

})();

HandTool = (function() {
  function HandTool(image) {
    this.grabbed = null;
    this.image = image;
    if (image != null) {
      viewcontroller.loadImages(image);
    }
    this.scale = 0.2;
  }

  HandTool.prototype.click = function(x, y) {
    var distance, thisfish, xs, ys, _i, _len, _ref, _results;

    this.grabbed = null;
    _ref = document.tankcontroller.fishes.concat(document.tankcontroller.corals);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      thisfish = _ref[_i];
      xs = thisfish.position.x - x + thisfish.scale * 0.5 * document.viewcontroller.images[thisfish.image].image.width;
      xs = xs * xs;
      ys = thisfish.position.y - y + thisfish.scale * 0.5 * document.viewcontroller.images[thisfish.image].image.height;
      ys = ys * ys;
      distance = Math.sqrt(xs + ys);
      if (distance < 50) {
        _results.push(this.grabbed = thisfish);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  HandTool.prototype.hold = function(x, y) {
    if (this.image != null) {
      viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
    }
    if (this.grabbed != null) {
      this.grabbed.position.x = x - this.grabbed.scale * 0.5 * document.viewcontroller.images[this.grabbed.image].image.width;
      return this.grabbed.position.y = y - this.grabbed.scale * 0.5 * document.viewcontroller.images[this.grabbed.image].image.height;
    }
  };

  return HandTool;

})();

BuyTool = (function() {
  function BuyTool(purchased, type, previous_tool) {
    this.purchased = purchased;
    this.type = type;
    this.prev_tool = previous_tool;
  }

  BuyTool.prototype.click = function(x, y) {
    var a;

    switch (this.type) {
      case 'fish':
        a = new Fish(this.purchased);
        a.position = {
          x: x,
          y: y
        };
        document.tankcontroller.fishes.push(a);
        break;
      case 'coral':
        a = new Coral(this.purchased);
        a.position = {
          x: x - a.scale * document.viewcontroller.images[a.image].image.width * 0.5,
          y: y - a.scale * document.viewcontroller.images[a.image].image.width * 0.5
        };
        document.tankcontroller.corals.push(a);
    }
    document.tool = this.prev_tool;
    return delete this;
  };

  BuyTool.prototype.hold = function(x, y) {
    return true;
  };

  return BuyTool;

})();

SiphonTool = (function() {
  function SiphonTool(image) {
    this.image = image;
    this.scale = 0.8;
    if (this.image != null) {
      viewcontroller.loadImages(this.image);
    }
  }

  SiphonTool.prototype.click = function(x, y) {
    return this.hold(x, y);
  };

  SiphonTool.prototype.hold = function(x, y) {
    if (this.image != null) {
      viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
    }
    if (document.tank.waterline > 30) {
      return document.tank.waterline -= 1;
    }
  };

  return SiphonTool;

})();

WaterTool = (function() {
  function WaterTool(image) {
    this.image = image;
    this.scale = 0.3;
    if (this.image != null) {
      viewcontroller.loadImages(this.image);
    }
  }

  WaterTool.prototype.click = function(x, y) {
    return this.hold(x, y);
  };

  WaterTool.prototype.hold = function(x, y) {
    if (this.image != null) {
      viewcontroller.renderSprite(this.image, x - this.scale * viewcontroller.images[this.image].image.width / 2, y - this.scale * viewcontroller.images[this.image].image.height / 2, this.scale);
    }
    if (document.tank.waterline < 100) {
      return documenet.tank.waterline += 1;
    }
  };

  return WaterTool;

})();
