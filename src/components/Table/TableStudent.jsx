import React from 'react';
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2'
import API from "../../services";
import { Modal, Button } from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import ReactTooltip from 'react-tooltip';


const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

// Fungsi Untuk Memanggil Tombol Search Pada Datatable
const { SearchBar } = Search;

class TableStudent extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            column: [
                {
                    dataField: 'nis',
                    text: 'Nis'
                },
                {
                    dataField: 'name',
                    text: 'Name',
                    sort: true
                },
                {
                    dataField: 'gender',
                    text: 'Gender',
                    formatter: function (cell, row) {
                        if (row.gender === "Laki - Laki") {
                            return <span class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>{row.gender}</span>
                        } else {
                            return <span class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>{row.gender}</span>
                        }
                    }
                },
                {
                    dataField: 'birth_place',
                    text: 'Birth Place'
                },
                {
                    dataField: 'birth_date',
                    text: 'Birth Date'
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.action,
                },
            ],
            data: [],
            formStudent: {
                image: "https://i.pravatar.cc/300",
                password: "$2a$12$H1f6qPMXPMC02Gc9cKEb3OPZCQAjusg64Rjwxteq7vjzsbUMxyMs6",
                nis: "",
                name: "",
                gender: "",
                birth_place: "",
                birth_date: "",
                religion: "",
                address: "",
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
            formStudent: {
                image: "https://i.pravatar.cc/300",
                password: "$2a$12$H1f6qPMXPMC02Gc9cKEb3OPZCQAjusg64Rjwxteq7vjzsbUMxyMs6",
                nis: "",
                name: "",
                gender: "",
                birth_place: "",
                birth_date: "",
                religion: "",
                address: "",
            }
        })
        this.openModal()
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formStudentNew = { ...this.state.formStudent }
        formStudentNew[event.target.id] = event.target.value
        this.setState({
            formStudent: formStudentNew
        })
    }

    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        if (this.state.isUpdate) {
            API.updateStudent(this.state.formStudent.id, this.state.formStudent).then(res => {
                this.getStudentApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Student has been edited',
                    'success'
                )
            })
        } else {
            API.saveStudent(this.state.formStudent).then(res => {
                this.getStudentApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Student has been saved',
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
        axios.get(`http://localhost:8000/api/student/${datas}`).then(res => {
            this.setState({
                formStudent: res.data.data
            })
        })
    }

    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div class="d-flex order-actions">
                <a data-tip data-for='edits' href="#" class="" onClick={() => {
                    this.openModal()
                    this.handleUpdate(row.id)
                }}><i class="bx bxs-edit"></i></a>
                <a data-tip data-for='ktp' href={"http://localhost:8000/kartupelajar/" + row.id} target="_blank" rel="noreferrer noopener" class="ms-3"><i class="bx bxs-credit-card-front"></i></a>
                <a data-tip data-for='deletes' href="#" class="ms-3" onClick={() => {
                    this.handleRemove(row.id)
                }}><i class="bx bxs-trash"></i></a>
                <ReactTooltip key={row.id} id='edits'>
                    <span>Edit Student</span>
                </ReactTooltip>
                <ReactTooltip key={row.id} id='ktp'>
                    <span>Get Student Card</span>
                </ReactTooltip>
                <ReactTooltip key={row.id} id='deletes'>
                    <span>Delete Student</span>
                </ReactTooltip>
            </div>
        )
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
                axios({
                    method: "delete",
                    url: `http://localhost:8000/api/student/${id}`
                }).then((res) => {
                    this.getStudentApi();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Student has been deleted.',
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
    getStudentApi = () => {
        API.getStudent().then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getStudentApi();
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
                                            <div class="ms-auto"><button class="btn btn-primary radius-30 mt-2 mt-lg-0" onClick={this.resetInput}><i class="bx bxs-plus-square"></i>Create Student</button></div>
                                        </div>
                                        <BootstrapTable {...props.baseProps} pagination={paginationFactory()} />
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
                    <Modal.Title>Register Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="name">Name</label>
                                <input value={this.state.formStudent.name} type="text" class="form-control" id="name" placeholder="Input Student Name" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="NIS">NIS</label>
                                <input type="text" value={this.state.formStudent.nis} class="form-control" id="nis" placeholder="Input Student NIS" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="name">Gender</label>
                                <select id="gender" value={this.state.formStudent.gender} class="form-select" onChange={this.handleFormChange}>
                                    <option>Select Gender</option>
                                    <option value="Laki - Laki">Laki - Laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="birth_place">Birth Place</label>
                                <input value={this.state.formStudent.birth_place} type="text" class="form-control" id="birth_place"
                                    placeholder="Input Student Birth Place" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="birth_date">Birth Date</label>
                                <input value={this.state.formStudent.birth_date} type="date" class="form-control" id="birth_date"
                                    placeholder="Input Student Birth Date" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label htmlFor="religion" >Religion</label>
                                <input value={this.state.formStudent.religion} type="text" class="form-control" id="religion" placeholder="Input Religion" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Address</label>
                                <textarea value={this.state.formStudent.address} class="form-control" name="address" id="address" cols="30" rows="3" onChange={this.handleFormChange}></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    <button type="submit" class="btn btn-primary px-5" onClick={this.saveHandler}>Save</button>
                </Modal.Footer>
            </Modal>

            {/* End Modal */}
        </div>
    }
}

export default TableStudent;