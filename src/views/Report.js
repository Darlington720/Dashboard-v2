import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSelector, useDispatch } from "react-redux";

import actions from "redux/actions/Actions";
import studentApi from "../api/studentApi";
import Select from "react-select";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [
  // {
  //   id: 1,
  //   signin_date: "5/07/22",
  //   full_name: "Lubega Tasha",
  //   temperature: "34",
  //   studentNo: "200303004",
  //   signin_time: "8:00:45",
  //   signed_in_by: "Joel",
  // },
  // {
  //   id: 2,
  //   name: "Wakkoli James",
  //   time: "7:45:02",
  // },
];

const v_products = [
  // {
  //   id: 1,
  //   signin_date: "5/07/22",
  //   full_name: "Lubega Tasha",
  //   temperature: "34",
  //   studentNo: "200303004",
  //   signin_time: "8:00:45",
  //   signed_in_by: "Joel",
  // },
  // {
  //   id: 2,
  //   name: "Wakkoli James",
  //   time: "7:45:02",
  // },
];

const Reports = () => {
  const d = new Date();
  const date2 = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  const [students, setStudents] = useState();
  const [studentDetails, setStudentDetails] = useState();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(date2);
  const [requiredData, setRequiredData] = useState("students");
  const [data, setData] = useState();

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerFormatter: headerFormatter,
    },
    {
      dataField: "stu_id",
      text: "Student No",
    },
    {
      dataField: "full_name",
      text: "full_name",
    },
    {
      dataField: "signin_date",
      text: "Date",
    },
    {
      dataField: "signin_time",
      text: "Time",
    },
    {
      dataField: "temperature",
      text: "temperature",
    },
    {
      dataField: "username",
      text: "signed_in_by",
    },
    {
      dataField: "action",
      text: "Action",
      formatter: rankFormatter,
      // headerFormatter: headerFormatter,
    },
  ];

  const visitorsColumns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "v_full_name",
      text: "Name",
    },
    {
      dataField: "reason",
      text: "Reason",
    },
    {
      dataField: "office",
      text: "Office",
    },
    {
      dataField: "date",
      text: "date",
    },
    {
      dataField: "time",
      text: "time",
    },
    // {
    //   dataField: "username",
    //   text: "signed in by",
    // },
    // {
    //   dataField: "signin_gate",
    //   text: "signin gate",
    // },
  ];

  function headerFormatter(column, colIndex) {
    return (
      <h6
        style={{
          textTransform: "capitalize",
        }}
      >
        {column.text}
      </h6>
    );
  }

  const getAllStudentDetails = async (studentNo) => {
    const res = await studentApi.getForSpecificStudentCustomReport(studentNo);
    if (!res.ok) {
      console.log("Failed to get today's details");
    }

    return res.data;
  };

  const getCustomReports2 = async (data) => {
    const res = await studentApi.getCustomReports(data);
    if (!res.ok) {
      console.log("Failed to fetch the desired data");
    }
    console.log("data", res.data);
    setData(res.data);
  };

  const handleView = (row) => {
    const result = getAllStudentDetails({
      studentNo: row.stu_id,
      date: row.signin_date,
    });
    dispatch(actions.getDetailsForStudent(result));
    console.log(result);
  };

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="table-icons">
        <Link
          to="/admin/studentPage"
          className="edit-button"
          style={{ color: "black" }}
        >
          <Tippy content="Details" placement="bottom">
            <i
              className="fa fa-eye"
              style={{ fontSize: 24, cursor: "pointer" }}
              onClick={() => handleView(row)}
            ></i>
          </Tippy>
        </Link>

        {/* <Link to="/admin/editCustomers" className="edit-button">
          <Tippy content={<span>Edit</span>} placement="bottom">
            <i className="bx bx-edit" onClick={() => console.log("edit")}></i>
          </Tippy>
        </Link> */}
      </div>
    );
  }

  const loadTodaysStudents = async () => {
    const res = await studentApi.getAllStudents();
    if (!res.ok) {
      console.log("Failed to get students");
    }

    setStudents(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadTodaysStudents();
    console.log("todays students", students);
  }, []);

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
            <span>Signin gate:</span>
            <span>{`${row.signin_gate}`}</span>
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
            <span>Signed in by:</span>
            <span>{`${row.username}`}</span>
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
            <span>Signed out by:</span>
            <span>{`${row.signed_out_by}`}</span>
          </div>
          <hr />
        </div> */}
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

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              {/* <CardTitle tag="h4">Students Table</CardTitle> */}
              <div
                style={{
                  display: "flex",
                  backgroundClip: "red",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div className="col-md-2">
                  <Select
                    className="react-select primary"
                    classNamePrefix="react-select"
                    name="Name"
                    styles={
                      {
                        // height: 90,
                        // padding: 20,
                        // width: 200,
                      }
                    }
                    // value={selectedItem}
                    onChange={(value) => {
                      setData("");
                      setRequiredData(value.value);
                      console.log(value);
                    }}
                    options={[
                      // {
                      //   value: "",
                      //   label: "Single Option",
                      //   isDisabled: true,
                      // },
                      { value: "students", label: "Students" },
                      { value: "visitors", label: "Visitors" },
                      { value: "staff", label: "Staff" },
                      {
                        value: "nonteachingstaff",
                        label: "Non Teaching Staff",
                      },
                      // { value: "3", label: "Is great" },
                    ]}
                    placeholder="Name"
                  />
                </div>

                <div className="col-md-3" style={{}}>
                  <Datetime
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    // onClose={() => setIsOpen(false)}
                    onChange={(value) => {
                      // setRequiredData("");
                      // setDate("");
                      const d = new Date(value._d);
                      const date2 =
                        d.getFullYear() +
                        "-" +
                        (d.getMonth() + 1) +
                        "-" +
                        d.getDate();
                      setIsOpen(false);
                      console.log(date2);
                      setDate(date2);
                    }}
                    initialValue={new Date()}
                  />
                </div>

                <div>
                  <Button
                    // type="submit"
                    color="primary"
                    onClick={() => {
                      const data = {
                        date: date,
                        requiredData: requiredData,
                      };
                      getCustomReports2(data);
                      console.log(data);
                    }}
                  >
                    Search
                  </Button>
                </div>
              </div>
              {/* <hr /> */}
            </CardHeader>
            <CardBody>
              {requiredData == "students" ? (
                <ToolkitProvider
                  keyField="stu_id"
                  data={data ? data : products}
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
              ) : (
                <ToolkitProvider
                  keyField="id"
                  data={data ? data : v_products}
                  columns={visitorsColumns}
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
                        pagination={paginationFactory()}
                      />
                      {/* <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
                    </div>
                  )}
                </ToolkitProvider>
              )}

              {/* <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory()}/> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
