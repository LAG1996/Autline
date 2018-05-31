import React, { Component } from 'react';

//import React Bootstrap components
import { Panel } from 'react-bootstrap';

//StoryPanel component - represents panels that display previews to saved stories
export default class StoryPanel extends Component{

	render(){
		return(
			
			<Panel>
				<Panel.Heading> Story Title </Panel.Heading>
				<Panel.Body> Description of a story </Panel.Body>
			</Panel>
		)
	}

}