// Generated by CoffeeScript 1.6.2
var Machine;

Machine = (function() {
  function Machine(filename) {
    this.filename = filename;
    this.machine_raw = sync_get('game/assets/machines/' + filename);
    this.type = "machine";
    if (this.machine_raw.name == null) {
      alert("Illegal Machine \"" + filename + "\"");
    }
    this.name = this.machine_raw.name;
    if (this.machine_raw.description) {
      this.description = this.machine_raw.description;
    }
    this.image = this.machine_raw.image;
    viewcontroller.loadImages(this.image);
    this.position = {
      x: 0,
      y: 0
    };
    this.scale = 0.2;
    if (this.machine_raw.scale != null) {
      this.scale = this.machine_raw.scale;
    }
  }

  Machine.prototype.tick = function() {
    viewcontroller.renderSprite(this.image, this.position.x, this.position.y, this.scale);
    if (this.machine_raw.waste_filtered != null) {
      return document.tank.waste -= 0.005 * document.tank.waste * this.machine_raw.waste_filtered;
    }
  };

  return Machine;

})();
