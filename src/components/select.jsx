import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectDropdown() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    status: '',
    name: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
        <Select
          native
          value={state.status}
          onChange={handleChange}
          label="Status"
          inputProps={{
            name: 'Status',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option >Placed</option>
          <option >In Process</option>
          <option >Out for Delivery</option>
        </Select>
      </FormControl>
     
    </div>
  );
}
