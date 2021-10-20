import React from "react";
import API from "../../services";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2'
import { Modal, Button } from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})
const { SearchBar } = Search;

class SearchStudentClassRoom extends React.Component {
    // Constructor untuk Statefull Component
    constructor() {
        super();
        this.state = {
            classroom: [],
            section: [],
            search: {
                classId: "",
                sectionId: "",
            },
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

    // Action Button
    action = (cell, row, rowIndex, formatExtraData) => {
        if (row.status) {
            return <button onClick={() => {
                this.kickStudent(row.id)
            }} class="btn btn-danger">Remove</button>
        }
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
                    url: `http://localhost:8000/api/removestudentclass`,
                    data: {
                        student_id: props
                    }
                }).then((res) => {
                    this.getStudentClassRoom();
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
    getStudentClassRoom = () => {
        axios.get(`http://localhost:8000/api/searchclassroom?class=${this.state.search.classId}&section=${this.state.search.sectionId}}`).then((result) => {
            if (result.data.data !== 'undefined' && result.data.data.length > 0) {
                this.setState({
                    data: result.data.data
                })
            } else {
                swalWithBootstrapButtons.fire(
                    'Empty!',
                    'The class you chose is empty.',
                    'warning'
                )
            }
        });
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const searchNew = { ...this.state.search }
        searchNew[event.target.id] = event.target.value
        this.setState({
            search: searchNew
        })
    }



    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getClassRoomData();
        this.getSectionData();
    }

    render() {
        return <div className="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <h4 class="card-title mb-0">
                                    <i class=""></i>Select Class
                                </h4>
                                <div class="
                                            small text-muted">
                                    Find student in this class group
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label for="name">Class</label>
                                            <select class="form-select" id="classId" name="class" onChange={this.handleFormChange}>
                                                <option selected>Please select</option>
                                                {
                                                    this.state.classroom.map(classroom => {
                                                        return <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label for="name">Section</label>
                                            <select class="form-select" id="sectionId" name="section" onChange={this.handleFormChange}>
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
                                <div class="float-left">
                                    <button onClick={this.getStudentClassRoom} id="btn-searchclass" class="btn btn-primary mt-3">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <h4 class="card-title mb-0">
                                    <i class=""></i>List Of Student
                                </h4>
                                <div class="
                                        small text-muted">
                                    The following is a list of students from class <span id="classname"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col">
                                <div class="row">
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
                                                        <BootstrapTable {...props.baseProps} pagination={paginationFactory()} wrapperClasses="table-responsive" />
                                                    </div>
                                            }
                                        </ToolkitProvider>
                                        {/* End Data Table */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SearchStudentClassRoom