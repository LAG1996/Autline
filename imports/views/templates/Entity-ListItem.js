import React, { Component } from 'react';

import { ListGroupItem } from 'react-bootstrap';

export default class EntityListItem extends Component{

	render(){
		return(

			<ListGroupItem href = "#">
				Some entity...
			</ListGroupItem>

		)
	}

}