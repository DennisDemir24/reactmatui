import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from '../image-result/ImageResults';

 class Search extends Component {

    state = {
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api',
        apiKey: '11785979-d6cbed89471393c3254c07a0e',
        images: []
    }

    // Fires when input field get triggered with an search term
    onTextChange = (e) => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
            if(val === '') {
                this.setState({images: []});
            } else {
                 // Fetching the api url and key
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res => this.setState({images: res.data.hits}))
                .catch(err => console.log(err));
            }
           
        });
    }

    // triggers when amount is changed in dropdown
    onAmountChange = (e, index, value) => {
        this.setState({ amount: value });
    }

    render() {
    return (
      <div>
        <TextField
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatingLabelText="Search For Images"
            fullWidth={true}
        />
        <br />
        <SelectField
            name="amount"
            floatingLabelText="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          >
            <MenuItem value={5} primaryText="5"></MenuItem>
            <MenuItem value={10} primaryText="10"></MenuItem>
            <MenuItem value={15} primaryText="15"></MenuItem>
            <MenuItem value={30} primaryText="30"></MenuItem>
            <MenuItem value={50} primaryText="50"></MenuItem>
        </SelectField>
        <br />
        {/*If images is greater then 0 load the ImageResult component with the images */}
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
      </div>
    )
  }
}

export default Search;