import React, { Component } from 'react';       //import react and react components
import './footer.css';
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer id="footer">
        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>Team Apex</span></strong>. All Rights Reserved
          </div>
          <div className="credits">

            Designed by Team Apex
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer;