import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            justifyContent: "center"
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: "flex-end"
        }
    },


}));