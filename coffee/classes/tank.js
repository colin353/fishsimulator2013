// Generated by CoffeeScript 1.6.2
var Tank;

Tank = (function() {
  function Tank(image) {
    this.image = image;
    this.waterimage = 'waterline.png';
    this.temperature = 75;
    this.salt = 0;
    this.supply = 100;
    this.waste = 0;
    this.waterline = 100;
    this.pixelwaterline = (this.waterline - 100) * 400 + this.pixelwaterline;
    viewcontroller.loadImages(image, this.waterimage);
  }

  Tank.prototype.tick = function() {
    viewcontroller.renderSprite(this.image, 0, 0, 1.2);
    this.pixelwaterline = (100 - this.waterline) * 100 + 50;
    viewcontroller.renderSprite(this.waterimage, 0, this.pixelwaterline, 1.2);
    viewcontroller.renderSprite(this.waterimage, 400, this.pixelwaterline, 1.2);
    this.temperature -= (this.temperature - 60) * 0.1;
    $("#tank_supply").css('width', this.supply + '%');
    $("#tank_salt").css('width', this.salt + '%');
    $("#tank_waste").css('width', this.waste + '%');
    return $("#tank_temperature").css('width', ((this.temperature - 45) * (20 / 9)) + '%');
  };

  return Tank;

})();
