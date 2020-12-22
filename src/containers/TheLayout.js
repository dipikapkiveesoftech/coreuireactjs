import React, { Component } from 'react';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import { CSpinner } from '@coreui/react';
import Cspinner from '../reusable/CSpinner';

export default class TheLayout extends Component {

  constructor() {
    super()
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true })
    }, 1000)
  }

  render() {
    if (this.state.loading) {
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
    } else {
      return (
        <div>
          <Cspinner />
        </div>
      )
    }
  }
}