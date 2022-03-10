import React from 'react';

export default class BeerTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newBeerName: ""
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
            <table>
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
                        return (
                            <tr key={index}>
                                <td><input type="checkbox" name='flightCheckBox' id='flightCheckBox' onChange={this.props.flightHandler(beer)}/></td>
                                <td>{beer.name}</td>
                                <td>{beer.price}</td>
                                <td>{beer.rating.average}</td>
                                <td>{beer.rating.reviews}</td>
                                <td>
                                    <input type="button" value="DELETE" onClick={this.props.deleteHandler(beer)}/>
                                </td>
                                <td>
                                    <input type="text" name='newBeerName' id='newBeerName' onChange={this.handleChangeTable}/>
                                    <input type="button" value="CHANGE NAME" onClick={this.props.changeName(beer, this.state.newBeerName)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}