import React, { Component } from 'react';

//import React Bootstrap components
import { Panel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

//StoryPanel component - represents panels that display previews to saved stories
export default class StoryPanel extends Component{
	constructor(props, context){
		super(props, context);
	}

	render(){
		return(
			
			<Col md = {4} onClick = {() => this.props.handler()}>
				<Panel>
					<Panel.Heading> Story Title </Panel.Heading>
					<Panel.Body> Description of a story </Panel.Body>
				</Panel>
			</Col>
		)
	}

}