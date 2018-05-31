import React, { Component } from 'react';
import renderRoutes from '../../../client/routes.js'

import { Navbar } from 'react-bootstrap';

export default class TopNav extends Component{

	goToHome(){

		renderRoutes.browserHistory.push("/");

	}

	render(){
		return(
			
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#" onClick = {this.goToHome}>Autline</a>
					</Navbar.Brand>
				</Navbar.Header>
			</Navbar>

		)
	}

}