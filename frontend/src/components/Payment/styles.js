import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    picture: {
        [theme.breakpoints.down('md')]: {
            height: "auto"
        },
        [theme.breakpoints.up('lg')]: {
            height: "350px"
        },

    },
}));