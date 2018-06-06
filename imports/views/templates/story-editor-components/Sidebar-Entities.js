import React, { Component } from 'react';

//import React Bootstrap components
import { ListGroupItem } from 'react-bootstrap';

//SidebarEntity component - represents the entity types that the user can
//choose from on the sidebar of the editor
export default class SidebarEntity extends Component{
	constructor(props, context)
	{
		super(props, context);

		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.props.handler(this.props.tag);
	}


	render(){
		return (
			<ListGroupItem onClick = {() => this.onClick()}>
				{this.props.title}
			</ListGroupItem>
		)
	}
}