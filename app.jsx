import React from 'react';
import Navbar from './components/navbar/navbar.jsx';
import Footer from './components/footer/footer.jsx';

export default React.createClass({
  componentDidMount() {
    setTimeout(function() {
      this.splash.classList.add(`dismissed`);
      document.querySelector(`#app`).classList.add(`splash-dismissed`);
    }, 3000);
  },
  render() {
    return (
      <div>
        <div id="splash" ref={(splash) => { this.splash = splash; }}>
          <div className="container">
            <h1><img src="/assets/svg/pulse-wordmark.svg" width="200" alt="Mozilla Network Pulse" /></h1>
            <p>A stream of assets from peers across the Mozilla Network.</p>
          </div>
        </div>
        <Navbar router={this.props.router}/>
        <div id="main" className="container">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
});
