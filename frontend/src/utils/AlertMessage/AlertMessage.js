import Alert from "react-bootstrap/Alert";

export const AlertMessage = ({ type, message, handleClose, show }) => {
    const handleAlertClose = () => {
        if (handleClose) {
            handleClose(); // Call the onClose prop passed from the parent
        }
    };

    return (
        <Alert
            variant={type}
            onClose={handleAlertClose}
            show={show}
            dismissible
        >
            <div>{message}</div>
        </Alert>
    );
};
