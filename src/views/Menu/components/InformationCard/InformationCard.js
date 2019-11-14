import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { 
    Grid, 
    Button, 
    Fab, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import TestIcon from '@material-ui/icons/FormatListBulleted'
import { detelePatient } from '../../../../services/api';
import { Information, EditInfo } from './componentes';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor : "#F4F6F8"
    },
    title: {
        marginBottom: '10px',
        color: '#1438A6'

    },
    subttitle: {
        marginBottom: '5px'
    },
    infoTop: {
        marginTop: '10px',
        color: "#3F51B5"
    },
    info: {
        margin: '10px',
        padding: 'initial'
    },    
    Button: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.white
    },
    icons: {
        marginRight: theme.spacing(2),
    }
}));




const InformationCard = props => {
    const classes = useStyles(); 

    //----------------------------------------------------------------------------------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = () =>{
        
        detelePatient(localStorage.getItem("p_id"))
        .then(response => {
            return response.json();
        })  
        .then(json => {
        })
        .catch(error => {
            console.log(error.message);
        });
    }
    
    
    
    return(
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Information/>
                </Grid>
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                >
                    <Fab variant="extended"  color="primary" aria-label="add" onClick={handleClickOpen} className={classes.margin}>
                        <DeleteIcon className={classes.icons} />
                         Eliminar Paciente
                    </Fab>
                </Grid>
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                >
                   <EditInfo/>
                </Grid>
                <Grid
                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                >
                    <RouterLink 
                        to={"/findrisk"}
                    >
                        <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                            <TestIcon className={classes.icons}/>
                            Aplicar FindRisk
                        </Fab>
                    </RouterLink>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Eliminar Paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Esta seguro que desea eliminar a  {localStorage.getItem('p_Name')} {localStorage.getItem('p_lName')}
                         de sus registros?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <RouterLink
                        to={'/pacientes'}
                    >
                        <Button className={classes.Button} variant="contained" onClick={() => handleDelete()} color="primary">
                            Eliminar
                        </Button>
                    </RouterLink>
                    <Button onClick={handleClose} variant="contained" color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
           
        </div>
    );
}


export default withRouter(InformationCard);