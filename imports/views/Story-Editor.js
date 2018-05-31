import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import renderRoutes from '../../client/routes.js'

//import React-Bootstrap components
import { Grid, Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { PageHeader } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

//import templates
import TopNav from './templates/Top-Nav.js';
import EntityListItem from './templates/Entity-ListItem.js';

//import stylesheets
import './style/entity-card.css';
import './style/entity-playground.css';

//StoryEditor component - represents the story editor page
export default class StoryEditor extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      settingOpen: false,
      modalOpen: false,
      warningOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openWarning = this.openWarning.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
  }

  openModal(){
  	this.setState({modalOpen: true});
  }

  closeModal(){
  	this.setState({modalOpen: false});
  }

  openWarning(){
  	this.setState({warningOpen: true});
  }

  closeWarning(){
  	this.setState({warningOpen: false});
  }



	render(){

		return (

			<div className = "container">
				
				<TopNav/>

				<Row>
					{/*First two columns are for the editor's sidebar*/}
					<Col md = {2}>
						<ListGroup>
							<ListGroupItem>
						      <div onClick={() => this.setState({ settingOpen: !this.state.settingOpen })}>
						        <a href = "#">
						          Setting
						        </a>
						      </div>
						        <Collapse in={this.state.settingOpen}>
						          <div>
						          	<ListGroup>
						          		<ListGroupItem href="#">
						          			Locations
						          		</ListGroupItem>
						          		<ListGroupItem href="#">
											Factions and Races
										</ListGroupItem>
										<ListGroupItem href="#">
											Items
										</ListGroupItem>
										<ListGroupItem href="#">
											Rules and Concepts
										</ListGroupItem>
						          	</ListGroup>
						          </div>
						        </Collapse>
							</ListGroupItem>
							<ListGroupItem href = "#">
								Characters
							</ListGroupItem>
							<ListGroupItem href = "#">
								Plot
							</ListGroupItem>
						</ListGroup>
					</Col>
					{/*Next ten columns are for the editor's "Playground" */}
					<Col md = {10}>

						<PageHeader>
							Entity Tag <small>Quirky subtitle</small>
						</PageHeader>

						<div id = "entity-playground-btn">
							<Button onClick = {this.openModal}>Create</Button>
						</div>

						{/*First four columns are for the list of entities of the selected type*/}
						<Row>
							<Col md = {4}>
								<ListGroup>
									<EntityListItem/>
									<EntityListItem/>
									<EntityListItem/>
								</ListGroup>
							</Col>
							{/*Next eight columns are for the card holding the selected entity's info.
							Will need to do a check deciding whether an entity is selected or not.*/}
							<Col md = {8}>
								
								<Panel>
									<Panel.Body>
										<div>
											<h1 id = "entity-card-name">Entity Name</h1>
										</div>
										<div>
											<Row>
												<Col md = {3}></Col>
												<Col md = {3}>
													<Button bsStyle = "info" className = "entity-card-button" onClick = {this.openModal}>Edit</Button>
												</Col>
												<Col md = {1}></Col>
												<Col md = {3}>
													<Button bsStyle = "danger" className = "entity-card-button" onClick = {this.openWarning}>Delete</Button>
												</Col>
												<Col md = {2}></Col>
											</Row>
											
										</div>
										<div>
											Stuff about the entity goes here
										</div>
										
									</Panel.Body>
								</Panel>
							</Col>
						</Row>
					</Col>
				</Row>

				{/*Component representing the edit/create modal. Will need to add logic deciding what to do
				depending on context. Possibly need to create two modals to handle each, or use some fancy
				React functionality.*/}
				<Modal id = "story-editor-edit-modal" show = {this.state.modalOpen} onHide = {this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Edit or Create Entity</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Some stuff about the entity
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle = "success" onClick = {this.closeModal}>Save</Button>
					</Modal.Footer>
				</Modal>

				{/*Component representing a deletion warning modal. Will add a checkbox asking to never see the message
				again.*/}
				<Modal id = "story-editor-delete-warning" show = {this.state.warningOpen} onHide = {this.closeWarning}>
					<Modal.Header>
						Are you sure you want to delete this entity?
					</Modal.Header>
					<Modal.Footer>
						<Row>
							<Col md = {8}></Col>
							<Col md = {2}>
								<Button bsStyle = "warning" onClick = {this.closeWarning}>Yes</Button>
							</Col>
							<Col md = {2}>
								<Button onClick = {this.closeWarning}>No</Button>
							</Col>
						</Row>
					</Modal.Footer>
				</Modal>
			</div>
		)

	}
}