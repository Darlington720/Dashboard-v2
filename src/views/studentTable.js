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
import { useSelector, useDispatch } from "react-redux";

import actions from "redux/actions/Actions";
import studentApi from "../api/studentApi";

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

const StudentTables = () => {
  const [students, setStudents] = useState();
  const [studentDetails, setStudentDetails] = useState();
  const dispatch = useDispatch();

  const columns = [
    // {
    //   dataField: "id",
    //   text: "ID",
    //   headerFormatter: headerFormatter,
    // },
    {
      dataField: "stu_id",
      text: "Student No",
    },
    {
      dataField: "name",
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
    const res = await studentApi.getForSpecificStudent(studentNo);
    if (!res.ok) {
      console.log("Failed to get today's details");
    }

    return res.data;
  };

  const handleView = (row) => {
    const result = getAllStudentDetails(row.stu_id);
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

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Students Table</CardTitle>
              <hr />
            </CardHeader>
            <CardBody>
              <ToolkitProvider
                keyField="stdno"
                data={students ? students : products}
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

              {/* <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory()}/> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentTables;
