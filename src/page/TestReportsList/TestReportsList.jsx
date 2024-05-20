import React, { useContext, useEffect, useState } from 'react';
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { SetValueContext, ValueContext } from '../../App';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from '@mui/material';

function TestReportsList() {
    const setvalue = useContext(SetValueContext);
    const value = useContext(ValueContext);
    const navigate = useNavigate();
    const [testReport, setTestReport] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://my.api.mockaroo.com/organizations/${value?.organization?.id}/reports.json?key=${process.env.REACT_APP_ENDPOINT}`);
            setTestReport(response.data);
            toast.success('test reports get successfully');
            setIsLoading(false);
        } catch (error) {
            toast.error("Please Try After Sometime");
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        setvalue((prev) => {
            return { ...prev, 'testReport': '' }
        });
        fetchData();
    }, []);

    const handleReport = (data) => {
        setvalue((prev) => {
            return { ...prev, 'testReport': data }
        });
    }
    return (
        <div className='test-report-contener'>
            {
                isLoading ?
                    <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" w="100%" mt={{ "xl": "40px", "sm": "10px" }}>
                        <CircularProgress />
                    </Box>
                    :
                    <>
                        <div className='test-report-title'>Test Report</div>
                        {
                            testReport && testReport?.length >= 1
                            &&
                            <div className='test-report-list'>
                                {
                                    testReport?.map((item) => {
                                        return (
                                            <div className='test-report-data-contener' key={item?.id} onClick={() => {
                                                handleReport(item);
                                                navigate('/test-reports-details');
                                            }}>
                                                <div className='test-report-content' >
                                                    <div className='report-name'>{item?.name}</div>
                                                    <div className='report-time'>
                                                        <div className='report-ago'>2 min ago</div>{" - "}
                                                        <div className='report-long'>10 min long</div>
                                                    </div>
                                                </div>
                                                <div className='test-report-data'>
                                                    <div className='report-passed'>{item?.succeed_tests} passed</div>
                                                    <div className='report-failed'>{item?.failed_tests} failed</div>
                                                </div>
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

export default TestReportsList;