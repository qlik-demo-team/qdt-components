const styles = (theme) => ({
  modalContainer: {
    position: 'absolute',
    width: '90%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    padding: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modalHeader: {
    padding: 15,
    fontSize: '1.1em',
    fontWeight: 900,
    backgroundColor: theme.palette.grey[100],
    // width: '100%',
    width: 'auto',
    position: 'relative',
  },
  modalBody: {
    padding: 15,
    width: 'auto',
    position: 'relative',
  },
  modalFooter: {
    padding: 15,
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.grey[100],
    textAlign: 'right',
    position: 'relative',
    width: 'auto',
  },
});

export default styles;
