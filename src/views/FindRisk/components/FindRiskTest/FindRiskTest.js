import React, { useState, useEffect } from 'react';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));


const FindRiskTest = props => {
  const { history, className, ...rest } = props;
  const classes = useStyles();

  const [value1, setValue1] = useState('joven');
  const [value2, setValue2] = useState('bien');

  const handleChange = event => {
    setValue1(event.target.value1);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <CardHeader
            title="Test FindRisk"
        />
        <Divider/>
        <CardContent>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">1. Edad</FormLabel>
                        <RadioGroup aria-label="edad" name="age" value={value1} onChange={handleChange}>
                            <FormControlLabel value="joven" control={<Radio />} label="Menos de 45 años" />
                            <FormControlLabel value="maduro" control={<Radio />} label="45-54 años" />
                            <FormControlLabel value="viejo" control={<Radio />} label="55-64 años" />
                            <FormControlLabel value="anciano" control={<Radio />} label="Más de 64 años" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    md={6}
                    xs={12}
                >
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">2. Índice de masa corporal</FormLabel>
                        <FormLabel component="legend">Peso: (Kilos) / Talla(metros)^2</FormLabel>
                        <RadioGroup aria-label="icm" name="icm" value={value2} onChange={handleChange}>
                            <FormControlLabel value="bien" control={<Radio />} label="Menor de 25kg/m^2" />
                            <FormControlLabel value="regular" control={<Radio />} label="Entre 25-30 kg/m^2" />
                            <FormControlLabel value="mal" control={<Radio />} label="Mayor de 30 kg/m^2" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  );
};

FindRiskTest.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(FindRiskTest);
