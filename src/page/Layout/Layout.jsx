import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './index.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SetValueContext, ValueContext } from '../../App';
function Layout() {
    const value = useContext(ValueContext);
    const navigate = useNavigate();
    const setvalue = useContext(SetValueContext);
    const navigationHome = () => {
        navigate('/');
        setvalue({
            organization: '',
            testReport: ''
        });
    }
    return (
        <div className='main-content'>
            <div className="layout">
                <div className='layout-title'>
                    <div className='brand-name' onClick={navigationHome}>
                        Levo
                    </div>
                    {
                        value?.organization !== 'null' && value?.organization !== ''
                        &&
                        <div className='organization-name'>
                            {value?.organization?.name}
                        </div>
                    }
                </div>
                {
                    value?.testReport !== 'null' && value?.testReport !== ''
                    &&
                    <div className='layout-report'>
                        <div className='layout-report-icon'><PlayArrowIcon /></div>
                        <div className='layout-report-text'>{value?.testReport?.name}</div>
                    </div>
                }
            </div>
            <Outlet />  {/* This will render the matched child route components */}
        </div>
    );
}

export default Layout;
