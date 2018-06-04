import React, { Component } from 'react';
import renderRoutes from '../../client/routes.js'

//import React-Bootstrap components
import { Grid, Row, Col } from 'react-bootstrap';


//import React-Router components
import Redirect from 'react-router';

//import templates
import TopNav from './templates/Top-Nav.js';
import StoryPanel from './templates/Story-Panel.js';

//Story select component - Represents the story select page
export default class StorySelect extends Component{


	//Just go to the story edit page from any panel for now.
	//In the actual application, we'd need to push some props
	//to determine what's being displayed.
	goToStory(){
		renderRoutes.browserHistory.push("/editor");
	}


	render(){

		return (

			<div className = "container">


				<TopNav/>
				
				{/* Will need to add in the story names and descriptions as props */}
				<Grid>
					<Row>
						<StoryPanel handler = {this.goToStory}/>
						<StoryPanel/>
						<StoryPanel/>
					</Row>
				</Grid>
			</div>

		)

	}

}