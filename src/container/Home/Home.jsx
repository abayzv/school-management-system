import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TableStudent from "../../components/Table/TableStudent";
import YoutubeComp from "../../components/YoutubeComponent/YoutubeComp";
import Header from "../../components/Header/Header";
import Sidenav from "../../components/Sidenav/Sidenav";
import SearchStudentClassRoom from "../Cards/SearchStudentClassRoom";
import TableClassMaster from "../../components/Table/TableClassMaster";
import TableSection from "../../components/Table/TableSection";
import TableClassGroup from "../../components/Table/TableClassGroup";
import TableFeeGroup from "../../components/Table/TableFeeGroup";
import TableFeeType from "../../components/Table/TableFeeType";
import TableFeeMaster from "../../components/Table/TableFeeMaster";
import assignFeeClassRoom from "../Cards/assignFeeClassRoom";
import CollectFee from "../Cards/CollectFee";
import TableStudentFee from "../../components/Table/TableStudentFee";
import InvoiceComponent from "../../components/Invoices/invoice";
import TableTransaction from "../../components/Table/TableTransaction";
import Dashboard from "../../components/Dashboard/Dashboard";


export default function App() {
  return (
    <Router>
      <Header />
      <Sidenav />
      <div className="alertss">
        <div class="alert alert-info border-0 bg-info alert-dismissible fade show py-2">
          <div class="d-flex align-items-center">
            <div class="font-35 text-dark"><i class='bx bx-info-square'></i>
            </div>
            <div class="ms-3">
              <h6 class="mb-0 text-dark">Info</h6>
              <div class="text-dark">Fungsi deletenya saya matikan dulu ya gaes, biar ga ada yang iseng hehe ^^</div>
            </div>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
      <Fragment>
        {/* Root Route */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/students" exact component={TableStudent} />
        {/* Class Room Route */}
        <Route path="/classroom" component={SearchStudentClassRoom} />
        <Route path="/classmaster" component={TableClassMaster} />
        <Route path="/classgroup" component={TableClassGroup} />
        <Route path="/section" component={TableSection} />

        {/* Fee Route */}
        <Route path="/transaction" exact component={TableTransaction} />
        <Route path="/collectfee" exact component={CollectFee} />
        <Route path="/collectfee/:id" component={TableStudentFee} />
        <Route path="/feegroup" component={TableFeeGroup} />
        <Route path="/feetype" component={TableFeeType} />
        <Route path="/feemaster" exact component={TableFeeMaster} />
        <Route path="/feemaster/:id" component={assignFeeClassRoom} />
        <Route path="/yt" component={YoutubeComp} />

        {/* Invoice Rout */}
        <Route path="/invoice/:id" exact component={InvoiceComponent} />
      </Fragment>
    </Router>
  );
}
