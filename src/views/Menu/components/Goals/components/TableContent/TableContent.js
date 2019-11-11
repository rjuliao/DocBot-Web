import React, { useState} from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/styles';
import { Card, 
    CardContent, 
    Table, 
    TableHead, 
    TableCell, 
    TableRow, 
    TableBody,  
    CardActions,
    TablePagination,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button} from '@material-ui/core';
import { deleteGoal } from '../../../../../../services/api';


const useStyles = makeStyles(theme => ({
    root: {},
    content: {
      padding: 0
    },
    margin: {
      margin: theme.spacing(1),
    },
    inner: {
      minWidth: 1050
    },
    nameContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      marginRight: theme.spacing(2)
    },
    Button: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.white
    },
    actions: {
      justifyContent: 'flex-end'
    },
    tableRow: {
    }
}));


const TableContent = props => {
    const { className,history, goals, ...rest } = props;
  

    const classes = useStyles();

    const [selectedUsers] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
      setPage(page);
    };
  
    const handleRowsPerPageChange = event => {
      setRowsPerPage(event.target.value);
    };

    const handleDelete = () =>{
      deleteGoal( localStorage.getItem('temp2'))
      .then(response => {
        return response.json();
      })  
      .then(json => {
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error.message);
      });
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (desc, id) => {
      localStorage.setItem('temp1', desc)
      localStorage.setItem('temp2', id)
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

      
    return (
      <div>
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent className={classes.content}>
            <PerfectScrollbar>
                <div className={classes.inner}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Inicio</TableCell>
                        <TableCell>Termina</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Frecuencia</TableCell>
                        <TableCell>Progreso de la meta</TableCell>
                        <TableCell>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {goals.slice(0, rowsPerPage).map(goal => (
                        <TableRow
                          className={classes.tableRow}
                          hover
                          key={goal.id}
                          selected={selectedUsers.indexOf(goal.id) !== -1}
                        >
                          <TableCell align="center">              
                            {moment(goal.creationDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="center">              
                            {moment(goal.dueDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell component="th"  align="center" scope="row">
                            {goal.description}
                          </TableCell>
                          <TableCell align="center">
                            {goal.state==='2'?"Asigando":"Cumplida"} 
                          </TableCell>
                          <TableCell align="center">
                            {goal.quantity}
                          </TableCell>
                          <TableCell align="center">
                            {goal.frequency==='1'? "Cada Hora":
                            (goal.frequency==='2'?"Diariamente":
                            (goal.frequency==='3'?"Semanalmente":"Mensualmente"))} 
                          </TableCell>
                          <TableCell align="center">
                            {(goal.progress/goal.quantity)*100}%
                          </TableCell>
                          <TableCell  align="center">
                            <IconButton aria-label="delete" onClick={()=>handleClickOpen(goal.description, goal._id)}>
                              <DeleteForeverIcon fontSize="large" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </div>
            </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
            <TablePagination
                component="div"
                count={goals.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            </CardActions>
      </Card>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Eliminar meta
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h4" gutterBottom>
            ¿Esta seguro que desea eliminar la meta: {localStorage.getItem('temp1')}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" className={classes.Button} onClick={()=>handleDelete()} >
            Eliminar
          </Button>
          <Button autoFocus variant="contained"  color="primary" onClick={handleClose} >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
  };
  
  TableContent.propTypes = {
    className: PropTypes.string
  };
  
  export default TableContent;