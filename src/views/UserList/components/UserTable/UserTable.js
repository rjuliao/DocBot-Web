import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
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
import { getFindriskVal, getMedicalInfos } from '../../../../services/api';

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
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

    /**
   * Esto debe ser cambiado!!
   * @param {*} user 
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
    localStorage.removeItem('p_vtf');
    localStorage.removeItem('p_clinicalC');
    localStorage.removeItem('p_mecialC');
    localStorage.removeItem('p_isDiabetic');

    var l = userr.weight.length
    var w = userr.weight[l-1]

    if (l>1){
      var old = userr.weight[l-2];
      var oldv = old.value
    }
    if (l <= 1){
      var oldv = 0
      
    }

    localStorage.setItem('p_id', userr._id);
    localStorage.setItem('p_Name', userr.name);
    localStorage.setItem('p_lName', userr.lastName);
    localStorage.setItem('p_age', userr.age);
    localStorage.setItem('p_dateAssociation', userr.dateAssociation);
    localStorage.setItem('p_birthdate', userr.birthdate);
    localStorage.setItem('p_documentType', userr.documentType);
    localStorage.setItem('p_documentNumber', userr.documentNumber);
    localStorage.setItem('p_weight', w.value);
    localStorage.setItem('p_wold', oldv);
    localStorage.setItem('p_height', userr.height);
    localStorage.setItem('p_sex', userr.sex);

    getMedicalInfos(userr._id)
    .then(response => {
      return response.json();
    })  
    .then(json => {
      localStorage.setItem('p_vtf', json["testFindRisk"]);
      localStorage.setItem('p_clinicalC', json["clinicalContext"]);
      localStorage.setItem('p_mecialC', json["medicalCenter"]);
      localStorage.setItem('p_isDiabetic', json["isDiabetic"]);
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

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
                          <RouterLink 
                              to={{
                              pathname:"/menu",
                              info:{ nombre: user}
                              }}
                            >
                              <Fab size="small" color="primary" aria-label="add" onClick={()=>handleUser(user)} className={classes.margin}>
                                
                                  <AccessibilityIcon />
                              </Fab>
                          </RouterLink>
                        </TableCell>
                        <TableCell>              
                          <Typography variant="body1">{user.name} {user.lastName}</Typography>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.age} años</TableCell>
                        <TableCell>
                          {moment(user.dateAssociation).format('DD/MM/YYYY')}
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

export default UserTable;