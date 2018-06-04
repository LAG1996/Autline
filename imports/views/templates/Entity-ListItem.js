import React, { Component } from 'react';

import { ListGroupItem } from 'react-bootstrap';

export default class EntityListItem extends Component{
	constructor(props, context){
		super(props, context);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.props.handler(this.props.name);
	}

	render(){
		return(

			<ListGroupItem onClick = {() => this.handleClick()}>
				{this.props.name}
			</ListGroupItem>

		)
	}
}