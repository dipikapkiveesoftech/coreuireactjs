import React from 'react';
import PropTypes from 'prop-types';
import { CButton } from '@coreui/react';


const DButton = props => {
    const { label, className, handleClick ,color} = props;
    return (
        <>
            <CButton 
                className={className}
                color={color}
                onClick={handleClick}
            >
                {label}
            </CButton>
        </>
    );
}

DButton.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    handleClick: PropTypes.func
}

export default DButton;