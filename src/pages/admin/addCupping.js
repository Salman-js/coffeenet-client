import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Add, LocalCafe } from "@mui/icons-material";
import {
  emptyErrors,
  getCuppings,
  getSamples,
  resetUpdate,
} from "../../actions/generalActions";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { addCupping } from "../../actions/adminActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 50,
};
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function AddCupping() {
  const { isAdminAuthenticated, admin } = useSelector((state) => state.auth);
  const { samples, addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const [selectedSample, setSample] = useState("");
  const [expanded, setExpanded] = useState(1);
  const [cup1Total, setCup1Total] = useState(0);
  const [cup1Overall, setCup1Overall] = useState(0);
  const [cup2Total, setCup2Total] = useState(0);
  const [cup2Overall, setCup2Overall] = useState(0);
  const [cup3Total, setCup3Total] = useState(0);
  const [cup3Overall, setCup3Overall] = useState(0);
  const [cup1, setCup1] = useState({
    aroma: 0,
    flavor: 0,
    acidity: 0,
    body: 0,
    uniformity: 0,
    cleancup: 0,
    aftertaste: 0,
    balance: 0,
    sweetness: 0,
  });
  const [cup2, setCup2] = useState({
    aroma: 0.0,
    flavor: 0.0,
    acidity: 0.0,
    body: 0.0,
    uniformity: 0.0,
    cleancup: 0.0,
    aftertaste: 0.0,
    balance: 0.0,
    sweetness: 0.0,
  });
  const [cup3, setCup3] = useState({
    aroma: 0,
    flavor: 0,
    acidity: 0,
    body: 0,
    uniformity: 0,
    cleancup: 0,
    aftertaste: 0,
    balance: 0,
    sweetness: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function onAddCupping(e) {
    e.preventDefault();
    const Total1 =
      cup1.aroma +
      cup1.flavor +
      cup1.acidity +
      cup1.body +
      cup1.uniformity +
      cup1.aftertaste +
      cup1.cleancup +
      cup1.balance +
      cup1.sweetness;
    const Total2 =
      cup2.aroma +
      cup2.flavor +
      cup2.acidity +
      cup2.body +
      cup2.uniformity +
      cup2.aftertaste +
      cup2.cleancup +
      cup2.balance +
      cup2.sweetness;
    const Total3 =
      cup3.aroma +
      cup3.flavor +
      cup3.acidity +
      cup3.body +
      cup3.uniformity +
      cup3.aftertaste +
      cup3.cleancup +
      cup3.balance +
      cup3.sweetness;
    setCup1Total(Total1);
    setCup1Overall(Total1 / 9);
    setCup2Total(Total2);
    setCup2Overall(Total2 / 9);
    setCup3Total(Total3);
    setCup3Overall(Total3 / 9);
    const newCupping = {
      name: selectedSample,
      createdBy: admin.id,
      cup1: cup1,
      cup2: cup2,
      cup3: cup3,
      cup1Total: cup1Total,
      cup2Total: cup2Total,
      cup3Total: cup3Total,
      cup1Overall: cup1Overall,
      cup2Overall: cup2Overall,
      cup3Overall: cup3Overall,
      qualityscale:
        (cup1Overall + cup2Overall + cup3Overall) / 3 > 6 &&
        (cup1Overall + cup2Overall + cup3Overall) / 3 <= 7
          ? "Good"
          : (cup1Overall + cup2Overall + cup3Overall) / 3 > 7 &&
            (cup1Overall + cup2Overall + cup3Overall) / 3 <= 8
          ? "Very Good"
          : (cup1Overall + cup2Overall + cup3Overall) / 3 > 8 &&
            (cup1Overall + cup2Overall + cup3Overall) / 3 <= 9
          ? "Excellent"
          : (cup1Overall + cup2Overall + cup3Overall) / 3 > 9
          ? "Outstanding"
          : "Unacceptable",
    };
    dispatch(addCupping(newCupping));
  }
  const handleAccordionChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate("/");
    }
  }, [isAdminAuthenticated, navigate]);
  useEffect(() => {
    dispatch(getCuppings());
    dispatch(getSamples());
  }, [dispatch]);
  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };
    if (errors.unknown) {
      toast.error("Unknown Error, Please Try Again", toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 6000);
    }
  }, [errors, dispatch]);
  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };
    if (dataUpdated === "cupping added") {
      toast.success("Cup submitted", toastOptions);
      setCup1({
        aroma: 0,
        flavor: 0,
        acidity: 0,
        body: 0,
        uniformity: 0,
        cleancup: 0,
        aftertaste: 0,
        balance: 0,
        sweetness: 0,
      });
      setCup2({
        aroma: 0,
        flavor: 0,
        acidity: 0,
        body: 0,
        uniformity: 0,
        cleancup: 0,
        aftertaste: 0,
        balance: 0,
        sweetness: 0,
      });
      setCup3({
        aroma: 0,
        flavor: 0,
        acidity: 0,
        body: 0,
        uniformity: 0,
        cleancup: 0,
        aftertaste: 0,
        balance: 0,
        sweetness: 0,
      });
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  return (
    <Grid container className="dashboard-container justify-around">
      <Grid className="accounts-list-container w-full -mt-3">
        <div className="w-full flex flex-row justify-between mb-2">
          <p className="h4 text-left">Cuppings</p>
          <div>
            <Button
              startIcon={<LocalCafe />}
              variant="contained"
              onClick={() => navigate("/admin-cupping")}
            >
              View Cuppings
            </Button>
          </div>
        </div>
      </Grid>
      <Grid className="modal-header w-full mb-4 justify-between">
        <div className="w-full flex flex-row justify-start mb-2">
          <p className="h5 text-left">New Cupping</p>
          <div className="w-1/5 mx-4">
            <FormControl fullWidth>
              <InputLabel id="select-label">Sample Name</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={selectedSample}
                label="Sample Name"
                onChange={(e) => setSample(e.target.value)}
              >
                {samples.map((sample) => {
                  return <MenuItem value={sample.name}>{sample.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mb-2 mr-4">
          <p className="h5 text-left">
            Quality:{" "}
            {(cup1Overall + cup2Overall + cup3Overall) / 3 > 6 &&
            (cup1Overall + cup2Overall + cup3Overall) / 3 <= 7
              ? "Good"
              : (cup1Overall + cup2Overall + cup3Overall) / 3 > 7 &&
                (cup1Overall + cup2Overall + cup3Overall) / 3 <= 8
              ? "Very Good"
              : (cup1Overall + cup2Overall + cup3Overall) / 3 > 8 &&
                (cup1Overall + cup2Overall + cup3Overall) / 3 <= 9
              ? "Excellent"
              : (cup1Overall + cup2Overall + cup3Overall) / 3 > 9
              ? "Outstanding"
              : "Unacceptable"}
          </p>
        </div>
        <div className="mb-2 mr-4">
          <p className="h5 text-left">
            Final Score: {((cup1Total + cup2Total + cup3Total) / 3).toFixed(2)}
          </p>
        </div>
      </Grid>
      <Grid className="modal-body w-full">
        <form onSubmit={onAddCupping}>
          <Grid
            container
            className="w-full h-fit flex justify-center items-center text-center"
            spacing={2}
          >
            <Grid
              container
              spacing={1}
              lg={12}
              className="w-full h-fit flex flex-row m-auto justify-center items-center my-6"
            >
              <Accordion
                className="w-full mx-auto"
                expanded={expanded === 1}
                onChange={handleAccordionChange(1)}
              >
                <AccordionSummary
                  className="w-full"
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <p className="h5">Cup 1</p>
                </AccordionSummary>
                <AccordionDetails className="w-full">
                  <Grid
                    container
                    spacing={1}
                    lg={12}
                    className="h-fit flex flex-row m-auto justify-center items-center mt-6"
                  >
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aroma
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aroma"
                          aria-label="Aroma"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.aroma);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.aroma}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              aroma: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.aroma}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              aroma: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Flavor
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Flavor"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.flavor);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.flavor}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              flavor: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.flavor}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              flavor: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Acidity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Acidity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.acidity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.acidity}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              acidity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.acidity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              acidity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">Body</p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Body"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.body);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.body}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              body: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.body}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              body: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Uniformity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Uniformity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.uniformity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.uniformity}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              uniformity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.uniformity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              uniformity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Cleancup
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Cleancup"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.cleancup);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.cleancup}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              cleancup: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.cleancup}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              cleancup: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aftertaste
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aftertaste"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.aftertaste);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.aftertaste}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              aftertaste: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.aftertaste}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              aftertaste: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Balance
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Balance"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.balance);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.balance}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              balance: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.balance}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              balance: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Sweetness
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Sweetness"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup1.sweetness);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup1.sweetness}
                          onChange={(e) => {
                            setCup1({
                              ...cup1,
                              sweetness: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup1.sweetness}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup1({
                              ...cup1,
                              sweetness: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          (cup1.aroma +
                            cup1.flavor +
                            cup1.acidity +
                            cup1.body +
                            cup1.uniformity +
                            cup1.aftertaste +
                            cup1.cleancup +
                            cup1.balance +
                            cup1.sweetness) /
                          9
                        }
                        autoComplete="false"
                        label="Overall"
                        aria-readonly
                      />
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          cup1.aroma +
                          cup1.flavor +
                          cup1.acidity +
                          cup1.body +
                          cup1.uniformity +
                          cup1.aftertaste +
                          cup1.cleancup +
                          cup1.balance +
                          cup1.sweetness
                        }
                        autoComplete="false"
                        label="Total"
                        aria-readonly
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="w-full mx-auto"
                expanded={expanded === 2}
                onChange={handleAccordionChange(2)}
              >
                <AccordionSummary
                  className="w-full"
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <p className="h5">Cup 2</p>
                </AccordionSummary>
                <AccordionDetails className="w-full">
                  <Grid
                    container
                    spacing={1}
                    lg={12}
                    className="h-fit flex flex-row m-auto justify-center items-center mt-6"
                  >
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aroma
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aroma"
                          aria-label="Aroma"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.aroma);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.aroma}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              aroma: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.aroma}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              aroma: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Flavor
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Flavor"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.flavor);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.flavor}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              flavor: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.flavor}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              flavor: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Acidity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Acidity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.acidity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.acidity}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              acidity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.acidity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              acidity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">Body</p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Body"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.body);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.body}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              body: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.body}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              body: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Uniformity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Uniformity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.uniformity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.uniformity}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              uniformity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.uniformity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              uniformity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Cleancup
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Cleancup"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.cleancup);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.cleancup}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              cleancup: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.cleancup}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              cleancup: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aftertaste
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aftertaste"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.aftertaste);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.aftertaste}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              aftertaste: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.aftertaste}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              aftertaste: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Balance
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Balance"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.balance);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.balance}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              balance: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.balance}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              balance: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Sweetness
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Sweetness"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup2.sweetness);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup2.sweetness}
                          onChange={(e) => {
                            setCup2({
                              ...cup2,
                              sweetness: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup2.sweetness}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup2({
                              ...cup2,
                              sweetness: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          (cup2.aroma +
                            cup2.flavor +
                            cup2.acidity +
                            cup2.body +
                            cup2.uniformity +
                            cup2.aftertaste +
                            cup2.cleancup +
                            cup2.balance +
                            cup2.sweetness) /
                          9
                        }
                        autoComplete="false"
                        label="Overall"
                        aria-readonly
                      />
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          cup2.aroma +
                          cup2.flavor +
                          cup2.acidity +
                          cup2.body +
                          cup2.uniformity +
                          cup2.aftertaste +
                          cup2.cleancup +
                          cup2.balance +
                          cup2.sweetness
                        }
                        autoComplete="false"
                        label="Total"
                        aria-readonly
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className="w-full mx-auto"
                expanded={expanded === 3}
                onChange={handleAccordionChange(3)}
              >
                <AccordionSummary
                  className="w-full"
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <p className="h5">Cup 3</p>
                </AccordionSummary>
                <AccordionDetails className="w-full">
                  <Grid
                    container
                    spacing={1}
                    lg={12}
                    className="h-fit flex flex-row m-auto justify-center items-center mt-6"
                  >
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aroma
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aroma"
                          aria-label="Aroma"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.aroma);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.aroma}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              aroma: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.aroma}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              aroma: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Flavor
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Flavor"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.flavor);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.flavor}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              flavor: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.flavor}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              flavor: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Acidity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Acidity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.acidity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.acidity}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              acidity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={10} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.acidity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              acidity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">Body</p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Body"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.body);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.body}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              body: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.body}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              body: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Uniformity
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Uniformity"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.uniformity);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.uniformity}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              uniformity: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.uniformity}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              uniformity: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Cleancup
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Cleancup"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.cleancup);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.cleancup}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              cleancup: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.cleancup}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              cleancup: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Aftertaste
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Aftertaste"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.aftertaste);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.aftertaste}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              aftertaste: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.aftertaste}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              aftertaste: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Balance
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Balance"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.balance);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.balance}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              balance: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.balance}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              balance: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      lg={1}
                      md={1}
                      className="h-fit flex flex-col border border-gray-600"
                    >
                      <Grid lg={12}>
                        <p className="text-base md:text-sm text-center">
                          Sweetness
                        </p>
                      </Grid>
                      <Grid
                        lg={12}
                        className="m-auto w-full h-fit items-center flex justify-center my-2"
                      >
                        <Slider
                          style={{ height: 100 }}
                          label="Sweetness"
                          orientation="vertical"
                          getAriaValueText={() => {
                            return toString(cup3.sweetness);
                          }}
                          valueLabelDisplay="on"
                          defaultValue={0}
                          step={0.5}
                          max={10}
                          min={1}
                          marks
                          value={cup3.sweetness}
                          onChange={(e) => {
                            setCup3({
                              ...cup3,
                              sweetness: parseFloat(e.target.value),
                            });
                          }}
                        />
                      </Grid>
                      <Grid lg={9} className="mx-auto">
                        <TextField
                          className="w-full"
                          type="number"
                          value={cup3.sweetness}
                          autoComplete="false"
                          onChange={(e) =>
                            setCup3({
                              ...cup3,
                              sweetness: parseFloat(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          (cup3.aroma +
                            cup3.flavor +
                            cup3.acidity +
                            cup3.body +
                            cup3.uniformity +
                            cup3.aftertaste +
                            cup3.cleancup +
                            cup3.balance +
                            cup3.sweetness) /
                          9
                        }
                        autoComplete="false"
                        label="Overall"
                        aria-readonly
                      />
                    </Grid>
                    <Grid item lg={1} md={1}>
                      <TextField
                        className="w-full"
                        type="number"
                        value={
                          cup3.aroma +
                          cup3.flavor +
                          cup3.acidity +
                          cup3.body +
                          cup3.uniformity +
                          cup3.aftertaste +
                          cup3.cleancup +
                          cup3.balance +
                          cup3.sweetness
                        }
                        autoComplete="false"
                        label="Total"
                        aria-readonly
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item lg={12} className="mx-auto mt-40">
              <LoadingButton
                type="submit"
                className="w-full"
                loading={addDataLoading}
                loadingPosition="start"
                startIcon={<Add />}
                sx={{
                  backgroundColor: "#7794d6",
                  color: "white",
                }}
                variant="contained"
                disabled={
                  !cup1.aroma ||
                  !cup1.flavor ||
                  !cup1.acidity ||
                  !cup1.body ||
                  !cup1.uniformity ||
                  !cup1.cleancup ||
                  !cup1.aftertaste ||
                  !cup1.balance ||
                  !cup1.sweetness ||
                  !cup2.aroma ||
                  !cup2.flavor ||
                  !cup2.acidity ||
                  !cup2.body ||
                  !cup2.uniformity ||
                  !cup2.cleancup ||
                  !cup2.aftertaste ||
                  !cup2.balance ||
                  !cup2.sweetness ||
                  !cup3.aroma ||
                  !cup3.flavor ||
                  !cup3.acidity ||
                  !cup3.body ||
                  !cup3.uniformity ||
                  !cup3.cleancup ||
                  !cup3.aftertaste ||
                  !cup3.balance ||
                  !cup3.sweetness
                }
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

export default AddCupping;
