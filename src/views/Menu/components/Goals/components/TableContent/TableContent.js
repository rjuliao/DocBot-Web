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
    IconButton} from '@material-ui/core';
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
    actions: {
      justifyContent: 'flex-end'
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

    const handleDelete = id =>{
      deleteGoal(id)
      .then(response => {
        return response.json();
      })  
      .then(json => {
        history.push('./menu')
      })
      .catch(error => {
        console.log(error.message);
      });
    }
    
    return (
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
                          <TableCell>              
                            {moment(goal.cretationDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell>              
                            {moment(goal.dueDate).format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {goal.description}
                          </TableCell>
                          <TableCell>
                            {goal.state==='2'?"Asigando":"Cumplida"} 
                          </TableCell>
                          <TableCell>
                            {goal.quantity}
                          </TableCell>
                          <TableCell>
                            {goal.frequency==='1'? "Cada Hora":
                            (goal.frequency==='2'?"Diariamente":
                            (goal.frequency==='3'?"Semanalmente":"Mensualmente"))} 
                          </TableCell>
                          <TableCell>
                            {(goal.progress/goal.quantity)*100}%
                          </TableCell>
                          <TableCell>
                            <IconButton aria-label="delete" onClick={()=>handleDelete(goal._id)}>
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
    );
  };
  
  TableContent.propTypes = {
    className: PropTypes.string
  };
  
  export default TableContent;