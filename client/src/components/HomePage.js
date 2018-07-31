import React, { Component } from 'react';
import Menu from './Menu.js';
import Profile from './profile.js';
import Footer from './Footer.js';
import HomeSwitch from './HomeSwitch.js';
import Media from "react-media";

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
        shown: true,
    };
  }

 toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

  render() {
    var shown = { display: this.state.shown ? "block" : "none" };
		var hidden = { display: this.state.shown ? "none" : "block" };
    return (
      <div className="HomePage">
              <Menu />
              <div className={"Main"+(this.state.showProfile ? '' : ' hideProfile')}>
                    <div>
                          <div style={ shown }>
                          <Profile />
                          </div>

                          <h2 style={ hidden }></h2>
                          <Media query="(max-width: 998px)">
                                <button onClick={this.toggle.bind(this)}>Toggle</button>
                          </Media>
                    </div>
                    <HomeSwitch match={this.props.match}/>
              </div>
              <Footer />
      </div>
    );
  }
}

export default HomePage;
