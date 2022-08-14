
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const products = [{
  id: 1,
  name: "Lubega Tasha",
  time: "8:49:52",

},
{
  id: 2,
  name: " Prof. Wakkoli James",
  time: "7:43:12",
  
}]

const columns = [{
    dataField: 'id',
    text: 'ID',
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'time',
    text: 'Time'
  },
];



function teachingStaffTable() {
    return (
        <div className='content'>
          <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Teaching Staff Table</CardTitle>
                <hr />
              </CardHeader>
              <CardBody>
              
              <ToolkitProvider
                  keyField="id"
                  data={ products }
                  columns={ columns }
                  search
                >
                  {
                    props => (
                      <div>
                        {/* <h3>Input something at below input field:</h3> */}
                        <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 10}}>
                        <SearchBar { ...props.searchProps } />

                        </div>
                        {/* <ClearSearchButton { ...props.searchProps } /> */}
                        
                        <BootstrapTable
                          { ...props.baseProps }
                          bootstrap4  pagination={ paginationFactory()}
                        />
                        {/* <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
                      </div>
                    )
                  }
                </ToolkitProvider>

            {/* <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory()}/> */}
              </CardBody>
            </Card>
            </Col>
            </Row>
        </div>
        
    
  );
}

export default teachingStaffTable;
