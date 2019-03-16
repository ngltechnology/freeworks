import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


function getModalStyle() {
    const top = 10;
    const left = 10;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.bachground.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class ModalApp extends React.Component {
    
    state = {
        open: false,
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        const { classes } = this.props;
        
        return (
            <div>
                <Typography gutterBottom>Click to get the full modal experience!</Typography>
                <Button onClick={this.handleOpen}>Open Modal</Button>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            text in a modal
                        </Typography>
                        <Typography variant="subtitle1" id="modal-description">
                            duis mollis, est non commodo luctus, nisi erat porttitot ligula.
                        </Typography>
                    </div>
                </Modal>
            </div>
        )
    }
}

Modal.prototype = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ModalApp);