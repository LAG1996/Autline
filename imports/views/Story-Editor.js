import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from '../../client/routes.js'

//import React-Bootstrap components
import { Grid, Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

//import templates
import TopNav from './templates/Top-Nav.js';
import SidebarEntities from './templates/story-editor-components/Sidebar-Entities.js';
import Playground from './templates/story-editor-components/Playground.js';



//StoryEditor component - represents the story editor page, which is the main meat of this application.
//The story editor page has a sidebar with options that represent each type of entity,
//and a "playground", in which the user can create, destroy, and define entities for their story.
export default class StoryEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settingOpen: false,
      createOpen: false,
      playgroundOpen: false,
      selectedType: null
    };

    this.onClickSidebarEntity = this.onClickSidebarEntity.bind(this);
  }

  onClickSidebarEntity(tag){
  	console.log("Lookup " + tag);
  	this.setState(() => ({playgroundOpen : true, selectedType: tag}));
  }

	render(){

		return (

			<div className = "container">
				
				<TopNav/>

				<Row>
					{/*First two columns are for the editor's sidebar*/}
					<Col md = {2}>
						<ListGroup>
						 	<SidebarEntities title = "Locations" tag = "Locations" handler = {this.onClickSidebarEntity}/>
						 	<SidebarEntities title = "Items" tag = "Items" handler = {this.onClickSidebarEntity}/>
						 	<SidebarEntities title = "Factions, Religions, and Races" tag = "Factions" handler = {this.onClickSidebarEntity}/>
						 	<SidebarEntities title = "Rules and Concepts" tag = "Rules" handler = {this.onClickSidebarEntity}/>
						 	<SidebarEntities title = "Characters" tag = "Characters" handler = {this.onClickSidebarEntity}/>
						 	<SidebarEntities title = "Plot Events" tag = "Events" handler = {this.onClickSidebarEntity}/>
						</ListGroup>
					</Col>
					{/*Next ten columns are for the editor's "Playground" or a default message.
					If no entity type was selected on the sidebar, default to a message asking
					for the user to pick an entity type */}
					<Col md={10}>
						{this.state.playgroundOpen ? <Playground tag = {this.state.selectedType}/> 
							: <h1>Pick something from the sidebar!</h1>}
					</Col>
				</Row>
			</div>
		)

	}
}