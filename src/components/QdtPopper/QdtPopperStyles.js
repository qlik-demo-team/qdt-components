
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popper: { zIndex: 9999999 },
  popperPaper: {
    backgroundColor: theme.palette.common.white,
    marginTop: 10,
    background: '#88b7d5',
    border: `1px solid ${theme.palette.grey[300]}`,
    minWidth: 200,
    width: 234,
    maxHeight: 332,
    overflow: 'auto',
    '&::after': {
      bottom: 'calc(100% - 11px)',
      left: '50%',
      border: 'solid transparent',
      content: '""',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',

      borderColor: 'rgba(136, 183, 213, 0)',
      borderBottomColor: theme.palette.grey[300],
      borderWidth: 10,
      marginLeft: -10,
    },
    '&::before': {
      bottom: 'calc(100% - 11px)',
      left: '50%',
      border: 'solid transparent',
      content: '""',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',

      borderColor: 'rgba(194, 225, 245, 0)',
      borderBottomColor: theme.palette.grey[300],
      borderWidth: 11,
      marginLeft: -11,
    },
  },
}));

export default useStyles;
