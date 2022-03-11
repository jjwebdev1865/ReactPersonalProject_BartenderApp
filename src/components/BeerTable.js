import React from 'react';
import './static/styles.css';

export default class BeerTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newBeerName: "",
            pageNumber: 1,
            pageStart: 1,
            pageEnd: 15,
            endBool: false,
        }
    }

    handleChangeTable = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    };

    handleBeerCounter = (action) => () => {
        let newPageStart = 0;
        let newPageEnd = 0;
        let newPageNum = 0;
        if (action === "next") {
            newPageStart = this.state.pageStart + 15;
            newPageEnd = this.state.pageEnd + 15;
            newPageNum = this.state.pageNumber + 1;
        } else if (action === "back"){
            newPageStart = this.state.pageStart - 15;
            newPageEnd = this.state.pageEnd - 15;
            newPageNum = this.state.pageNumber - 1;
        }
        this.setState({pageStart: newPageStart});
        this.setState({pageEnd: newPageEnd});
        this.setState({pageNumber: newPageNum});
    }

    render() {
        let currentPageStart = this.state.pageStart;
        let currentPageEnd = this.state.pageEnd;
        let currentPage = this.state.pageNumber;
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
                            if ((index >= (currentPageStart - 1) && (index <= (currentPageEnd - 1)))) {
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
                                            <input 
                                                type="text" 
                                                name='newBeerName' 
                                                id='newBeerName' 
                                                onChange={this.handleChangeTable}/>
                                            <input type="button" value="CHANGE" onClick={this.props.changeName(beer, this.state.newBeerName)} />
                                        </td>
                                    </tr>
                                )
                            }
                        })}
                        <tr>
                            <td colSpan="6">Page Number: {currentPage} | Showing {currentPageStart} to {currentPageEnd} of {this.props.beerList.length}</td>
                            <td className='paginationStatus'>
                                <input type="button" value="BACK" 
                                    disabled={currentPage === 1 ? true : false} 
                                    onClick={this.handleBeerCounter("back")}
                                />
                                <input type="button" value="NEXT"
                                    onClick={this.handleBeerCounter("next")}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}