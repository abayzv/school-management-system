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

class TableFeeType extends React.Component {
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
            data: [],
            formFeeGroup: {
                name: "",
                description: "",
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
            formFeeGroup: {
                name: "",
                description: "",
            }
        })
        this.openModal()
    }

    // Fungsi untuk update form
    handleFormChange = (event) => {
        const formFeeGroupNew = { ...this.state.formFeeGroup }
        formFeeGroupNew[event.target.id] = event.target.value
        this.setState({
            formFeeGroup: formFeeGroupNew
        })
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
        axios.get(`http://localhost:8000/api/feetype/${datas}`).then(res => {
            this.setState({
                formFeeGroup: res.data.data
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

    // Fungsi untuk memanggil data
    getFeeGroupApi = () => {
        API.getFeeGroup().then(result => {
            this.setState({
                data: result
            })
        })
    }

    // Fungsi yang di render ketika pertama kali load
    componentDidMount() {
        this.getFeeGroupApi();
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
                                            <div class="ms-auto"><button class="btn btn-primary radius-30 mt-2 mt-lg-0" onClick={this.resetInput}><i class="bx bxs-plus-square"></i>Add Fee Group</button></div>
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
                    <Modal.Title>Add Fee Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row g-3">
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Name</label>
                                <input value={this.state.formFeeGroup.name} type="text" class="form-control" id="name" placeholder="Input Fee Group Name" onChange={this.handleFormChange} />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label htmlFor="name">Address</label>
                                <textarea value={this.state.formFeeGroup.description} class="form-control" id="description" cols="30" rows="3" onChange={this.handleFormChange}></textarea>
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

export default TableFeeType;