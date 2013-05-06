// Generated by CoffeeScript 1.6.2
var Fish;

Fish = (function() {
  function Fish(filename) {
    this.filename = filename;
    this.fish_raw = sync_get('game/assets/fish/' + filename);
    if (this.fish_raw.name == null) {
      alert("Illegal fish \"" + filename + "\"");
    }
    this.type = 'fish';
    this.image = this.fish_raw.image;
    this.price = this.fish_raw.price;
    this.name = this.fish_raw.name;
    this.crustacean = this.fish_raw.crustacean;
    this.scale = 0.5;
    if (this.fish_raw.scale != null) {
      this.scale = this.fish_raw.scale;
    }
    this.description = this.fish_raw.description;
    viewcontroller.loadImages(this.image);
    this.position = {
      x: 0,
      y: 0
    };
    this.direction = {
      x: Math.random(),
      y: Math.random()
    };
    this.health = this.fish_raw.hitpoints;
    this.dead = this.fish_raw.alive;
  }

  Fish.prototype.salt_ok = function() {
    if (document.tank.salt > this.fish_raw.salt_max || document.tank.salt < this.fish_raw.salt_min) {
      return false;
    } else {
      return true;
    }
  };

  Fish.prototype.nearest_pellet = function() {
    var bestdistance, bestpos, distance, i, p, xs, ys, _i, _len, _ref;

    bestdistance = 200;
    bestpos = {
      x: -1,
      y: -1
    };
    i = 0;
    _ref = document.tankcontroller.pellets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      xs = p.position.x - (this.position.x + this.scale * document.viewcontroller.images[this.image].image.width / 2);
      xs = xs * xs;
      ys = p.position.y - (this.position.y + this.scale * document.viewcontroller.images[this.image].image.height / 2);
      ys = ys * ys;
      distance = Math.sqrt(xs + ys);
      if (distance < bestdistance) {
        bestdistance = distance;
        bestpos = {
          x: p.position.x,
          y: p.position.y
        };
        bestpos.pellet = i;
      }
      i++;
    }
    bestpos.distance = bestdistance;
    return bestpos;
  };

  Fish.prototype.tick = function() {
    var closest, flip, norm, reverse;

    closest = this.nearest_pellet();
    if (closest.x > -1) {
      this.direction.x = (closest.x - (this.position.x + this.scale * document.viewcontroller.images[this.image].image.width / 2)) * 0.005;
      this.direction.y = (closest.y - (this.position.y + this.scale * document.viewcontroller.images[this.image].image.height / 2)) * 0.005;
      norm = Math.sqrt(this.direction.x ^ 2 + this.direction.y ^ 2);
      if (norm < .2) {
        norm = .2;
      }
      this.direction.x = this.direction.x / norm;
      this.direction.y = this.direction.y / norm;
      if (closest.distance < 30) {
        document.tankcontroller.pellets.splice(closest.pellet, 1);
        if (this.fish_raw.growth_rate != null) {
          this.scale += 0.01 * this.fish_raw.growth_rate;
        }
      }
    }
    flip = this.direction.x < 0;
    viewcontroller.renderSprite(this.image, this.position.x, this.position.y, this.scale, flip);
    if (this.salt_ok() === true) {
      this.position.x += this.direction.x * 10;
      this.position.y += this.direction.y * 10;
    }
    if (document.tank.temperature < 60) {
      this.position.x += (Math.random() - 0.5) * 10;
      this.position.y += (Math.random() - 0.5) * 10;
    }
    if (this.salt_ok() === false) {
      if (this.position.y < viewcontroller.canvas.height - 0.5 * viewcontroller.images[this.image].image.height - 50) {
        this.position.y += 0.5;
      }
    }
    if (this.position.x > viewcontroller.canvas.width - 0.5 * viewcontroller.images[this.image].image.width || this.position.x < document.tank.pixelwaterline) {
      if (this.position.x < document.tank.pixelwaterline) {
        reverse = 1;
      } else {
        reverse = -1;
      }
      this.direction.x = Math.abs(this.direction.x) * reverse;
      if (this.salt_ok()) {
        this.direction.y = Math.random() - 0.5;
      }
    }
    if (this.position.y > viewcontroller.canvas.height - 0.5 * viewcontroller.images[this.image].image.height - 50 || this.position.y < document.tank.pixelwaterline) {
      if (this.position.y < document.tank.pixelwaterline) {
        reverse = 1;
      } else {
        reverse = -1;
      }
      this.direction.y = Math.abs(this.direction.y) * reverse;
      if (this.salt_ok()) {
        this.direction.x = Math.random() - 0.5;
      }
    }
    if (this.crustacean === 1) {
      this.position.y = viewcontroller.canvas.height - 0.5 * viewcontroller.images[this.image].image.height - 120;
    }
    document.tank.waste += 0.02;
    if (Math.floor(Math.random() * 100) === 28) {
      this.direction.x = Math.random() - 0.5;
      return this.direction.y = Math.random() - 0.5;
    }
  };

  return Fish;

})();
