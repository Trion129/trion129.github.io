var softProjects = [[{
  head: "Box Shooter",
  link: "https://github.com/Trion129/Box-Shooter",
  image: "http://s31.postimg.org/t6mkj141n/UYs_Pmoo.jpg",
  tech: "Unity3D,C# & Javascript"
}]];

var frontProjects = [[{
  head: "Dungeon Crawler Game",
  link: "http://codepen.io/trion/full/wGROGd",
  image: "https://s31.postimg.org/n4jeijwfv/dungCrawler.jpg",
  tech: "React & Javascript"
}, {
  head: "FreeCodeCamp Leaderboard",
  link: "http://codepen.io/trion/full/xVJBLL",
  image: "http://s19.postimg.org/9bgupmeb7/Capture.jpg",
  tech: "React & Bootstrap"
}, {
  head: "Recipe Book",
  link: "http://codepen.io/trion/full/VaGaJW",
  image: "http://s19.postimg.org/olgpwt9tf/Recipe.jpg",
  tech: "React,Bootstrap & LocalStorage"
}], [{
  head: "Tribute to Neil deGrasse Tyson",
  link: "https://codepen.io/trion/full/VaWPrB",
  image: "http://s19.postimg.org/tavobz2sz/niel.jpg",
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

var fullProjects = [[{
  head: "Voting Webapp",
  link: "https://voting-trion.herokuapp.com/",
  image: "https://s31.postimg.org/qobedoo3v/voteapp.jpg",
  tech: "NodeJS, Mongodb, Jade & MVC Model"
}]];

var datavisProjects = [[{
  head: "Land-Surface Temperature Heatmap",
  link: "http://codepen.io/trion/full/RRRMzm",
  image: "https://s31.postimg.org/7llylfo57/heatmap.jpg",
  tech: "D3.js and JQuery"
}, {
  head: "Nation Contiguity Graph",
  link: "http://codepen.io/trion/full/pbEwOg",
  image: "https://s31.postimg.org/easi1g9h7/natcontiguity.jpg",
  tech: "D3.js and JQuery"
}, {
  head: "Meteorite Data Across World",
  link: "http://codepen.io/trion/full/LZRBom",
  image: "https://s31.postimg.org/bzl7incpn/meteor.jpg",
  tech: "D3.js and JQuery"
}]];
$('a[href^="#"]').on('click', function (event) {
    var target = $($(this).attr('href'));

    if (target.length) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

function checkScroll() {
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if ($(window).scrollTop() > startY) {
        $('.navbar').addClass("scrolled");
    } else {
        $('.navbar').removeClass("scrolled");
    }
}

if ($('.navbar').length > 0) {
    $(window).on("scroll load resize", function () {
        checkScroll();
    });
}

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
            if ($element.hasClass("redo")) $element.removeClass('in-view');
        }
    });
}

var currentTab = 0;

$animation_elements = $('.animation-element');
var ProjectView = React.createClass({
  displayName: "ProjectView",

  render: function () {
    var Projectrows = this.props.projects.map(function (projectRow, index) {
      return React.createElement(ProjectRow, { projectRow: projectRow, key: index });
    });
    return React.createElement(
      "div",
      null,
      Projectrows
    );
  }
});

var ProjectRow = React.createClass({
  displayName: "ProjectRow",

  render: function () {
    var projects = this.props.projectRow.map(function (project, index) {
      return React.createElement(Project, { key: index, project: project });
    });
    return React.createElement(
      "div",
      { className: "row text-center" },
      projects
    );
  }
});

var Project = React.createClass({
  displayName: "Project",

  render: function () {
    return React.createElement(
      "div",
      { className: "col-sm-3 portfolio-item" },
      React.createElement(
        "a",
        { href: this.props.project.link },
        React.createElement("img", { src: this.props.project.image, className: "img-responsive" }),
        React.createElement(
          "div",
          { className: "portfolio-caption" },
          React.createElement(
            "h4",
            null,
            this.props.project.head
          ),
          React.createElement(
            "p",
            { id: "small-text", className: "text-muted" },
            this.props.project.tech
          )
        )
      )
    );
  }
});

function changeTab(val) {
  switch (val) {
    case 0:
      ReactDOM.render(React.createElement(ProjectView, { projects: frontProjects }), document.getElementById('projectView'));
      break;
    case 1:
      ReactDOM.render(React.createElement(ProjectView, { projects: softProjects }), document.getElementById('projectView'));
      break;
    case 2:
      ReactDOM.render(React.createElement(ProjectView, { projects: apiProjects }), document.getElementById('projectView'));
      break;
    case 3:
      ReactDOM.render(React.createElement(ProjectView, { projects: fullProjects }), document.getElementById('projectView'));
      break;
    case 4:
      ReactDOM.render(React.createElement(ProjectView, { projects: datavisProjects }), document.getElementById('projectView'));
      break;
  }
}

changeTab(0);
