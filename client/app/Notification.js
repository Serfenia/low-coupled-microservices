import React, {PropTypes} from 'react';
import {Snackbar} from 'material-ui';

import {connect} from 'react-redux';

function Notification(props) {
    return (
        <Snackbar
            open={!!props.notification.message}
            message={props.notification.message}
            autoHideDuration={6000}
        />
    )
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired
};

export default connect(({notification = {}}) => {
    return { notification };
}, null)(Notification);