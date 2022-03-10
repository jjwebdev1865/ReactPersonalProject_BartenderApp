import React from 'react';
import './static/beerform.css';

export default class BeerForm extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.submitHandler}>
                <h2>New Beer Form</h2>
                <label htmlFor='beerName'>Beer Name:</label>
                <input id='beerName' name='beerName' type="text" onChange={this.props.handleChange}/>

                <label htmlFor='beerPrice'>Price</label>
                <input id='beerPrice' name='beerPrice' type="text" onChange={this.props.handleChange} />

                <label htmlFor='beerRating'>Rating</label>
                <select id='beerRating' name='beerRating' onChange={this.props.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type='submit' value="ADD BEER" />
            </form>
        )
    }
}