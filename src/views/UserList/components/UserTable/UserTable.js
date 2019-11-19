import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Fab
} from '@material-ui/core';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import {  getMedicalInfos } from '../../../../services/api';

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

const UserTable = props => {
  const { className, history, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  

 /**
   * Esto debe ser cambiado!!
   * @param {*} userr 
   */
  const handleUser = userr =>{
    localStorage.removeItem('p_id');
    localStorage.removeItem('p_Name');
    localStorage.removeItem('p_lName');
    localStorage.removeItem('p_medicalCenter');
    localStorage.removeItem('p_dateAssociation');
    localStorage.removeItem('p_birthdate');
    localStorage.removeItem('p_documentType');
    localStorage.removeItem('p_documentNumber');
    localStorage.removeItem('p_weight');
    localStorage.removeItem('p_height');
    localStorage.removeItem('p_clinicalContext');
    localStorage.removeItem('p_sex');
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_clinicalC');
    localStorage.removeItem('p_mecialC');
    localStorage.removeItem('p_isDiabetic');

    

    localStorage.setItem('p_id', userr._id);
    localStorage.setItem('p_Name', userr.name);
    localStorage.setItem('p_lName', userr.lastName);
    localStorage.setItem('p_age', userr.age);
    localStorage.setItem('p_email', userr.email);
    localStorage.setItem('p_dateAssociation', userr.dateAssociation);
    localStorage.setItem('p_birthdate', userr.birthdate);
    localStorage.setItem('p_documentType', userr.documentType);
    localStorage.setItem('p_documentNumber', userr.documentNumber);
    localStorage.setItem('p_sex', userr.sex);

    setTimeout(function(){

      getMedicalInfos(userr._id)
      .then(response => {
        return response.json();
      })  
      .then(json => {
        console.log(json)
        var l = json.weight.length
        var w = json.weight[l-1]
        var oldv = 0
  
        if (l>1){
          var old = json.weight[l-2];
          oldv = old.value
        }
        if (l <= 1){
          oldv = 0
          
        }
        localStorage.setItem('p_vtf', json.testFindRisk);
        localStorage.setItem('p_clinicalC', json.clinicalContext);
        localStorage.setItem('p_mecialC', json.medicalCenter);
        localStorage.setItem('p_isDiabetic', json.isDiabetic);  
        localStorage.setItem('p_wold', oldv);
        localStorage.setItem('p_height', json.height);
        localStorage.setItem('p_weight', w.value);
        history.push('/menu')
      })
      .catch(error => {
        console.log(error.message);
      });

    }, 500);

  }

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

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
                    <TableCell> </TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo electronico</TableCell>
                    <TableCell>Edad</TableCell>
                    <TableCell>Fecha de Registro</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {users.slice(0, rowsPerPage).map(user => (
                    <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                        selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                        <TableCell>
                            <Fab size="small" color="primary" aria-label="add" onClick={()=>handleUser(user)} className={classes.margin}>                              
                              <AccessibilityIcon />
                            </Fab>
                        </TableCell>
                        <TableCell>              
                          <Typography variant="body1">{user.name} {user.lastName}</Typography>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.age} años</TableCell>
                        <TableCell>
                          {user.dateAssociation}
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
          count={users.length}
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

UserTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default withRouter(UserTable);