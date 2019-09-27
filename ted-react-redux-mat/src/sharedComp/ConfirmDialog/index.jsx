import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function ConfirmDialog(props) {
    const { open, title, text }  = props;
    const { handleCloseModal, confirmAction } = props; 

    const closeAndDoAction = () => {
        confirmAction();
        handleCloseModal();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCloseModal}
                aria-labelledby={"alert-dialog-title" + title}
                aria-describedby={"alert-dialog-description" + title}
            >
                <DialogTitle id={"alert-dialog-title" + title}>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: 'black'}} id={"alert-dialog-description" + title}>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={closeAndDoAction} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}