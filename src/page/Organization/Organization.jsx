import React from 'react'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import "./index.scss"
function Organization() {
    return (
        <div className='organization-contener'>
            <div className='organization-title'>
                <div className='organization-title-text'>Organizations</div>
                <div className='organization-title-sub-text'>Pick the organization you want to access to</div>
            </div>
            <div className='organization-list'>
                <div className='organization-content'>
                    <div className='organization-icon'><CorporateFareIcon /></div>
                    <div className='organization-name'>Organization Name A</div>
                </div>
                <div className='organization-content'>
                    <div className='organization-icon'><CorporateFareIcon /></div>
                    <div className='organization-name'>Organization Name A</div>
                </div>
            </div>
        </div>
    )
}

export default Organization