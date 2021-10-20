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

class TableFeeMaster extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            column: [
                {
                    dataField: 'id',
                    text: '#'
                },
                {
                    dataField: 'name',
                    text: 'Fee Group',
                    sort: true
                },
                {
                    dataField: 'description',
                    text: 'Description',
                    sort: true
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.action,
                },
            ],
            fee_group: [],
            fee_type: [],
            data: [],
            fee_master_id: "",
            group_name: "",
            formFeeMaster: {
                fee_group_id: "",
                fee_type_id: "",
                due_date: "",
                amount: "",
            },
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

    // Fungsi untuk reset Form dan memanggil Modal
    resetInput = () => {
        this.setState({
            isUpdate: false,
            formFeeMaster: {
                fee_group_id: "",
                fee_type_id: "",
                due_date: "",
                amount: "",
            }
        })
        this.openModal()
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formFeeMasterNew = { ...this.state.formFeeMaster }
        formFeeMasterNew[event.target.id] = event.target.value
        this.setState({
            formFeeMaster: formFeeMasterNew
        })
    }

    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        API.saveFeeMaster(this.state.formFeeMaster).then(res => {
            this.getFeeData()
            this.resetInput()
            swalWithBootstrapButtons.fire(
                'Success!',
                'Fee Group has been saved',
                'success'
            )
        })
    }

    // Fungsi untuk memanggil data kedalam form
    handleUpdate = (datas) => {
        this.setState({
            isUpdate: true
        })
        axios.get(`http://localhost:8000/api/feetype/${datas}`).then(res => {
            this.setState({
                formFeeMaster: res.data.data
            })
        })
    }

    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div class="d-flex order-actions">
                <a href="#" class="" onClick={() => {
                    this.openModal()
                    this.handleUpdate(row.id)
                }}><i class="bx bxs-edit"></i></a>
                <a href="#" class="ms-3" onClick={() => {
                    this.handleRemove(row.id)
                }}><i class="bx bxs-trash"></i></a>
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

    getFeeGroupApi = () => {
        API.getFeeGroup().then(result => {
            this.setState({
                fee_group: result
            })
        })
    }

    getFeeTypeApi = () => {
        API.getFeeType().then(result => {
            this.setState({
                fee_type: result
            })
        })
    }

    // Fungsi untuk memanggil data
    getFeeMasterApi = () => {
        API.getFeeMaster().then(result => {
            this.setState({
                // data: result
            })
        })
    }

    // Fungsi untuk memanggil data
    getFeeData = () => {
        axios.get(`http://localhost:8000/api/updatedatamaster`).then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    assignStudentFee = (id, group_name) => {
        this.openModal()
        this.setState({
            group_name: group_name,
            fee_master_id: id
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getFeeGroupApi()
        this.getFeeData();
        this.getFeeTypeApi();
    }


    render() {
        return <div className="row">
            <div className="col-xl-5">
                <div class="card border-top border-0 border-4 border-primary">
                    <div class="card-body p-4">
                        <div class="card-title d-flex align-items-center">
                            <div><i class="bx bx-dollar-circle me-1 font-22 text-primary"></i>
                            </div>
                            <h5 class="mb-0 text-primary">Create Fee Master</h5>
                        </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Fee Group</label>
                                    <select class="form-select" id="fee_group_id" name="fee_group_id" onChange={this.handleFormChange} value={this.state.formFeeMaster.fee_group_id}>
                                        <option selected>Please select</option>
                                        {this.state.fee_group.map(fg => {
                                            return (
                                                <option value={fg.id}>{fg.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Fee Type</label>
                                    <select class="form-select" id="fee_type_id" name="fee_type_id" onChange={this.handleFormChange} value={this.state.formFeeMaster.fee_type_id}>
                                        <option selected>Please select</option>
                                        {this.state.fee_type.map(ft => {
                                            return (
                                                <option value={ft.id}>{ft.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Due Date</label>
                                    <input type="date" class="form-control" id="due_date" name="due_date" onChange={this.handleFormChange} value={this.state.formFeeMaster.due_date} />
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Ammount</label>
                                    <input type="number" class="form-control" id="amount" name="amount" onChange={this.handleFormChange} value={this.state.formFeeMaster.amount} />
                                </div>
                            </div>
                        </div>
                        <div class="float-right">
                            <button onClick={this.saveHandler} class="btn btn-primary mt-3">Save Data</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xl-7">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Fee Master</h5>
                        <hr />
                        <div class="accordion" id="accordionExample">
                            {this.state.data.map(fee => {
                                return (
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id={"headingOne" + fee.id}>
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + fee.id}
                                                aria-expanded="true" aria-controls="collapseOne">
                                                {fee.group_name}
                                            </button>
                                        </h2>
                                        <div id={"collapseOne" + fee.id} class="accordion-collapse collapse" aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <table class="table mb-0 table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Fee Name</th>
                                                            <th scope="col">Due Date</th>
                                                            <th scope="col">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fee.data.map(res => {
                                                            return (
                                                                <tr>
                                                                    <td>{res.type_name}</td>
                                                                    <td>{res.due_date}</td>
                                                                    <td>{res.ammount}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                                <div class="float-right">
                                                    <button onClick={() => {
                                                        this.props.history.push(`/feemaster/${fee.id}`)
                                                    }} class="btn btn-primary mt-3">Assign</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* MODAL */}

            <Modal size="lg" show={this.state.visible} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Fee {this.state.group_name} to Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                        <div class="col-12">
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
                </Modal.Body>
            </Modal>

            {/* End Modal */}
        </div>
    }
}

export default TableFeeMaster;