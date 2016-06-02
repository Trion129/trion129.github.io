'use strict';

$('a[href^="#"]').on('click', function (event) {
  var target = $($(this).attr('href'));

  if (target.length) {
    event.preventDefault();
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
  }
});

$('.switchbuttons').on('click', function () {
  $('.switchbuttons').removeClass("enabled");
  $(this).addClass("enabled");
});

var $animation_elements = $('.animation-element');
var $window = $(window);
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');
function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = window_top_position + window_height;

  $.each($animation_elements, function () {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = element_top_position + element_height;

    //check to see if this current container is within viewport
    if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

var softProjects = [[{
  head: "Box Shooter",
  link: "https://github.com/Trion129/Box-Shooter",
  image: "http://s31.postimg.org/t6mkj141n/UYs_Pmoo.jpg",
  tech: "Unity3D,C# & Javascript"
}]];

var frontProjects = [[{
  head: "Game of Life",
  link: "http://codepen.io/trion/pen/ZWMNMP",
  image: "http://s19.postimg.org/9qs4in08j/gameoflife.jpg",
  tech: "React & Bootstrap"
}, {
  head: "FreeCodeCamp Leaderboard",
  link: "http://codepen.io/trion/pen/xVJBLL",
  image: "http://s19.postimg.org/9bgupmeb7/Capture.jpg",
  tech: "React & Bootstrap"
}, {
  head: "Recipe Book",
  link: "http://codepen.io/trion/pen/VaGaJW",
  image: "http://s19.postimg.org/olgpwt9tf/Recipe.jpg",
  tech: "React,Bootstrap & LocalStorage"
}], [{
  head: "Tribute to Dr. Norman",
  link: "https://codepen.io/trion/full/VaWPrB",
  image: "http://s31.postimg.org/jalhjdy9n/1n_XTOre.jpg",
  tech: "Bootstrap & CSS"
}, {
  head: "Simon Game",
  link: "http://codepen.io/trion/full/LNmRZE",
  image: "http://s19.postimg.org/5jzbzbz77/simon.jpg",
  tech: "Javascript,JQuery and audio API"
}, {
  head: "Tic Tac Toe Game",
  link: "http://codepen.io/trion/full/BKYbQL",
  image: "http://s19.postimg.org/4f59tycqb/tictactoe.jpg",
  tech: "Javascript and JQuery"
}], [{
  head: "Random Quote Generator",
  link: "http://codepen.io/trion/full/KzvjWL",
  image: "http://s19.postimg.org/lbyy049o3/quotegen.jpg",
  tech: "Javascript,JQuery and Quote API"
}, {
  head: "Weather App",
  link: "http://codepen.io/trion/full/ZWXKJM",
  image: "http://s19.postimg.org/ny9v3bbhv/weather.jpg",
  tech: "Javascript,JQuery and OpenWeather API"
}, {
  head: "Wikipedia Viewer",
  link: "http://codepen.io/trion/full/PNJxzE",
  image: "http://s19.postimg.org/cczovlq0j/Wikipedia_API.jpg",
  tech: "Javascript,JQuery and Wikipedia API"
}]];

var apiProjects = [[{
  head: "Url Shortener",
  link: "https://shorturl-trion129.herokuapp.com/",
  image: 'None',
  tech: "NodeJS & Express"
}, {
  head: "Image Search",
  link: "https://imagesearch-trion.herokuapp.com/query",
  image: 'None',
  tech: "NodeJS, Express & Bing Search API"
}, {
  head: "Header Parser",
  link: "https://headerparse-trion129.herokuapp.com/",
  image: 'None',
  tech: "NodeJS & Express"
}], [{
  head: "Timestamp Microservice",
  link: "https://github.com/Trion129/Timestamp-Microservice",
  image: "None",
  tech: "NodeJS"
}]];

var backProjects = [];

var currentTab = 0;

var ProjectView = React.createClass({
  displayName: 'ProjectView',

  render: function render() {
    var Projectrows = this.props.projects.map(function (projectRow, index) {
      return React.createElement(ProjectRow, { projectRow: projectRow, key: index });
    });
    return React.createElement(
      'div',
      null,
      Projectrows
    );
  }
});

var ProjectRow = React.createClass({
  displayName: 'ProjectRow',

  render: function render() {
    var projects = this.props.projectRow.map(function (project, index) {
      return React.createElement(Project, { key: index, project: project });
    });
    return React.createElement(
      'div',
      { className: 'row text-center' },
      projects
    );
  }
});

var Project = React.createClass({
  displayName: 'Project',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'col-sm-3 portfolio-item animation-element' },
      React.createElement(
        'a',
        { href: this.props.project.link },
        React.createElement('img', { src: this.props.project.image, className: 'img-responsive' })
      ),
      React.createElement(
        'div',
        { className: 'portfolio-caption' },
        React.createElement(
          'h4',
          null,
          this.props.project.head
        ),
        React.createElement(
          'p',
          { id: 'small-text', className: 'text-muted' },
          this.props.project.tech
        )
      )
    );
  }
});

function changeTab(val) {
  switch (val) {
    case 0:
      ReactDOM.render(React.createElement(ProjectView, { projects: frontProjects }), document.getElementById('projectView'));
      $animation_elements = $('.animation-element');
      break;
    case 1:
      ReactDOM.render(React.createElement(ProjectView, { projects: softProjects }), document.getElementById('projectView'));
      $animation_elements = $('.animation-element');
      break;
    case 2:
      ReactDOM.render(React.createElement(ProjectView, { projects: apiProjects }), document.getElementById('projectView'));
      $animation_elements = $('.animation-element');
      break;
    case 3:
      ReactDOM.render(React.createElement(ProjectView, { projects: backProjects }), document.getElementById('projectView'));
      $animation_elements = $('.animation-element');
      break;
  }
}

changeTab(0);