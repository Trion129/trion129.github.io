require("../css/reset.css")
require("../css/style.css")
let $ = require("jquery")
require("jquery-touchswipe")
const p5 = require("p5")

let currentCareer = 1
let accumulator = 0

function setCareerScroll(currentCareer, direction){
  let backCareer, newCurrentCareer, nextCareer
  switch(direction){
    case 0:
      backCareer = currentCareer
      newCurrentCareer = (currentCareer + 1) % 9
      nextCareer = (currentCareer + 2) % 9
      break;
    case 1:
      backCareer = currentCareer - 2
      newCurrentCareer = currentCareer - 1
      nextCareer = currentCareer

      backCareer = backCareer < 0 ? (9 + backCareer):backCareer
      newCurrentCareer = newCurrentCareer < 0 ?
                         (9 + newCurrentCareer):
                         newCurrentCareer
      break;
  }

  $('.selected-before, .selected, .selected-after')
    .removeClass('selected-before')
    .removeClass('selected')
    .removeClass('selected-after')

  $("#career-" + backCareer).addClass('selected-before')
  $("#career-" + newCurrentCareer).addClass('selected')
  $("#career-" + nextCareer).addClass('selected-after')  
  
  return newCurrentCareer
}

$(window).on('wheel', function(event){
  accumulator += 1

  if(event.originalEvent.deltaY < 0 && accumulator >= 2){
    // wheeled up
    currentCareer = setCareerScroll(currentCareer, 1)
    accumulator = 0
  }
  else if(event.originalEvent.deltaY > 0 && accumulator >= 2) {
    // wheeled down
    currentCareer = setCareerScroll(currentCareer, 0)
    accumulator = 0
  }
});

$(window).swipe({
  swipe: (e, direction) => {
    switch(direction){
      case 'up':
        currentCareer = setCareerScroll(currentCareer, 1)
        break
      case 'down':
        currentCareer = setCareerScroll(currentCareer, 0)
        break
    }
  }
});