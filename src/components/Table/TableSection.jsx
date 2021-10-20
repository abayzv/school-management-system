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

class TableSection extends React.Component {
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
                    text: 'Name',
                    sort: true
                },
                {
                    dataField: 'id',
                    text: 'Action',
                    formatter: this.action,
                },
            ],
            data: [],
            formSection: {
                name: "",
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
            formSection: {
                name: "",
            }
        })
        this.openModal()
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formSectionNew = { ...this.state.formSection }
        formSectionNew[event.target.id] = event.target.value
        this.setState({
            formSection: formSectionNew
        })
    }

    // Fungsi untuk Update & Save data melalui API
    saveHandler = () => {
        if (this.state.isUpdate) {
            API.updateSection(this.state.formSection.id, this.state.formSection).then(res => {
                this.getSectionApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Section has been edited',
                    'success'
                )
            })
        } else {
            API.saveSection(this.state.formSection).then(res => {
                this.getSectionApi()
                this.resetInput()
                swalWithBootstrapButtons.fire(
                    'Success!',
                    'Section has been saved',
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
        axios.get(`https://anifox.posapp.id/api/section/${datas}`).then(res => {
            this.setState({
                formSection: res.data.data
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
                    // this.handleRemove(row.id)
                }}><i class="bx bxs-trash"></i></a>
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
                API.deleteSection(id).then((res) => {
                    this.getSectionApi();
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Section has been deleted.',
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
    getSectionApi = () => {
        API.getSection().then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getSectionApi();
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
                                            <div class="ms-auto"><button class="btn btn-primary radius-30 mt-2 mt-lg-0" onClick={this.resetInput}><i class="bx bxs-plus-square"></i>Add Section</button></div>
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
                    <Modal.Title>Add Class Master</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Name</label>
                                <input value={this.state.formSection.name} type="text" class="form-control" id="name" placeholder="Input Section Name" onChange={this.handleFormChange} />
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

export default TableSection;