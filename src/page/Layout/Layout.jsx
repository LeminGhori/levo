import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function Layout() {
    return (
        <div className='main-content'>
            <div className="layout">
                <div className='layout-title'>
                    <div className='brand-name'>
                        Levo
                    </div>
                    <div className='organization-name'>
                        organization name 1
                    </div>
                </div>
                <div className='layout-report'>
                    <div className='layout-report-icon'><PlayArrowIcon /></div>
                    <div className='layout-report-text'>Test Report 1</div>
                </div>
            </div>
            <Outlet />  {/* This will render the matched child route components */}
        </div>
    );
}

export default Layout;
