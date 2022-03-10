import React from 'react';
import './static/styles.css';

export default class FlightTable extends React.Component {

    render() {
        return (
            <div className='container' id='flightTableDiv'>
                <h2 className='tableH2'>Flight Order</h2>
                <table id='flightTable'>
                    <thead>
                        <tr style={{width: '100%'}}>
                            <th className='flightNameHeader'>Name</th>
                            <th className='flightNumbersCol'>Price</th>
                            <th className='flightNumbersCol'>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.flightList.map((flight_item, index) => {
                            let id = "flightNo_" + index;
                            return (
                                <tr key={id}>
                                    <td>{flight_item.name}</td>
                                    <td>{flight_item.price}</td>
                                    <td>{flight_item.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}