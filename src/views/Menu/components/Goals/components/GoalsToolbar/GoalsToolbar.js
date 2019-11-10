import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { AddButton, AddPredefinida } from './Componentes';




const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
  },
  spacer: {
    flexGrow: 1
  },
  addButton: {
    backgroundColor: '#1438A6',
    color: '#F2F2F2',
    margin: theme.spacing(1),
  },
  addIcon: {
    marginRight: theme.spacing(1),
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
      <div className={classes.row}>
        <AddButton/>
        <AddPredefinida/>
      </div>
    </div>
  );
};

GoalsToolbar.propTypes = {
  className: PropTypes.string
};

export default GoalsToolbar;
