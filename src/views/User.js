import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import { useSelector } from "react-redux";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [
  {
    id: 1,
    signin_date: "5/07/22",
    full_name: "Lubega Tasha",
    temperature: "34",
    studentNo: "200303004",
    signin_time: "8:00:45",
    signed_in_by: "Joel",
  },
  {
    id: 2,
    name: "Wakkoli James",
    time: "7:45:02",
  },
];

const columns = [
  // {
  //   dataField: "id",
  //   text: "ID",
  //   // headerFormatter: headerFormatter,
  // },
  // {
  //   dataField: "stu_id",
  //   text: "Student No",
  // },
  // {
  //   dataField: "full_name",
  //   text: "full_name",
  // },
  // {
  //   dataField: "signin_date",
  //   text: "Date",
  // },
  {
    dataField: "signin_time",
    text: "Signin Time",
  },
  {
    dataField: "signin_gate",
    text: "Signin Gate",
  },
  {
    dataField: "temperature",
    text: "temperature",
  },
  {
    dataField: "signined_in_by",
    text: "signed_in_by",
  },
  {
    dataField: "signout_time",
    text: "signout time",
  },
  // {
  //   dataField: "signed_out_by",
  //   text: "signed out by",
  // },
  // {
  //   dataField: "action",
  //   text: "Action",
  //   // formatter: rankFormatter,
  //   // headerFormatter: headerFormatter,
  // },
];

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  React.useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);
  if (loadedSrc === props.src) {
    return <img {...props} />;
  }
  return null;
};

const expandRow = {
  onlyOneExpanding: true,
  renderer: (row) => (
    <div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px ",
          }}
        >
          <span>Signout time:</span>
          <span>{`${row.signout_time}`}</span>
        </div>
        <hr />
      </div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
          }}
        >
          <span>SignOut gate:</span>
          <span>{`${row.signout_gate}`}</span>
        </div>
        <hr />
      </div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
          }}
        >
          <span>Signed out by:</span>
          <span>{`${row.signed_out_by}`}</span>
        </div>
        <hr />
      </div>
      {/* <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
          }}
        >
          <span>Medicine Type:</span>
          <span>{`${row.medicinetype}`}</span>
        </div>
        <hr />
      </div>
      <div style={{ width: "300px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "300px",
          }}
        >
          <span>Medicine Details:</span>
          <span>{`${row.medicinedetails}`}</span>
        </div>
        <hr />
      </div> */}
    </div>
  ),
};
function User() {
  const studentDetails = useSelector((state) => state.student);
  const [studentRequired, setStudentRequired] = useState();

  useEffect(() => {
    studentDetails.then((data) => setStudentRequired(data));
  }, []);
  return (
    <>
      {console.log("studend", studentRequired)}
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {studentRequired && (
                      // <img
                      //   alt="new"
                      //   className="avatar border-gray"
                      //   style={{ width: 100, height: 100 }}
                      //   src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentRequired[0].stu_id}`}
                      // />

                      <AsyncImage
                        className="avatar border-gray"
                        style={{ width: 100, height: 100 }}
                        src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${studentRequired[0].stu_id}`}
                      />
                    )}

                    <h5 className="title">
                      {studentRequired ? studentRequired[0].name : "Akampa"}
                    </h5>
                  </a>
                  <p className="">
                    {studentRequired ? studentRequired[0].regno : "2021"}
                  </p>
                  <p className="">
                    {studentRequired ? studentRequired[0].stdno : "2000101041"}
                  </p>
                </div>
                <p className=" text-center">
                  {studentRequired ? studentRequired[0].progtitle : "BCS"}{" "}
                  <br />
                  {studentRequired
                    ? studentRequired[0].programlevel
                    : "BCS"}{" "}
                  <br />
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="4" md="7" xs="6">
                      <h5>
                        <small>Study Year</small> <br />
                        {studentRequired ? studentRequired[0].study_yr : "2"}
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        <small>Semester</small>
                        <br />
                        {studentRequired ? studentRequired[0].current_sem : "1"}
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="4" md="7" xs="6">
                      <h5>
                        <small>Study Time</small>
                        <br />
                        {studentRequired
                          ? studentRequired[0].study_time
                          : "DAY"}
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Members</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/ayo-ogunseinde-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        DJ Khaled <br />
                        <span className="text-muted">
                          <small>Offline</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/joe-gardner-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Creative Tim <br />
                        <span className="text-success">
                          <small>Available</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/clem-onojeghuo-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Flume <br />
                        <span className="text-danger">
                          <small>Busy</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card> */}
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h4">
                  {studentRequired
                    ? ` ${studentRequired[0].name}'s Entrance on ${new Date(
                        studentRequired[0].signin_date
                      ).toDateString()}`
                    : ` Lubega Tasha's Entrance on 7/07/2022`}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  keyField="id"
                  data={studentRequired ? studentRequired : products}
                  columns={columns}
                  search
                >
                  {(props) => (
                    <div>
                      {/* <h3>Input something at below input field:</h3> */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: 10,
                        }}
                      >
                        <SearchBar {...props.searchProps} />
                      </div>
                      {/* <ClearSearchButton { ...props.searchProps } /> */}

                      <BootstrapTable
                        {...props.baseProps}
                        expandRow={expandRow}
                        bootstrap4
                        responsive
                        striped
                        hover
                        condensed
                        noDataIndication="Table is empty"
                        // expandRow={expandRow()}
                        // defaultSorted={defaultSorted}
                        pagination={paginationFactory()}
                      />
                      {/* <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
                    </div>
                  )}
                </ToolkitProvider>

                {/* <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory()}/> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
