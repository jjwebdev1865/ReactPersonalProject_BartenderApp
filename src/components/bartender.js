import React from 'react';
import './static/bartender.css';
import BeerForm from './BeerForm';
import jsonData from './static/localBeerStorage.json';

export default class Bartender extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            price: "",
            name: "",
            rating: {
                average: "",
                reviews: "",
            },
            inflight: [],
            newBeerName: "",
            beers: [],
        }
        this.changeHandler = this.changeHandler.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        // fetch('https://api.sampleapis.com/beers/ale')
        // .then((res) => res.json())
        // .then((json) => {
        //     this.setState({
        //         beers: json,
        //         dataIsLoaded: true
        //     });
        // })
        const loadData = [...jsonData];
        console.log(loadData);
        this.setState({beers: loadData});
    };

    handleDelete = (beer) => () => {
        let current_beers = [...this.state.beers];
        let new_list = current_beers.filter(function(item) {
            return item.name !== beer.name;
        });
        this.setState({beers: new_list});
    };

    handleNameChange = (newBeer, beer) => () => {
        const current_beer_list = [...this.state.beers];
        let oldBeerName = beer.name;
        let newLIst = current_beer_list.filter(function(item) {
            if (item.name === oldBeerName) {
                let tempItem = item;
                tempItem.name = newBeer
                return tempItem;
            } else {
                return item;
            }
        });
        this.setState({beers: newLIst});
    };

    handleFlightOrder = (beer) => (event) => {
        this.changeHandler(event);
        let current_flight = [...this.state.inflight];

        if (this.state.inflight.length < 6) {
            if (event.target.checked === true) {
                current_flight.push(beer);
            } else {
                let resp = current_flight.find(item => item.name === beer.name);
                current_flight.pop(resp);
            }
        } 
        this.setState({inflight: current_flight});
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        let current_list = [...this.state.beers];
        const beerNameVal = event.target.beerName.value;
        const beerPriceVal = event.target.beerPrice.value;
        let ratingVal = { average: Number(event.target.beerRating.value), reviews: 1 }
        if (beerNameVal && beerPriceVal && ratingVal) {
            let testResp = {};
            testResp = current_list.find(item => item.name === beerNameVal);
            if (testResp !== undefined) {
                console.log("FOUND");
                let tempNum = testResp.rating.reviews;
                let newReviewsNum = Number(ratingVal.reviews) + Number(tempNum);
                ratingVal.reviews = newReviewsNum;
                let newList = current_list.filter(function(item) {
                    if (item.name === beerNameVal) {
                        item.rating.reviews = newReviewsNum;
                        return item;
                    } else {
                        return item;
                    }
                });
                this.setState({beers: newList});
            } else {
                const new_beer = {
                    price: "$"+beerPriceVal,
                    name: beerNameVal,
                    rating: ratingVal,
                }
                current_list.push(new_beer);
                this.setState({beers: current_list});
            }
        }
        
    };

    render() {
        const current_beer_list = this.state.beers;
        const flight_list = this.state.inflight;
        console.log("test")
        return (
            <div className='AppDiv'>
                <h1>Hello, Bartender!</h1>
                <BeerForm beers={this.state.beers} submitHandler={this.handleSubmit}/>
                <div>
                    <h2>Flight</h2>
                    <ol>
                        {flight_list.map((flight_item, index) => {
                            return (
                                <li id={index}>{flight_item.name}</li>
                            );
                        })}
                    </ol>
                </div>
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
                        {current_beer_list.map((beer, index) => {
                            return (
                                <tr key={index}>
                                    <td><input type="checkbox" name='flightCheckBox' id='flightCheckBox' onChange={this.handleFlightOrder(beer)}/></td>
                                    <td>{beer.name}</td>
                                    <td>{beer.price}</td>
                                    <td>{beer.rating.average}</td>
                                    <td>{beer.rating.reviews}</td>
                                    <td>
                                        <input type="button" value="DELETE" onClick={this.handleDelete(beer)}/>
                                    </td>
                                    <td>
                                        <input type="text" name='newBeerName' id='newBeerName' onChange={this.changeHandler}/>
                                        <input type="button" value="CHANGE NAME" onClick={this.handleNameChange(this.state.newBeerName, beer)} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>   
        );
    }
}