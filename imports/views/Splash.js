import React, { Component } from 'react';
import renderRoutes from '../../client/routes.js';

//import React bootstrap components
import { Jumbotron } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

//import React Router components
import { Redirect } from 'react-router'

//Splash component - represents the splash page
export default class Splash extends Component {

	/*Take us straight to the story select scene.
	In the actual application, we'd need an actual login screen.*/
	handleLogin(){
		renderRoutes.browserHistory.push('/stories');
	}

	render(){

		return (
			<div className = "container">

				<Jumbotron>
					<h1>This is Autline</h1>
					
					<p>
						Here's some spicy stuff about Autline
					</p>

				</Jumbotron>

				{/*Will add a button that takes us straight to the story editor page
				for the case where the user is already logged in.*/}
				<Button bsStyle = "primary" onClick = {this.handleLogin}>Log In</Button>
			
			</div>
		);
	}

}