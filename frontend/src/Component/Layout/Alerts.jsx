import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

const Alert = ({ alerts }) => {

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (

        alerts != null && alerts.length > 0 &&

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header style={{ backgroundColor: '#FEF9E7'}} closeButton>
                <Modal.Title style={{ fontSize: 25}}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    alerts.map(alert => (
                        <li key={alert.id} className={`alert alert-${alert.alertType}`}>
                            {alert.msg}
                        </li>
                    ))
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}> Close </Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alertState
    }
}

export default connect(mapStateToProps, null)(Alert);