import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  Col,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import { Link, NavLink } from "react-router-dom";
import constraintsApi from "../api/constraintsApi";
import { useDispatch } from "react-redux";
import actions from "../redux/actions/Actions";
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [
  {
    id: 1,
    name: "Tuition",
    school: "SBA",
    programme: "DAY",
    intake: "FEB",
    percentage: "20",
    // profession: "Askari",
  },
  {
    id: 2,
    name: "Tuition",
    school: "SCI",
    programme: "DAY",
    intake: "FEB",
    percentage: "40",
    // profession: "Askari",
  },
];

function Constraints() {
  const [constraints, setConstraints] = useState();
  const dispatch = useDispatch();

  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div className="table-icons">
        {/* <Link
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
        </Link> */}

        <Link to="/admin/editConstraint" className="edit-button">
          <Tippy content={<span>Edit</span>} placement="bottom">
            <i
              style={{ fontSize: 24, cursor: "pointer", color: "black" }}
              className="fa fa-edit"
              onClick={() => {
                dispatch(actions.editConstraint(row));
                console.log(row);
              }}
            ></i>
          </Tippy>
        </Link>
      </div>
    );
  }

  const columns = [
    {
      dataField: "c_id",
      text: "ID",
    },
    {
      dataField: "c_name",
      text: "Name",
    },
    {
      dataField: "c_percentage",
      text: "Percentage",
    },
    {
      dataField: "action",
      text: "Action",
      formatter: rankFormatter,
    },
  ];

  const loadConstraints = async () => {
    const res = await constraintsApi.getContraints();
    if (!res.ok) {
      console.log("Failed to fetch the constraints");
    }

    setConstraints(res.data);
  };

  useEffect(() => {
    loadConstraints();
  }, []);
  return (
    <div className="content">
      {/* {console.log("constraints", constraints)} */}
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CardTitle tag="h4">Constraints</CardTitle>
                <Link
                  to="/admin/addConstraint"
                  className="edit-button"
                  style={{ color: "black" }}
                >
                  <Button color="primary">Add Contraint</Button>
                </Link>
              </div>
              <hr />
            </CardHeader>

            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={constraints ? constraints : products}
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
}

export default Constraints;
