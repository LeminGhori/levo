import React, { useContext, useEffect, useState } from 'react'
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import "./index.scss"
import { SetValueContext } from '../../App';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from '@mui/material';
function Organization() {
    const setvalue = useContext(SetValueContext);
    const navigate = useNavigate();
    const [organizationData, setOrganizationData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://my.api.mockaroo.com/organizations.json?key=${process.env.REACT_APP_ENDPOINT}`);
            setOrganizationData(response.data);
            toast.success('Organizations get successfully');
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Please Try After Sometime");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setvalue({
            organization: '',
            testReport: ''
        });
        fetchData();
    }, []);
    const handleOrganization = (data) => {
        setvalue((prev) => {
            return { ...prev, 'organization': data }
        });
    }

    return (
        <div className='organization-contener'>
            {isLoading ?
                <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" w="100%" mt={{ "xl": "40px", "sm": "10px" }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <div className='organization-title'>
                        <div className='organization-title-text'>Organizations</div>
                        <div className='organization-title-sub-text'>Pick the organization you want to access to</div>
                    </div>
                    {
                        organizationData && organizationData?.length >= 1 &&
                        <div className='organization-list'>
                            {
                                organizationData?.map((item) => {
                                    return (
                                        <div className='organization-content' key={item?.id} onClick={() => {
                                            handleOrganization(item)
                                            navigate("/test-reports-list");
                                        }}>
                                            <div className='organization-icon'><CorporateFareIcon /></div>
                                            <div className='organization-name'>{item?.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <ToastContainer />
                </>
            }
        </div>
    )
}

export default Organization