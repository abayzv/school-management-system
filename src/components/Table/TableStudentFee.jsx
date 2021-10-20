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

class TableStudentFee extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            column: [
                {
                    dataField: 'fee_type_name',
                    text: 'Fee Name'
                },
                {
                    dataField: 'due_date',
                    text: 'Due Date',
                    sort: true
                },
                {
                    dataField: 'status',
                    text: 'Status',
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
            fee_master_id: "",
            student: {},
            data: [],
            formCollect: {
                payment_method: "",
                description: "",
            },
            isUpdate: false
        }
    }

    // Funsi untuk membuka Modal
    openModal = (id) => {
        this.setState({
            visible: true,
            fee_master_id: id
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
            formCollect: {
                payment_method: "",
                description: "",
            }
        })
        this.openModal()
    }

    collectFee = () => {
        axios({
            method: "post",
            url: `http://localhost:8000/api/colectfee`,
            data: {
                fee_student_id: this.props.match.params.id,
                fee_master_id: this.state.fee_master_id,
                payment_method: this.state.formCollect.payment_method,
                description: this.state.formCollect.description
            }
        }).then(response => {
            console.log(response)
            swalWithBootstrapButtons.fire(
                'Success!',
                'Fee has been colected.',
                'success'
            )
            this.getStudentFeeApi();
            this.closeModal();
        }).catch(error => {
            console.log(error)
        });
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formCollectNew = { ...this.state.formCollect }
        formCollectNew[event.target.id] = event.target.value
        this.setState({
            formCollect: formCollectNew
        })
    }

    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        if (this.state.isUpdate) {
            API.updateClassRoom(this.state.formCollect.id, this.state.formCollect).then(res => {
                this.getClassRoomApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Clas Room has been edited',
                    'success'
                )
            })
        } else {
            API.saveClassRoom(this.state.formCollect).then(res => {
                this.getClassRoomApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Clas Room has been saved',
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
        axios.get(`http://localhost:8000/api/classroom/${datas}`).then(res => {
            this.setState({
                formCollect: res.data.data
            })
        })
    }

    // Paid Status
    statuses = (cell, row, rowIndex, formatExtraData) => {
        if (row.status == "Paid") {
            return <span class="badge bg-gradient-quepal text-white shadow-sm w-100">Paid</span>
        } else {
            return <span class="badge bg-gradient-bloody text-white shadow-sm w-100">Unpaid</span>
        }
    }


    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        if (row.status == "Paid") {
            return (
                <div class="d-flex order-actions">
                    <button disabled class="btn btn-sm btn-dark">Collect</button>
                </div>
            )
        } else {
            return (
                <div class="d-flex order-actions">
                    <button onClick={() => {
                        this.openModal(row.id)
                    }} class="btn btn-sm btn-danger">Collect</button>
                </div>
            )
        }

    }

    // Fungsi untuk mengahapus data
    handleRemove = (id) => {
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
                API.deleteClassroom(id).then((res) => {
                    this.getClassRoomApi();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Class Room has been deleted.',
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
    getStudentDetailApi = () => {
        API.getStudentDetail(this.props.match.params.id).then(result => {
            this.setState({
                student: result
            })
        })
    }

    getStudentFeeApi = () => {
        API.getStudentFee(this.props.match.params.id).then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getStudentDetailApi();
        this.getStudentFeeApi();
    }


    render() {
        return <div className="row">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src={this.state.student.image} alt="Admin" class="rounded-circle p-1 bg-primary" width="110" />
                            <div class="mt-3">
                                <h4>{this.state.student.name}</h4>
                                <p class="text-secondary mb-1">{this.state.student.address}</p>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 class="mb-0">NIS</h6>
                                <span class="text-secondary">{this.state.student.nis}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 class="mb-0">Gender</h6>
                                <span class="text-secondary">{this.state.student.gender}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 class="mb-0">Birth</h6>
                                <span class="text-secondary">{this.state.student.birth_place}, {this.state.student.birth_date}</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h6 class="mb-0">Religion</h6>
                                <span class="text-secondary">{this.state.student.religion}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
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
                                        <BootstrapTable {...props.baseProps} />
                                    </div>
                            }
                        </ToolkitProvider>
                        {/* End Data Table */}
                    </div>
                </div>
            </div>
            {/* MODAL */}

            <Modal show={this.state.visible} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Collect Fee {this.state.fee_master_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Paymen Method</label>
                                <select class="form-select" id="payment_method" name="class" onChange={this.handleFormChange}>
                                    <option selected>Please select</option>
                                    <option value="cash">Cash</option>
                                    <option value="transfer">Transfer</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Description</label>
                                <textarea class="form-control" name="address" id="description" cols="30" rows="3" onChange={this.handleFormChange}></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    <button type="submit" class="btn btn-primary px-5" onClick={this.collectFee}>Save</button>
                </Modal.Footer>
            </Modal>

            {/* End Modal */}

        </div >
    }
}

export default TableStudentFee;