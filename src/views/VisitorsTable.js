import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import visitorsApi from "../api/visitorsApi";

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [
  // {
  //   id: 1,
  //   name: "Lubega Tasha",
  //   price: 500,
  //   reason: "Official Visit from MoES",
  //   office: "Vice Chancellor",
  // },
  // {
  //   id: 2,
  //   name: "Wakkoli James",
  //   price: 400,
  //   reason: "Alumni",
  //   office: "Dean",
  // },
];

const columns = [
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

function VisitorsTable() {
  const [visitors, setVisitors] = useState();

  const loadTodaysVisitors = async () => {
    const res = await visitorsApi.getVisitorsToday();
    if (!res.ok) {
      console.log("Failed to get students");
    }

    setVisitors(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    loadTodaysVisitors();

    console.log("todays visitors", visitors);
  }, []);
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Visitors Table</CardTitle>
              <hr />
            </CardHeader>
            <CardBody>
              <ToolkitProvider
                keyField="id"
                data={visitors ? visitors : products}
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

export default VisitorsTable;
