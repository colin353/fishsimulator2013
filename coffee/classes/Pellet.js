// Generated by CoffeeScript 1.6.2
var Pellet;

Pellet = (function() {
  function Pellet(filename) {
    this.filename = filename;
    this.pellet_raw = sync_get('game/assets/' + filename);
    if (this.pellet_raw.name == null) {
      alert("Illegal Pellet \"" + filename + "\"");
    }
    this.image = this.pellet_raw.image;
    viewcontroller.loadImages(this.image);
    this.position = {
      x: 0,
      y: 0
    };
    this.scale = 0.2;
    if (this.pellet_raw.scale != null) {
      this.scale = this.pellet_raw.scale;
    }
  }

  Pellet.prototype.tick = function() {
    viewcontroller.renderSprite(this.image, this.position.x, this.position.y, this.scale);
    if (this.position.y < viewcontroller.canvas.height - 0.5 * viewcontroller.images[this.image].image.height - 50) {
      return this.position.y += 4;
    }
  };

  return Pellet;

})();
