import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import ImgList from './components/ImgList';
import ImageSearchForm from './components/SearchForm';


export default class ImageSearchApp extends Component {
	constructor() {
		super();
		this.state = {
			imgs: [],
			loadingState: true,
			app_id: '<YOUR-UNSPLASH-API-KEY-HERE>',
			base_url: 'https://api.unsplash.com/search/photos',
			activePage: 1
		};
	}

	componentDidMount() {
		this.searchImages();
	}

	handlePageChange() {
		console.log(this);
	}

	searchImages = (query = 'Australia', numImages = 12, pageNum = 1) => {
		axios.get(`${this.state.base_url}/?page=${pageNum}&per_page=${numImages}&query=${query}&
				client_id=${this.state.app_id}`)
			.then(data => {
				console.log("This is unsplash data", data);
				this.setState({ imgs: data.data.results, loadingState: false });
			})
			.catch(err => {
				console.log('Error occured during fetching unsplash data!!', err);
			});
	};

	render() {
		return (
			<div>
				<div className="main-header">
					<div className="inner">
						<h1 className="main-title">Image Search Demo</h1>
						<ImageSearchForm onSearch={this.searchImages} />
					</div>
				</div>
				<div className="main-content">
					{this.state.loadingState
						? <p>Loading</p>
						: <ImgList data={this.state.imgs} />}
				</div>
			</div>
			
		);
	}
}
