import React, { useState, useEffect, Component } from 'react';
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react';
const ToasterSep = (props) => {
    // const [visible, setVisible] = React.useState(10);
    // const [toasts, setToasts] = useState([
    //     { position: 'top-right', autohide: 3000, color: 'warning' }
    // ])

    // const [color] = useState('success')
    // const [position] = useState('top-right')
    // const [autohide] = useState(true)
    // const [autohideValue] = useState(5000)
    // const [closeButton] = useState(true)
    // const [fade] = useState(true)

    const { toastList} = props;
    const [list, setList] = useState(toastList);

    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);

    // const [toasts, setToasts] = useState([
    //     { position: 'top-right', autohide: 3000, color: 'warning' }
    // ])

    // const [color] = useState('success')
    // const [position] = useState('top-right')
    // const [autohide] = useState(true)
    // const [autohideValue] = useState(5000)
    // const [closeButton] = useState(true)
    // const [fade] = useState(true)



    // const addToast = (color) => {
    //     setToasts([
    //         ...toasts,
    //         { position, autohide: autohide && autohideValue, closeButton, fade, color: color }
    //     ])
    // }


    // const toasters = (() => {
    //     return toasts.reduce((toasters, toast) => {
    //         toasters[toast.position] = toasters[toast.position] || []
    //         toasters[toast.position].push(toast)
    //         return toasters
    //     }, {})
    // })()

    return (
        <>
            <CToaster
                position='top-right'
            >
                {
                    list.map((toast, i) =>
                        <CToast
                            className={`bg-${toast.color}`}
                            key={i}
                            autohide="5000"
                            show={true}
                            color={toast.color}
                        >
                          
                            <CToastHeader closeButton
                            className={`bg-${toast.color}`}  >
                                {toast.message}
                            </CToastHeader>
                        </CToast>
                    )}
            </CToaster>
        </>
    );
}
export default ToasterSep;
