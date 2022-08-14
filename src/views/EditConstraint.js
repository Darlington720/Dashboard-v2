import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import { Link, NavLink } from "react-router-dom";
import constraintsApi from "../api/constraintsApi";
import Select from "react-select";
import actions from "redux/actions/Actions";
import { useDispatch, useSelector } from "react-redux";
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [
  {
    id: 1,
    name: "Kabuura Logan",
    time: "8:49:52",
    profession: "Askari",
  },
  {
    id: 2,
    name: "Ojambo Festo",
    time: "7:43:12",
    profession: "Cleaner",
  },
];

const columns = [
  {
    dataField: "id",
    text: "ID",
  },
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "time",
    text: "Time",
  },
  {
    dataField: "profession",
    text: "Profession",
  },
];

function Constraints() {
  const constraintEdit = useSelector((state) => state.constraint);
  const [selectedItem, setSelectedItem] = useState({
    label: constraintEdit.c_name,
    value: constraintEdit.c_name,
  });
  const [percentage, setPercentage] = useState(constraintEdit.c_percentage);
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const updateConstraint = async (constraint) => {
    const res = await constraintsApi.updateConstraint(constraint);
    if (!res.ok) {
      console.log("failed to update the constraint");
    }

    successAlert();
    console.log("response", res.data);
  };

  const successAlert = () => {
    setAlert(
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <SweetAlert
          success
          style={{ display: "block" }}
          title="Successful"
          onConfirm={() => setAlert(false)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          Constraint Saved Successfully
        </SweetAlert>
      </div>
    );
  };
  return (
    <div className="content">
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
                <CardTitle tag="h4">Edit Constraint</CardTitle>
                <Link
                  to="/admin/constraints"
                  className="edit-button"
                  style={{ color: "black" }}
                >
                  <Button color="primary">Contraint List</Button>
                </Link>
              </div>
              {/* <CardTitle tag="h4">Constraints</CardTitle> */}
              <hr />
            </CardHeader>
            <CardBody>
              <form>
                {/* <div className="form-row">
                  <FormGroup className="col-md-4">
                    <Label for="inputEmail4">Name</Label>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="Name"
                      // value={this.state.singleSelect}
                      // onChange={(value) =>
                      //   this.setState({ singleSelect: value })
                      // }
                      options={[
                        {
                          value: "",
                          label: "Single Option",
                          isDisabled: true,
                        },
                        { value: "2", label: "Foobar" },
                        { value: "3", label: "Is great" },
                      ]}
                      placeholder="Name"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="inputEmail4">School</Label>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="School"
                      // value={this.state.singleSelect}
                      // onChange={(value) =>
                      //   this.setState({ singleSelect: value })
                      // }
                      options={[
                        {
                          value: "",
                          label: "Single Option",
                          isDisabled: true,
                        },
                        { value: "2", label: "Foobar" },
                        { value: "3", label: "Is great" },
                      ]}
                      placeholder="School"
                    />
                  </FormGroup>

                  <FormGroup className="col-md-4">
                    <Label for="inputEmail4">Programme</Label>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="Name"
                      // value={this.state.singleSelect}
                      // onChange={(value) =>
                      //   this.setState({ singleSelect: value })
                      // }
                      options={[
                        {
                          value: "",
                          label: "Single Option",
                          isDisabled: true,
                        },
                        { value: "2", label: "Foobar" },
                        { value: "3", label: "Is great" },
                      ]}
                      placeholder="Programme"
                    />
                  </FormGroup>
                </div> */}
                <div className="form-row">
                  <FormGroup className="col-md-4">
                    <Label for="inputEmail4">Name</Label>
                    <Select
                      className="react-select primary"
                      classNamePrefix="react-select"
                      name="Name"
                      value={selectedItem}
                      onChange={(value) => setSelectedItem(value)}
                      options={[
                        // {
                        //   value: "",
                        //   label: "Single Option",
                        //   isDisabled: true,
                        // },
                        { value: "fees", label: "Fees" },
                        // { value: "3", label: "Is great" },
                      ]}
                      placeholder="Name"
                    />
                  </FormGroup>
                  <FormGroup className="col-md-4">
                    <Label for="inputEmail4">{"Constraint(%)"}</Label>
                    <Input
                      type="number"
                      // id=""
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      placeholder="0"
                    />
                  </FormGroup>
                </div>

                <Button
                  // type="submit"
                  color="primary"
                  onClick={() => {
                    const data = {
                      c_id: constraintEdit.c_id,
                      c_name: selectedItem.value,
                      c_percentage: percentage,
                    };
                    console.log(data);
                    setSelectedItem({ label: "", value: "" });
                    setPercentage("");
                    updateConstraint(data);
                  }}
                >
                  Update
                </Button>
                {alert}
              </form>
              {/* <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory()}/> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Constraints;
