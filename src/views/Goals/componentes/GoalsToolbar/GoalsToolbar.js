import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { SearchInput } from '../../../../components';

const options = ['Mostrar lista', 'Mostrar detalle'];

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  addButton: {
    backgroundColor: '#1438A6',
    color: '#F2F2F2',
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const GoalsToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
        <SearchInput
          className={classes.searchInput}
          placeholder="Buscar Paciente"
        />
    </div>
  );
};

GoalsToolbar.propTypes = {
  className: PropTypes.string
};

export default GoalsToolbar;
