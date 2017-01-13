import React from 'react';
import ProjectCard from '../components/project-card/project-card.jsx';

export default React.createClass({
  componentWillMount() {
    console.log(`window.__PRELOADED_STATE__ =`, window.__PRELOADED_STATE__);
  },
  render() {
    console.log(`this.props`,this.props);
    console.log(`this.context`,this.context);

    return (
      <div>
        <ProjectCard id={`10000`}
                   title={`hello world 123 omg test`}
                   description={`im the description`}
                  />
      </div>
    );
  }
});
