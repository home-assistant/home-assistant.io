// ====== sly slider init !!!
(function () {
    var $frame = $("#cycleitems");
    var $wrap = $frame.parent();
  
    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: "basic",
      smart: 1,
      activateOn: "",
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $wrap.find(".scrollbar"),
      scrollBy: 1,
      speed: 2000,
      elasticBounds: 1,
      easing: "easeOutExpo",
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
  
      // Cycling
      cycleBy: "items",
      cycleInterval: 5000,
      pauseOnHover: 1,
  
      // Buttons
      prev: $wrap.find(".prev"),
      next: $wrap.find(".next"),
    });
  
    // Pause button
    $wrap.find(".pause").on("click", function () {
      $frame.sly("pause");
    });
  
    // Resume button
    $wrap.find(".resume").on("click", function () {
      $frame.sly("resume");
    });
  
    // Toggle button
    $wrap.find(".toggle").on("click", function () {
      $frame.sly("toggle");
    });
})();

const itemScroll = document.querySelector('#itemScroll');
var isDown = false;
var startX;
var scrollLeft;
var isMoved = false;

itemScroll.addEventListener('mousedown', (e) => {
  isDown = true;
  isMoved = false;
  
  startX = e.pageX - itemScroll.offsetLeft;
  scrollLeft = itemScroll.scrollLeft;
});
itemScroll.addEventListener('mouseleave', () => {
  isDown = false;
});
itemScroll.addEventListener('mouseup', () => {
  isDown = false;
});
itemScroll.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  isMoved = true;
  e.preventDefault();
  const x = e.pageX - itemScroll.offsetLeft;
  itemScroll.scrollLeft = scrollLeft - (x - startX);
});

const items = document.querySelectorAll('#item');
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', function(e) {
    if(!isMoved) return;
    e.stopImmediatePropagation();
  });
}