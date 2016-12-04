var ProjectView = React.createClass({
  render: function(){
    var Projectrows = this.props.projects.map(
      function(projectRow,index){
        return <ProjectRow projectRow = {projectRow} key={index} />;
      }
    );
    return(
      <div>
          {Projectrows}
      </div>
    );
  }
});

var ProjectRow = React.createClass({
  render: function(){
    var projects = this.props.projectRow.map(
      function(project,index){
        return <Project key = {index} project = {project}/>
      }
    )
    return(
      <div className="row text-center">
        {projects}  
      </div>
    )
  }
});

var Project = React.createClass({
  render: function(){
    return (
      <div className="col-sm-3 portfolio-item">
        <a href={this.props.project.link}>
          <img src={this.props.project.image} className="img-responsive" />
        <div className="portfolio-caption">
          <h4>{this.props.project.head}</h4>
          <p id="small-text" className="text-muted">{this.props.project.tech}</p>
        </div>
        </a>
      </div>
    )
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