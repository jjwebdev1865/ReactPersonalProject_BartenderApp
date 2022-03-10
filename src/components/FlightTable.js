import React from 'react';
import './static/styles.css';

export default class FlightTable extends React.Component {

    render() {
        return (
            <div className='container' id='flightTableDiv'>
                <h2 className='tableH2'>Flight Order</h2>
                <table>
                    <thead>
                        <tr>
                            <th className='nameCol'>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.flightList.map((flight_item, index) => {
                            return (
                                <tr>
                                    <td>{flight_item.name}</td>
                                    <td>{flight_item.price}</td>
                                    <td>1</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}