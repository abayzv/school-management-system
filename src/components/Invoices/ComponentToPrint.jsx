import React from "react";
import numeral from 'numeral';
import { upperCase } from 'upper-case';

export class ComponentToPrint extends React.PureComponent {

    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <div class="invoice overflow-auto p-5">
                <div style={{
                    minWidth: '600px'
                }}>
                    <header>
                        <div class="row">
                            <div class="col">
                                <a href="javascript:;">
                                    <img src={window.location.origin + "/assets/images/logo-icon.png"} width="80" alt="" />
                                </a>
                            </div>
                            <div class="col company-details">
                                <h5 class="name">
                                    <a target="_blank" href="javascript:;">
                                        SMA NEGERI 1 BANDUNG
                                    </a>
                                </h5>
                                <div>Jl. Rajamantri Kulon No.17A, Turangga</div>
                                <div>Kec. Lengkong, Kota Bandung</div>
                                <div>Jawa Barat 40264</div>
                            </div>
                        </div>
                    </header>
                    <main>
                        <div class="row contacts">
                            <div class="col invoice-to">
                                <div class="text-gray-light">INVOICE TO: </div>
                                <h3 class="to">{this.props.name}</h3>
                                <div class="address">{this.props.address}</div>
                            </div>
                            <div class="col invoice-details">
                                <h4 class="invoice-id">INVOICE - {this.props.fee_id}</h4>
                                <div class="date">Date of Invoice: {date}</div>
                                <div class="date">Due Date: {this.props.due_date}</div>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="text-left">DESCRIPTION</th>
                                    <th class="text-right">PAYMENT METHOD</th>
                                    <th class="text-right">AMOUNT</th>
                                    <th class="text-right">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="no">01</td>
                                    <td class="text-left">
                                        <h3>{this.props.fee_name}</h3>{this.props.fee_description}</td>
                                    <td class="unit">{this.props.payment_method}</td>
                                    <td class="qty">Rp. {numeral(this.props.amount).format('0,0')}</td>
                                    <td class="total">Rp. {numeral(this.props.amount).format('0,0')}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">SUBTOTAL</td>
                                    <td>Rp. {numeral(this.props.amount).format('0,0')}</td>
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td colspan="2">GRAND TOTAL</td>
                                    <td>Rp. {numeral(this.props.amount).format('0,0')}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="notices">
                            <div>NOTICE:</div>
                            <div class="notice">Silahkan melakukan pembayaran sebelum tenggat waktu agar tidak dikenakan denda, terima kasih</div>
                        </div>
                    </main>
                    {/* <footer>Invoice was created on a computer and is valid without the signature and seal.</footer> */}
                </div >
                <div></div>
            </div >
        );
    }
}