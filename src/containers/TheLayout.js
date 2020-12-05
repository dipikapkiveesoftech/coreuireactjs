import React, { Component } from 'react';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { CSpinner } from '@coreui/react';

export default class TheLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
       isLoaded: false
    }
 }

  // componentWillMount() {
  //   setTimeout(function () { //Start the timer
  //     this.setState({ isLoaded: true }) //After 1 second, set render to true
  //   }.bind(this), 2000)
  // }
  render() {
    // if (this.state.isLoaded) {
      return (
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div>
      )
    // } else {
    //   return (
    //     <CSpinner className="overlay" position="top-center" animation="grow" variant="warning" size="lg" color="warning" />
    //   )
    // }
  }
}