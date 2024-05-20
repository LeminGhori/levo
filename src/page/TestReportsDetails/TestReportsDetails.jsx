import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EastIcon from "@mui/icons-material/East";
import UpdateIcon from "@mui/icons-material/Update";
import GitHubIcon from "@mui/icons-material/GitHub";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import { useNavigate } from "react-router-dom";
import { ValueContext } from "../../App";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";

function TestReportsDetails() {
    const navigate = useNavigate();
    const value = useContext(ValueContext);
    const [timeAgo, setTimeAgo] = useState("");
    const [showDetails, setShowDetails] = useState({
        failed: true,
        pass: true,
    });
    const [filter, setFilter] = useState("");
    const [successData, setSuccessData] = useState([]);
    const [failedData, setFailedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const debouncedHandleInput = debounce((inputValue) => {
        try {
            const filteredEndpoints = testDetailsReport?.endpoints?.filter((item) =>
                item.url.includes(inputValue)
            );

            const success = filteredEndpoints.filter(
                (item) => item.status === "SUCCESS"
            );
            setSuccessData(success);

            const failed = filteredEndpoints.filter(
                (item) => item.status !== "SUCCESS"
            );
            setFailedData(failed);

            const date = parseISO(testDetailsReport?.end_date);
            const distance = formatDistanceToNow(date, { addSuffix: true });
            setTimeAgo(distance);
        } catch (error) {
            console.error("Error filtering data:", error);
        }
    }, 300); // 300 milliseconds debounce delay

    const handleInput = (e) => {
        const inputValue = e.target.value;
        setFilter(inputValue);
        debouncedHandleInput(inputValue);
    };

    const handleToggle = (key) => {
        setShowDetails((prev) => {
            return { ...prev, [key]: !prev[key] };
        });
    };

    const [testDetailsReport, setTestDetailsReport] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://my.api.mockaroo.com/organizations/${value?.organization?.id}/reports/${value?.testReport?.id}/details.json?key=${process.env.REACT_APP_ENDPOINT}`
            );
            setTestDetailsReport(response?.data);

            const success = response?.data?.endpoints?.filter(
                (item) => item?.status === "SUCCESS"
            );
            setSuccessData(success);

            const failed = response?.data?.endpoints?.filter(
                (item) => item?.status !== "SUCCESS"
            );
            setFailedData(failed);

            const date = parseISO(response?.data?.end_date);
            const distance = formatDistanceToNow(date, { addSuffix: true });
            setTimeAgo(distance);
            toast.success("test report details get successfully");
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Please Try After Sometime");
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="test-report-details-contener">
            {isLoading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    w="100%"
                    mt={{ xl: "40px", sm: "10px" }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <div className="test-report-details-title">
                        <div
                            className="title"
                            onClick={() => {
                                navigate("/test-reports-list");
                            }}
                        >
                            Test Report
                        </div>
                        <ArrowForwardIosIcon />
                        <div className="title-black">
                            {value?.testReport?.name ? value?.testReport?.name : ""}
                        </div>
                        <div className="report-result" style={{ background: "#ffa7a7" }}>
                            <ClearIcon />
                            <div className="report-text">Failed</div>
                        </div>
                    </div>

                    <div className="test-report-details">
                        <div className="line-1">
                            <div className="details-center">
                                <AccessTimeFilledIcon />
                                Duration: {parseFloat(testDetailsReport?.duration) / 60}m
                            </div>
                            <div className="details-center">
                                <CalendarMonthIcon />
                                Finished {timeAgo}
                            </div>
                        </div>
                        <div className="line-2">
                            <ListAltIcon />
                            {testDetailsReport?.commit}
                        </div>
                        <div className="line-3">
                            <div className="details-center">
                                <EastIcon />
                                {testDetailsReport?.branch}
                            </div>
                            <div className="details-center">
                                <UpdateIcon />
                                {testDetailsReport?.job_name}
                            </div>
                            <div className="details-center">
                                <GitHubIcon />
                                {testDetailsReport?.github_user}
                            </div>
                        </div>
                        <div className="line-4">
                            <WifiTetheringIcon />
                            {testDetailsReport?.environment_url}
                        </div>
                    </div>

                    <div className="filter">
                        <Box sx={{ width: "100%" }}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs value={0} aria-label="basic tabs example">
                                    <Tab id="simple-tab-0" label="Results" className="tabs" />
                                </Tabs>
                            </Box>
                        </Box>

                        <input
                            placeholder="Filter by endpoint.."
                            name="filter"
                            value={filter}
                            onChange={handleInput}
                            className="filter-filed"
                        />

                        <div
                            className="filed"
                            onClick={() => {
                                handleToggle("failed");
                            }}
                        >
                            <div>
                                {showDetails?.failed ? (
                                    <KeyboardArrowDownIcon />
                                ) : (
                                    <KeyboardArrowUpIcon />
                                )}
                            </div>
                            <div className="filed-clear">
                                <ClearIcon />
                            </div>
                            <div className="filed-test">
                                failed Tests{" "}
                                {`(${failedData?.length} / ${failedData?.length + successData?.length
                                    })`}
                            </div>
                        </div>
                        {showDetails?.failed && (
                            <div className="details-list">
                                {failedData?.map((item) => {
                                    return (
                                        <div className="details-contener failed-1" key={item?.id}>
                                            <div>{item?.url}</div>
                                            <div>{item?.duration % 60}s</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div
                            className="pass"
                            onClick={() => {
                                handleToggle("pass");
                            }}
                        >
                            <div>
                                {" "}
                                {showDetails?.pass ? (
                                    <KeyboardArrowDownIcon />
                                ) : (
                                    <KeyboardArrowUpIcon />
                                )}
                            </div>
                            <div className="pass-clear">
                                <DownloadDoneIcon />
                            </div>
                            <div className="pass-test">
                                failed Tests{" "}
                                {`(${successData?.length} / ${failedData?.length + successData?.length
                                    })`}
                            </div>
                        </div>
                        {showDetails?.pass && (
                            <div className="details-list">
                                {successData?.map((item) => {
                                    return (
                                        <div className="details-contener pass-1" key={item?.id}>
                                            <div>{item?.url}</div>
                                            <div>{item?.duration % 60}s</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <ToastContainer />
                </>
            )}
        </div>
    );
}

export default TestReportsDetails;
