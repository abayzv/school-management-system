import React from 'react';
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2'
import API from "../../services";
import { Modal, Button } from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

// Fungsi Untuk Memanggil Tombol Search Pada Datatable
const { SearchBar } = Search;

class TableTransaction extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            column: [
                {
                    dataField: 'id',
                    text: 'Payment ID'
                },
                {
                    dataField: 'name',
                    text: 'Student Name',
                    sort: true
                },
                {
                    dataField: 'fee_name',
                    text: 'Fee Name',
                    sort: true
                },
                {
                    dataField: 'payment_method',
                    text: 'Payment Method',
                    formatter: this.statuses,
                },
                {
                    dataField: 'ammount',
                    text: 'Amount',
                    sort: true
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.action,
                },
            ],
            data: [],
            isUpdate: false
        }
    }

    // Funsi untuk membuka Modal
    openModal = () => {
        this.setState({
            visible: true
        });
    }

    // Fungsi untuk menutup Modal

    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    invoice = (id) => {
        this.props.history.push(`/invoice/${id}`)
    }

    // Paid Status
    statuses = (cell, row, rowIndex, formatExtraData) => {
        return <span class="badge bg-gradient-quepal text-white shadow-sm w-100">{row.payment_method}</span>
    }

    // Fungsi untuk reset Form dan memanggil Modal
    resetInput = () => {
        this.setState({
            isUpdate: false,
            formFeeGroup: {
                name: "",
                description: "",
            }
        })
        this.openModal()
    }


    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        if (this.state.isUpdate) {
            API.updateFeeGroup(this.state.formFeeGroup.id, this.state.formFeeGroup).then(res => {
                this.getFeeGroupApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Fee Group has been edited',
                    'success'
                )
            })
        } else {
            API.saveFeeGroup(this.state.formFeeGroup).then(res => {
                this.getFeeGroupApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Fee Group has been saved',
                    'success'
                )
            })

        }
    }

    // Fungsi untuk memanggil data kedalam form
    handleUpdate = (datas) => {
        this.setState({
            isUpdate: true
        })
        axios.get(`https://anifox.posapp.id/api/feetype/${datas}`).then(res => {
            this.setState({
                formFeeGroup: res.data.data
            })
        })
    }

    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div class="d-flex order-actions">
                <button onClick={() => {
                    this.invoice(row.id)
                }} class="btn btn-warning"><i class="bx bx-printer"></i> Invoice</button>
            </div>
        )
    }

    // Fungsi untuk mengahapus data
    handleRemove = (datas) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                API.deleteFeeGroup(datas).then((res) => {
                    this.getFeeGroupApi();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Fee Group has been deleted.',
                        'success'
                    )
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })
    }

    // Fungsi untuk memanggil data
    getTransactionApi = () => {
        API.getTransaction().then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getTransactionApi();
    }


    render() {
        return <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        {/* Datatable */}
                        <ToolkitProvider
                            keyField="id"
                            data={this.state.data}
                            columns={this.state.column}
                            search
                        >
                            {
                                props =>
                                    <div>
                                        <div class="d-lg-flex align-items-center mb-4 gap-3">
                                            <SearchBar {...props.searchProps} />
                                        </div>
                                        <BootstrapTable {...props.baseProps} pagination={paginationFactory()} />
                                    </div>
                            }
                        </ToolkitProvider>
                        {/* End Data Table */}
                    </div>
                </div>
            </div>
        </div>
    }
}

export default TableTransaction;