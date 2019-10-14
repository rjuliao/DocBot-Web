import { connect } from 'react-redux'
import { Menu } from '..';

const mapStateToProps = (state) => {
    return{
        loggedDoctor : state.loggedDoctor
    };
};
const mapDispatchToProps = (dispatch) => {
    return{
        savePatient : () => dispath({type:'Save_User', payload: user})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);