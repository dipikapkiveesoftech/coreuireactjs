import React, { useState, Component } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import usersData from '../../users/UsersData';
import moment from 'moment';

export default class Userdetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/users/' + this.props.match.params.id)
      .then(response => response.json())
      .then((data) => {
        this.setState({ userDetails: data })
      })
  }

  render() {
    return (
      <CRow>
        <CCol lg={6}>
          <CCard>
            <CCardHeader>
              User Detail
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td><strong>{this.state.userDetails.name}</strong></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td><strong>{this.state.userDetails.email}</strong></td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td><strong>{this.state.userDetails.mobile}</strong></td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td><strong>{this.state.userDetails.role}</strong></td>
                  </tr>
                  <tr>
                    <td>Last Login</td>
                    <td><strong>{moment(this.state.userDetails.lastLogin).format('d MMM yy')}</strong></td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    )
  }
}
