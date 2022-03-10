import React from 'react';
import './static/bartender.css';
import BeerForm from './BeerForm';
import BeerTable from './BeerTable';
import FlightTable from './FlightTable';
import jsonData from './static/localBeerStorage.json';

export default class Bartender extends React.Component {

    flight_object = {
        price: "",
        name: "",
        isPopulated: false,
        quantity: 0,
        rating: {
            average: "",
            reviews: "",
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            price: "",
            name: "",
            rating: {
                average: "",
                reviews: "",
            },
            inflight: [
               this.flight_object,
               this.flight_object,
               this.flight_object,
               this.flight_object,
               this.flight_object,
               this.flight_object,
            ],
            newBeerName: "",
            beers: [],
        }
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
        this.setState({beers: loadData});
    };

    handleDelete = (beer) => () => {
        let current_beers = [...this.state.beers];
        let new_list = current_beers.filter(function(item) {
            return item.name !== beer.name;
        });
        this.setState({beers: new_list});
    };

    handleNameChange = (current_beer, new_beer_name) => () => {
        const current_beer_list = [...this.state.beers];
        let oldBeerName = current_beer.name;
        let oldBeerPrice = current_beer.price;
        let newList = current_beer_list.filter(function(item) {
            if (item.name === oldBeerName && item.price === oldBeerPrice) {
                let tempItem = item;
                tempItem.name = new_beer_name;
                return tempItem;
            } else {
                return item;
            }
        });
        this.setState({beers: newList});
    }

    handleFlightOrder = (beer) => (event) => {
        let current_flight = [...this.state.inflight];
        if (event.target.checked === true) {
            let empty_spot = [];
            for (let i = 0; i < current_flight.length; i++) {
                if (this.state.inflight[i].isPopulated === false) {
                    empty_spot.push(i)
                }
            }        
            let temp_item = beer;
            temp_item['isPopulated'] = true;
            temp_item['quantity'] = 1;
            current_flight[empty_spot[0]] = temp_item;
        } else {
            for (let i = 0; i < current_flight.length; i++) {
                if (current_flight[i].name === beer.name && current_flight[i].price === beer.price) {
                    current_flight[i] = this.flight_object;
                }
            }
        }
        console.log(current_flight);
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
        return (
            <div className='AppDiv'>
                <h1>Hello, Bartender!</h1>
                <BeerTable 
                    beerList={current_beer_list} 
                    flightList={flight_list}
                    deleteHandler={this.handleDelete} 
                    handleChange={this.changeHandler}
                    flightHandler={this.handleFlightOrder}
                    changeName={this.handleNameChange}
                />
                <BeerForm 
                    beers={this.state.beers} 
                    handleChange={this.changeHandler} 
                    submitHandler={this.handleSubmit}
                />
                <FlightTable flightList={flight_list}/>
            </div>   
        );
    }
}