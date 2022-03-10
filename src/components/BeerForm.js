import React from 'react';
import './static/styles.css';

export default class BeerForm extends React.Component {

    render() {
        return (
            <div id='beerFormDiv' className='beerFormStyle'>
                <h2>New Beer Form</h2>
                <form onSubmit={this.props.submitHandler}>
                    <label className='beerFormLabel' htmlFor='beerName'>
                        <span>Beer Name<span className='requiredStar'>*</span></span>
                    </label>
                    <input 
                        className='beerFormInput' 
                        id='beerName' 
                        name='beerName' 
                        type="text" 
                        onChange={this.props.handleChange}
                    />

                    <label className='beerFormLabel' htmlFor='beerPrice'>
                        <span>Price<span className='requiredStar'>*</span></span>
                    </label>
                    <input className='beerFormInput' id='beerPrice' name='beerPrice' type="text" onChange={this.props.handleChange} />

                    <label className='beerFormLabel' htmlFor='beerRating'>
                    <span>Rating<span className='requiredStar'>*</span></span>
                    </label>
                    <select className='beerFormInput' id='beerRating' name='beerRating' onChange={this.props.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input className='beerFormButton' type='submit' value="ADD BEER" />
                </form>
            </div>
        )
    }
}