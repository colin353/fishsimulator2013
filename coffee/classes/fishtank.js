// Generated by CoffeeScript 1.6.2
var FishTankCanvasController;

FishTankCanvasController = (function() {
  function FishTankCanvasController() {
    this.relinquishcontrol = false;
    this.fishes = [];
    this.fishes.push(new Fish('clownfish.json'));
    this.fishes.push(new Fish('minnow.json'));
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
