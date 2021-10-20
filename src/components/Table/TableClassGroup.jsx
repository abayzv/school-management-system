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

class TableClassGroup extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            visible: false,
            classroom: [],
            section: [],
            column: [
                {
                    dataField: 'id',
                    text: '#'
                },
                {
                    dataField: 'nis',
                    text: 'Nis',
                    sort: true
                },
                {
                    dataField: 'name',
                    text: 'Name',
                    sort: true
                },
                {
                    dataField: 'gender',
                    text: 'Gender',
                    sort: true
                },
                {
                    dataField: 'name',
                    text: 'Status',
                    formatter: this.status,
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.action,
                },
            ],
            columnClassGroup: [
                {
                    dataField: 'class_name',
                    text: 'Class',
                    sort: true
                },
                {
                    dataField: 'section',
                    text: 'Section',
                    sort: true
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.actionClassGroup,
                },
            ],
            dataClassGroup: [],
            data: [],
            class_group_id: "",
            class_name: "",
            section_name: "",
            formClassGroup: {
                class_room_id: "",
                section_id: "",
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

    // Menghapus Student dari Kelas
    kickStudent = (props) => {
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
                    url: `https://anifox.posapp.id/api/removestudentclass`,
                    data: {
                        student_id: props
                    }
                }).then((res) => {
                    this.getAssignApi();
                    swalWithBootstrapButtons.fire(
                        'Removed!',
                        'Student is removed from class.',
                        'success'
                    )
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })
    }

    // Fungsi untuk reset Form dan memanggil Modal
    resetInput = () => {
        this.setState({
            isUpdate: false,
            formClassGroup: {
                name: "",
            }
        })
        this.openModal()
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formClassGroupNew = { ...this.state.formClassGroup }
        formClassGroupNew[event.target.id] = event.target.value
        this.setState({
            formClassGroup: formClassGroupNew
        })
    }

    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        axios({
            method: "post",
            url: `https://anifox.posapp.id/api/savegroup`,
            data: this.state.formClassGroup
        }).then(res => {
            this.getClassGroupApi()
            swalWithBootstrapButtons.fire(
                'Success!',
                'Class Group has been saved',
                'success'
            )
        }).catch(err => {
            swalWithBootstrapButtons.fire(
                'Error!',
                'Class Group is exist',
                'warning'
            )
        })
    }

    handleAssign = (datas) => {
        axios({
            method: "post",
            url: `https://anifox.posapp.id/api/assignstudentclass`,
            data: {
                student_id: datas,
                class_group_id: this.state.class_group_id
            }
        }).then((res) => {
            this.getAssignApi();
            swalWithBootstrapButtons.fire(
                'Success!',
                'Student added to Class Room',
                'success'
            )
        })
    }

    // Fungsi untuk memanggil data kedalam form
    handleUpdate = (datas) => {
        this.setState({
            isUpdate: true
        })
        axios.get(`https://anifox.posapp.id/api/classgroup/${datas}`).then(res => {
            this.setState({
                formClassGroup: res.data.data
            })
        })
    }

    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        if (row.status == "Asigned") {
            return (
                <div class="d-flex order-actions">
                    <button class="btn btn-primary" disabled>Assign</button>
                    <button class="btn btn-danger mx-2" onClick={() => {
                        this.kickStudent(row.id)
                    }}>Remove</button>
                </div>
            )
        } else {
            return (
                <div class="d-flex order-actions">
                    <button class="btn btn-primary" onClick={() => {
                        this.handleAssign(row.id)
                    }}>Assign</button>
                    <button class="btn btn-danger mx-2" disabled>Remove</button>
                </div>
            )
        }
    }

    assignStudentClass = (id, class_name, section_name) => {
        this.openModal()
        this.setState({
            class_name: class_name,
            section_name: section_name,
            class_group_id: id
        })
    }

    // Action Button
    actionClassGroup = (cell, row, rowIndex, formatExtraData) => {
        return (
            <div>
                <button class="btn btn-sm btn-primary mx-2" onClick={() => {
                    this.assignStudentClass(row.id, row.class_name, row.section)
                }}>Assign</button>
                <button class="btn btn-sm btn-danger" onClick={() => {
                    // this.handleRemove(row.id)
                }}>Remove</button>
            </div>
        )
    }

    status = (cell, row, rowIndex, formatExtraData) => {
        if (row.status == "Asigned") {
            return <span class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>{row.status}</span>
        } else {
            return <span class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>{row.status}</span>
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
                API.deleteClassGroup(id).then((res) => {
                    this.getClassGroupApi();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Class Group has been deleted.',
                        'success'
                    )
                })
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })
    }

    // Fungsi untuk memanggil data Class Room
    getClassRoomData = () => {
        API.getClassroom().then(result => {
            this.setState({
                classroom: result
            })
        })
    }
    // Fungsi untuk memanggil data Section
    getSectionData = () => {
        API.getSection().then(result => {
            this.setState({
                section: result
            })
        })
    }

    // Fungsi untuk memanggil data
    getClassGroupApi = () => {
        API.getClassGroup().then(result => {
            this.setState({
                dataClassGroup: result
            })
        })
    }

    // Fungsi untuk assign student
    getAssignApi = () => {
        API.getStudentAssign().then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getClassGroupApi();
        this.getAssignApi();
        this.getClassRoomData();
        this.getSectionData();

    }


    render() {
        return <div className="row">
            <div className="col-xl-5">
                <div class="card border-top border-0 border-4 border-primary">
                    <div class="card-body p-4">
                        <div class="card-title d-flex align-items-center">
                            <div><i class="bx bx-dollar-circle me-1 font-22 text-primary"></i>
                            </div>
                            <h5 class="mb-0 text-primary">Create Class Group</h5>
                        </div>
                        <div class="row g-3">
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Class</label>
                                    <select class="form-select" id="class_room_id" name="fee_group_id" onChange={this.handleFormChange}>
                                        <option selected>Please select</option>
                                        {
                                            this.state.classroom.map(classroom => {
                                                return <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label for="name">Section</label>
                                    <select class="form-select" id="section_id" name="fee_type_id" onChange={this.handleFormChange}>
                                        <option selected>Please select</option>
                                        {
                                            this.state.section.map(section => {
                                                return <option key={section.id} value={section.id}>{section.name}</option>
                                            })
                                        }
                                    </select>
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
                <div className="card">
                    <div className="card-body">
                        {/* Datatable */}
                        <ToolkitProvider
                            keyField="id"
                            data={this.state.dataClassGroup}
                            columns={this.state.columnClassGroup}
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

            {/* MODAL */}

            <Modal size="lg" show={this.state.visible} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Student to Class {this.state.class_name} {this.state.section_name}</Modal.Title>
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

export default TableClassGroup;