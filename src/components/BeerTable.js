import React from 'react';
import './static/styles.css';

export default class BeerTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newBeerName: "",
        }
    }

    handleChangeTable = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    };

    render() {
        return (
            <div className='container' id='beerTableDiv'>
                <h2 className='tableH2'>Beer List</h2>
                <table id='beerTable'>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Average Rating</th>
                        <th>Review Count</th>
                        <th>Delete(Y/N)?</th>
                        <th>Change Name(Y/N)?</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.beerList.map((beer, index) => {
                            let id = "beer__" + index
                            return (
                                <tr key={id}>
                                    <td><input type="checkbox" name='flightCheckBox' id='flightCheckBox' onChange={this.props.flightHandler(beer)}/></td>
                                    <td className='nameCol'>{beer.name}</td>
                                    <td className='numbersCol'>{beer.price}</td>
                                    <td className='numbersCol'>{Number(beer.rating.average).toFixed(2)}</td>
                                    <td className='numbersCol'>{beer.rating.reviews}</td>
                                    <td className='deleteCol'>
                                        <input type="button" value="DELETE" onClick={this.props.deleteHandler(beer)}/>
                                    </td>
                                    <td className='nameChangeCol'>
                                        <input type="text" name='newBeerName' id='newBeerName' onChange={this.handleChangeTable}/>
                                        <input type="button" value="CHANGE" onClick={this.props.changeName(beer, this.state.newBeerName)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}