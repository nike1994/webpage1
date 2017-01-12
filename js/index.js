function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}


$(document).ready(function(){
  $("body>section:nth-child(3)>div:nth-child(2) img").css({width: 0 , height:0});
	var controller = new ScrollMagic.Controller();
	new ScrollMagic.Scene({triggerElement: "#trigger1"})
					.setVelocity(".city>div", {left:"150vw"}, {duration: 1000})
					.addTo(controller);
  	new ScrollMagic.Scene({triggerElement: "#trigger2"})
          .setVelocity("body>section:nth-child(3)>div:nth-child(2) img", {  width: '10vw', height: "10vw"}, {duration: 1000})
          .addTo(controller);

	var obj = {n: 0};
  var svgs=$('.circle');
  //svgs.css({width:0, height:0});

	var tween = TweenMax.staggerFromTo(svgs,2,{width:"0"},{width:"100%", ease: Back.easeOut}, 0.15);

  new ScrollMagic.Scene({triggerElement: "#trigger3", duration: 300})
					.setTween(tween)
					.addTo(controller);


  $('.bxSlider').bxSlider({
    slideWidth: 300,
    minSlides: 2,
    maxSlides: 3,
    moveSlides: 1,
    slideMargin: 10,
    nextSelector: '#next',
    prevSelector: '#prev',
    nextText: "",
    prevText: "",
  });


  $('#Top').click(function(){
    $('html, body').animate({scrollTop : 0},900);
    return false;
  });

  for(var i=0; i<svgs.length;i++){
    var num=$($('.circle')[i]).children('g').children('text').children('tspan').text();
    num = num.slice(0,-1);
    var rec = 360*(num/100);
    $($('.circle')[i]).children('g').children('path').attr('d',describeArc(159.091,827.362, 175.93, 0, parseInt(rec)));
  }

});
