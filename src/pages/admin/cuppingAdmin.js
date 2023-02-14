import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  Modal,
  Backdrop,
  Slide,
  Paper,
  Checkbox,
  Fab,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Add, Print } from "@mui/icons-material";
import {
  emptyErrors,
  getCuppings,
  getSamples,
} from "../../actions/generalActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ReactToPrint from "react-to-print";
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

function CuppingAdmin() {
  const { isAdminAuthenticated } = useSelector((state) => state.auth);
  const { cuppings } = useSelector((state) => state.adminData);
  const errors = useSelector((state) => state.errors);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const tableRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tobePrintedId, setTobePrintedId] = useState([]);
  const [tobePrintedDocument, setTobePrintedDocument] = useState([]);
  const toBePrinted = (cupping) => {
    if (tobePrintedId.indexOf(cupping.id) !== -1) {
      const filtered = tobePrintedId.filter((pcr) => pcr !== cupping.id);
      const filteredDocument = tobePrintedDocument.filter(
        (document) => document.id !== cupping.id
      );
      if (filtered.length) {
        setTobePrintedId(filtered);
        setTobePrintedDocument(filteredDocument);
      } else {
        setTobePrintedId([]);
        setTobePrintedDocument([]);
      }
    } else {
      setTobePrintedId([cupping.id, ...tobePrintedId]);
      setTobePrintedDocument([cupping, ...tobePrintedDocument]);
    }
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
  return (
    <>
      <Grid container className="dashboard-container justify-around">
        <Grid className="accounts-list-container w-full -mt-3">
          <div className="w-full flex flex-row justify-between mb-2">
            <p className="h4 text-left">Cuppings</p>
            <div>
              <Button
                startIcon={<Add />}
                variant="contained"
                onClick={() => navigate("/new-cupping")}
              >
                Add Cupping
              </Button>
            </div>
          </div>
          <TableContainer
            component={Paper}
            sx={{
              height: "80%",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Print</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Cup ID</TableCell>
                  <TableCell align="right">Cupper ID</TableCell>
                  <TableCell align="right">Cup</TableCell>
                  <TableCell align="right">Aroma</TableCell>
                  <TableCell align="right">Flavor</TableCell>
                  <TableCell align="right">Acidity</TableCell>
                  <TableCell align="right">Body</TableCell>
                  <TableCell align="right">Uniformity</TableCell>
                  <TableCell align="right">Clean Cup</TableCell>
                  <TableCell align="right">Aftertaste</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell align="right">Sweetness</TableCell>
                  <TableCell align="right">Overall</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Final Score</TableCell>
                  <TableCell align="right">Defects</TableCell>
                  <TableCell align="right">Quality Scale</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cuppings.map((cupping) => (
                  <>
                    <TableRow key={cupping.id}>
                      <TableCell rowSpan={5}>
                        <Checkbox
                          onChange={() => {
                            toBePrinted(cupping);
                          }}
                        />
                      </TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.name}
                      </TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.id}
                      </TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.createdby}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cup 1</TableCell>
                      <TableCell align="right">{cupping.cup1aroma}</TableCell>
                      <TableCell align="right">{cupping.cup1flavor}</TableCell>
                      <TableCell align="right">{cupping.cup1acidity}</TableCell>
                      <TableCell align="right">{cupping.cup1body}</TableCell>
                      <TableCell align="right">
                        {cupping.cup1uniformity}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup1cleancup}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup1aftertaste}
                      </TableCell>
                      <TableCell align="right">{cupping.cup1balance}</TableCell>
                      <TableCell align="right">
                        {cupping.cup1sweetness}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup1overall.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{cupping.cup1total}</TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.finalscore}
                      </TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.defects}
                      </TableCell>
                      <TableCell rowSpan={5} className="border border-gray-400">
                        {cupping.qualityscale}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cup 2</TableCell>
                      <TableCell align="right">{cupping.cup2aroma}</TableCell>
                      <TableCell align="right">{cupping.cup2flavor}</TableCell>
                      <TableCell align="right">{cupping.cup2acidity}</TableCell>
                      <TableCell align="right">{cupping.cup2body}</TableCell>
                      <TableCell align="right">
                        {cupping.cup2uniformity}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup2cleancup}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup2aftertaste}
                      </TableCell>
                      <TableCell align="right">{cupping.cup2balance}</TableCell>
                      <TableCell align="right">
                        {cupping.cup2sweetness}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup2overall.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{cupping.cup2total}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cup 3</TableCell>
                      <TableCell align="right">{cupping.cup3aroma}</TableCell>
                      <TableCell align="right">{cupping.cup3flavor}</TableCell>
                      <TableCell align="right">{cupping.cup3acidity}</TableCell>
                      <TableCell align="right">{cupping.cup3body}</TableCell>
                      <TableCell align="right">
                        {cupping.cup3uniformity}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup3cleancup}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup3aftertaste}
                      </TableCell>
                      <TableCell align="right">{cupping.cup3balance}</TableCell>
                      <TableCell align="right">
                        {cupping.cup3sweetness}
                      </TableCell>
                      <TableCell align="right">
                        {cupping.cup3overall.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">{cupping.cup3total}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Average</TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1aroma +
                            cupping.cup2aroma +
                            cupping.cup3aroma) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1flavor +
                            cupping.cup2flavor +
                            cupping.cup3flavor) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1acidity +
                            cupping.cup2acidity +
                            cupping.cup3acidity) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1body +
                            cupping.cup2body +
                            cupping.cup3body) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1uniformity +
                            cupping.cup2uniformity +
                            cupping.cup3uniformity) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1cleancup +
                            cupping.cup2cleancup +
                            cupping.cup3cleancup) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1aftertaste +
                            cupping.cup2aftertaste +
                            cupping.cup3aftertaste) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1balance +
                            cupping.cup2balance +
                            cupping.cup3balance) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1sweetness +
                            cupping.cup2sweetness +
                            cupping.cup3sweetness) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1overall +
                            cupping.cup2overall +
                            cupping.cup3overall) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(
                          (cupping.cup1total +
                            cupping.cup2total +
                            cupping.cup3total) /
                          3
                        ).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Modal
          open={printModalOpen}
          onClose={() => setPrintModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Slide direction="down" in={printModalOpen}>
            <Grid
              className="modal-content-container"
              style={{ width: "95%", height: "70%", left: "2.5%", top: "5%" }}
            >
              <ReactToPrint
                trigger={() => {
                  return (
                    <StyledTooltip title="Print" placement="top">
                      <Fab color="primary" sx={fabStyle}>
                        <Print />
                      </Fab>
                    </StyledTooltip>
                  );
                }}
                content={() => tableRef.current}
              />
              <TableContainer
                ref={tableRef}
                component={Paper}
                className="h-full"
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Cupper</TableCell>
                      <TableCell align="right">Cup</TableCell>
                      <TableCell align="right">Aroma</TableCell>
                      <TableCell align="right">Flavor</TableCell>
                      <TableCell align="right">Acid.</TableCell>
                      <TableCell align="right">Body</TableCell>
                      <TableCell align="right">Unif.</TableCell>
                      <TableCell align="right">CC</TableCell>
                      <TableCell align="right">After T.</TableCell>
                      <TableCell align="right">Bal.</TableCell>
                      <TableCell align="right">Sweet.</TableCell>
                      <TableCell align="right">Overall</TableCell>
                      <TableCell align="right">Total</TableCell>
                      <TableCell align="right">FS</TableCell>
                      <TableCell align="right">Def</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tobePrintedDocument.map((cupping) => (
                      <>
                        <TableRow key={cupping.id}>
                          <TableCell
                            rowSpan={5}
                            className="border border-gray-400"
                          >
                            {cupping.name}
                          </TableCell>
                          <TableCell
                            rowSpan={5}
                            className="border border-gray-400"
                          >
                            {cupping.createdby}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cup 1</TableCell>
                          <TableCell align="right">
                            {cupping.cup1aroma}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1flavor}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1acidity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1body}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1uniformity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1cleancup}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1aftertaste}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1balance}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1sweetness}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1overall.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup1total}
                          </TableCell>
                          <TableCell
                            rowSpan={5}
                            className="border border-gray-400"
                          >
                            {cupping.finalscore}
                          </TableCell>
                          <TableCell
                            rowSpan={5}
                            className="border border-gray-400"
                          >
                            {cupping.defects}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cup 2</TableCell>
                          <TableCell align="right">
                            {cupping.cup2aroma}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2flavor}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2acidity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2body}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2uniformity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2cleancup}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2aftertaste}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2balance}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2sweetness}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2overall.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup2total}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Cup 3</TableCell>
                          <TableCell align="right">
                            {cupping.cup3aroma}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3flavor}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3acidity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3body}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3uniformity}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3cleancup}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3aftertaste}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3balance}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3sweetness}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3overall.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {cupping.cup3total}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Average</TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1aroma +
                                cupping.cup2aroma +
                                cupping.cup3aroma) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1flavor +
                                cupping.cup2flavor +
                                cupping.cup3flavor) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1acidity +
                                cupping.cup2acidity +
                                cupping.cup3acidity) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1body +
                                cupping.cup2body +
                                cupping.cup3body) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1uniformity +
                                cupping.cup2uniformity +
                                cupping.cup3uniformity) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1cleancup +
                                cupping.cup2cleancup +
                                cupping.cup3cleancup) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1aftertaste +
                                cupping.cup2aftertaste +
                                cupping.cup3aftertaste) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1balance +
                                cupping.cup2balance +
                                cupping.cup3balance) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1sweetness +
                                cupping.cup2sweetness +
                                cupping.cup3sweetness) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1overall +
                                cupping.cup2overall +
                                cupping.cup3overall) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            {(
                              (cupping.cup1total +
                                cupping.cup2total +
                                cupping.cup3total) /
                              3
                            ).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Slide>
        </Modal>
      </Grid>
      <StyledTooltip title="Print" placement="top">
        <Fab
          color="primary"
          sx={fabStyle}
          onClick={() => {
            setPrintModalOpen(true);
          }}
          disabled={!tobePrintedId.length}
        >
          <Print />
        </Fab>
      </StyledTooltip>
      <ToastContainer />
    </>
  );
}

export default CuppingAdmin;
