import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { TablePatient } from './components';
import { getPatients } from '../../services/api';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    title: {
        marginBottom: '10px',
        color: theme.palette.primary.main
    },
    content: {
      marginTop: theme.spacing(1)
    },
}));



const ExportInfo = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: false,
    data: [],
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  /**
   * Obtengo la lista de pacientes
   */
  const handleUsers = () => {
    
    getPatients(localStorage.getItem("id"))
    .then(response => {
      return response.json();
    })  
    .then(json => {
      state.data = json;
    })
    .catch(error => {
      console.log(error.message);
    });
  }


  return (
    <div className={classes.root}>
        {window.onload = handleUsers()}
        <div className={classes.content} >
            <Typography
                className={classes.title}
                variant="h1"
            >
                Exportar datos del paciente
            </Typography>
            <FormControlLabel
            control={<Checkbox
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="checkedB"
                color="primary"
                />
                
            }
            label="Cargar pacientes"
            />
        </div>
        <div 
            className={classes.content} 
        >
           {!state.checkedB?
                <div>
                    <Typography
                        variant="h5"
                    >
                        Este menú genera un archivo en excel con la siguiente información del paciente:<br/>
                    </Typography> 
                    <Typography
                        variant="body1"
                    >
                        1. Información personal<br/>
                        2. Información histórica en el cambio de peso <br/>
                        3. Información del muestras de paraclínicos <br/>
                    </Typography>
                </div>
            :
                <TablePatient users={state.data} />
            }
        </div>
    </div>
  );
};

export default ExportInfo;
