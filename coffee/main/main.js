// Generated by CoffeeScript 1.6.2
var tick, viewcontroller;

viewcontroller = new ViewController;

viewcontroller.loadImages('spritesheet.png', 'overlay.png', 'npc.png', 'minimenu_top.png', 'minimenu_bottom.png');

viewcontroller.loadMap('lecturehall');

viewcontroller.stack.push(new OverlayCanvasController('Hello, world!'));

document.viewcontroller = viewcontroller;

tick = function() {
  viewcontroller.tick();
  return setTimeout(tick, viewcontroller.timestep);
};

tick();