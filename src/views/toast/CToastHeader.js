import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CButton } from '@coreui/react'

import { Context } from './CToast'

//component - CoreUI / CToastHeader
const CToastHeader = props => {

  const {
    className,
    children,
    //
    innerRef,
    closeButton,
    ...attributes
  } = props

  const { close } = useContext(Context)
  
  //render
  const classes = classNames(
    'toast-header', className
  )

  return (
    <div className={classes} {...attributes} ref={innerRef}>
      { children }
      { closeButton && 
        <CButton className="ml-auto" onClick={close}/>}
    </div>
  )
}

CToastHeader.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  children: PropTypes.node,
  //
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  closeButton: PropTypes.bool
};

CToastHeader.defaultProps = {
  closeButton: true
};

export default CToastHeader
