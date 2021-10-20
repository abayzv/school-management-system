import React from 'react';
import ReactToPrint from 'react-to-print';


import { ComponentToPrint } from './ComponentToPrint';
import API from "../../services";

class InvoiceComponent extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            data: {},
            isUpdate: false
        }
    }

    getFeeApi = () => {
        API.getFeeTransaction(this.props.match.params.id).then(result => {
            console.log(result)
            this.setState({
                data: result
            })
        })
    }

    componentDidMount() {
        this.getFeeApi()
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-8 mx-auto">
                        <ReactToPrint
                            trigger={() => {
                                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                // to the root node of the returned component as it will be overwritten.
                                return <div class="text-end">
                                    <button type="button" class="btn btn-dark mb-3"><i class="bx bx-printer"></i> Print</button>
                                </div>;
                            }}
                            content={() => this.componentRef}
                        />
                        <ComponentToPrint
                            name={this.state.data.name}
                            fee_id={this.state.data.fee_id}
                            nis={this.state.data.nis}
                            fee_name={this.state.data.fee_name}
                            fee_description={this.state.data.description}
                            due_date={this.state.data.due_date}
                            address={this.state.data.address}
                            payment_method={this.state.data.payment_method}
                            amount={this.state.data.ammount}
                            ref={el => (this.componentRef = el)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceComponent;