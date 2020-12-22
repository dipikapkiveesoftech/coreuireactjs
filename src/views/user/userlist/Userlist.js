import React, { useState, useEffect, Component } from 'react'
import { useHistory, useLocation, Redirect, Link } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ToasterSep from '../../../reusable/ToasterSep';
import moment from "moment";

export default class Userlist extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      setData: [],
      pageChange: '',
      showModal: false,
      dltId: '',
      list: [],
      pagination: {},
      isShowToast: false,
      limit : 5
    }
    this.getUserList();
  }

  getUserList() {
    // fetch('http://localhost:3000/api/v1/users?page=' + this.state.currentPage, {
      fetch('http://localhost:3000/api/v1/users', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {
        if (data.statuscode === 200) {
          this.setState({ setData: data.data.docs, pagination: data.data})
        }
      })
  }

  // setActivepage(activepg){
  //     this.setState({ currentPage : activepg})
  //     fetch('http://localhost:3000/api/v1/users?page=' + activepg, {
  //     method: 'GET'
  //   })
  //     .then(response => response.json())
  //     .then((data) => {
  //       if (data.statuscode === 200) {
  //         this.setState({ setData: data.data.docs, pagination: data.data})
  //       }
  //     })
  // }

  onTblPageChange(){
    console.log("Hello Change");
  }
  // clearfilter() {
  //   // this.spage = 1;
  //   // this.search = '';
  //   // this.limit = 10;
  //   this.setState({ activepage : 1, limit : 10})
  //   this.getUserlist(this.state.activepage);
  // }

  deleteRecord(itemId) {
    fetch('http://localhost:3000/api/v1/users/' + itemId, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then((data) => {
        this.setState({
          list: [{
            color: "success",
            message: data.message
          }]
        })
        this.setState({ showModal: false, isShowToast: true })
      })
  }
  render() {
    return (
      <CRow>
        {this.state.isShowToast ? <ToasterSep toastList={this.state.list} /> : null}
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Users
            <small className="text-muted"> example</small>
              <Link to="/user/adduserlist">
                <CButton color="dark" className="float-right" active tabIndex={-1}>
                  <CIcon name="cil-plus" color="white" />
                  Add
              </CButton>
              </Link>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={this.state.setData}
                fields={[
                  { key: 'name', _classes: 'font-weight-bold' },
                  'email', 'mobile', 'role', 'lastLogin', 'Action'
                ]}
                columnFilter
                tableFilter
                hover
                sorter
                striped
                pagination
                align="center"
                clickableRows
                itemsPerPageSelect
                itemsPerPage={5}
                // onRowClick={(item) => this.props.history.push(`/user/userdetail/${item.id}`)}
                scopedSlots={{
                  'Action':
                    (item) => (
                      <td>
                        <Link to={`/user/userdetail/${item.id}`}><CButton active tabIndex={-1}><CIcon name="cil-Ethernet" /></CButton></Link>
                        <Link to={`/user/edituserlist/${item.id}`}><CButton active tabIndex={-1}><CIcon name="cil-Pencil" /></CButton></Link>
                        <CButton onClick={() => this.setState({ showModal: true, dltId: `${item.id}` })} ><CIcon name="cil-Trash" /></CButton>
                      </td>
                    ),
                  'lastLogin':
                    (item) => (
                      <td>
                        {/* { (new Date(item.lastLogin)).toDateString } */}
                        {moment(item.lastLogin).format('d MMM yy')}
                      </td>
                    )
                }}
              />
            </CCardBody>
            {/* <CCardFooter>
              <CPagination
                activePage={this.state.currentPage}
                pages={this.state.pagination.totalPages}
                size="lg"
                align="center"
                onActivePageChange={(i) => this.setActivepage(i)}
              ></CPagination>
            </CCardFooter> */}
            <CModal
              show={this.state.showModal}
              onClose={() => this.setState({ showModal: false })}
              size="sm"
              color="dark"
            >
              <CModalHeader closeButton>
                <CModalTitle>Delete record</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Are you sure want to delete record...{this.state.dltId}?
                              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => this.deleteRecord(this.state.dltId)}>Delete</CButton>{' '}
                <CButton color="secondary" onClick={() => this.setState({ showModal: false })}>Cancel</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}
