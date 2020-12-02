import React, { useEffect, useState, createRef } from 'react'
import { useDispatch,connect } from 'react-redux'
import {
   CBadge,
   CButton,
   CButtonGroup,
   CCard,
   CCardBody,
   CCardFooter,
   CCardHeader,
   CCol,
   CProgress,
   CRow,
   CCallout
 } from '@coreui/react'
class Colors extends React.Component {

  render() {
     const {counter,increment,decrement,reset} = this.props;
     return (
        <div className = "App">
           <div>{counter}</div>
           <div>
              <CButton color="primary" onClick = {increment}>INCREMENT BY 1</CButton>
           </div>
           <div>
              <CButton color="primary" onClick = {decrement}>DECREMENT BY 1</CButton>
           </div>
           <CButton color="primary" onClick = {reset}>RESET</CButton>
        </div>
     );
  }
}
export default Colors;