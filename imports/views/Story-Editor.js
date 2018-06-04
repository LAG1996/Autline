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
//import EntityListItem from './templates/Entity-ListItem.js';
import SidebarEntities from './templates/Sidebar-Entities.js';
import Associations from './templates/Associations.js';

//import stylesheets
import './style/entity-card.css';
import './style/entity-playground.css';

const tagsToTitles = {
	"Locations" : "Locations",
	"Factions" : "Factions, Religions, and Races",
	"Items" : "Items",
	"Characters" : "Characters",
	"Events" : "Plot Events",
	"Rules" : "Rules and Concepts"
};

const tagsToSubtitles = {};

var tagsToCounts = {
	"Locations" : 0,
	"Factions" : 0,
	"Items" : 0,
	"Characters" : 0,
	"Events" : 0,
	"Rules" : 0
};


//StoryEditor component - represents the story editor page
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

class Playground extends Component{
	constructor(props, context){
		super(props, context);


		this.state = {
			cardOpen: false,
			createOpen: false,
			entityName: null,
			entityId: null,
			tagsToEntities: {
				"Locations" : [],
				"Items" : [],
				"Factions" : [],
				"Rules" : [],
				"Characters" : [],
				"Events" : []
			}
		};

		this.openCreate = this.openCreate.bind(this);
		this.closeCreate = this.closeCreate.bind(this);
		this.openCard = this.openCard.bind(this);
		this.closeCard = this.closeCard.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDeleteEntity = this.onDeleteEntity.bind(this);
	}

	openCreate(){
		this.setState(() => ({createOpen: true}));
	}

	closeCreate(){
		this.setState(() => ({createOpen: false}));
	}

	openCard(name, id){
		this.setState(() => ({cardOpen: true, entityName: name, entityId: id}));
	}

	closeCard(){
		this.setState(() => ({cardOpen: false}));
	}

	onCreate(){
		//this.closeCreate();
		tagsToCounts[this.props.tag] += 1;

		let newTTE = {...this.state.tagsToEntities};
		newTTE[this.props.tag].push(
			<EntityListItem 
				key = {tagsToCounts[this.props.tag]}
				entityId = {tagsToCounts[this.props.tag]}
				name = {this.props.tag + " " + tagsToCounts[this.props.tag]}
				handler = {this.openCard}
			/>)

		this.setState(() => ({tagsToEntities: {...newTTE}}));
	}

	onDeleteEntity(entityId, tag){
		let newTTE = {...this.state.tagsToEntities};
		newTTE[tag] = newTTE[tag].filter((entity) => (entity.props.entityId !== entityId));

		this.setState(() => ({tagsToEntities: {...newTTE}, cardOpen: false}));
	}

	render() {
		return (	
			<div>

				<PageHeader>
					{tagsToTitles[this.props.tag]} {/*}<small>Quirky subtitle</small>{*/}
				</PageHeader>

				<div id = "entity-playground-btn">
					<Button onClick = {() => this.onCreate()}>Create</Button>
				</div>

				{/*First four columns are for the list of entities of the selected type*/}
				<Row>
					<Col md = {4}>
						{/*Will need to add in the names of the entities as props.*/}
						<EntityList entityList = {this.state.tagsToEntities[this.props.tag]}/>
					</Col>
					{/*Next eight columns are for the card holding the selected entity's info.
					Will need to do a check deciding whether an entity is selected or not.*/}
					<Col md = {8}>
					{/*Show the entity card if an entity is showing. If not, show a default message.*/}
						
						{this.state.cardOpen ? 
							<EntityCard 
								entityId = {this.state.entityId} 
								name = {this.state.entityName} 
								tag = {this.props.tag}
								deleteHandler = {this.onDeleteEntity}
							/> : 
							<h3>Pick an entity to edit it!</h3> }
					
					</Col>
				</Row>

				{/*Component representing the create entity modal.*/}
				<Modal show = {this.state.createOpen} onHide = {this.closeCreate}>
					<Modal.Header closeButton>
						<Modal.Title>Create Entity</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Some stuff about the entity
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle = "success" onClick = {this.onCreate}>Create It</Button>
					</Modal.Footer>
				</Modal>

				{/*}
				<Route path="/editor:locations" component = {StoryEditor}/>
				<Route path="/editor:items" component = {StoryEditor}/>
				<Route path="/editor:factions" component = {StoryEditor}/>
				<Route path="/editor:rules" component = {StoryEditor}/>
				<Route path="/editor:characters" component = {StoryEditor}/>
				<Route path="/editor:events" component = {StoryEditor}/>{*/}

			</div>
		)
	}
}

class EntityList extends Component{
	constructor(props, context){
		super(props, context);
	}

	render(){
		return <ListGroup>{this.props.entityList}</ListGroup>
	}
}

class EntityListItem extends Component{
	constructor(props, context){
		super(props, context);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.props.handler(this.props.name, this.props.entityId);
	}

	render(){
		return(

			<ListGroupItem onClick = {() => this.handleClick()}>
				{this.props.name}
			</ListGroupItem>

		)
	}
}

class EntityCard extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
			currentTag: this.props.tag,
			warningOpen: false,
			editOpen: false
		}

		this.openWarning = this.openWarning.bind(this);
		this.closeWarning = this.closeWarning.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	openWarning(){
		this.setState(() => ({warningOpen: true}));
	}

	closeWarning(){
		this.setState(() => ({warningOpen: false}));
	}

	openEdit(){
		this.setState(() => ({editOpen: true}));
	}

	closeEdit(){
		this.setState(() => ({editOpen: false}));
	}

	onSave(){
		this.closeEdit();
	}

	onDelete(){

		console.log("Deleting...\nentityID: " + this.props.entityId + "\ntag: " + this.state.currentTag);

		this.props.deleteHandler(this.props.entityId, this.state.currentTag);

		this.closeWarning();
	}

	render(){
		return(
			<div>
				<Panel>
					<Panel.Body>
						<div>
							<Row>
								<Col md = {10}>
									<h1 id = "entity-card-name">{this.props.name}</h1>
								</Col>
								<Col md = {2}>
									<Button bsSize = "large" bsStyle = "danger" className = "entity-card-button" onClick = {this.openWarning}>
										<Glyphicon glyph = "trash"/>
									</Button>
								</Col>
							</Row>
						</div>
						<div>
							<Tabs defaultActiveKey={1} animation={false} id = "entity-card-tab">
								<Tab eventKey = {1} title="Description">This is my description!</Tab>
								<Tab eventKey = {2} title="Associations"><Associations tag = {this.props.tag}/></Tab>
							</Tabs>	
						</div>				
					</Panel.Body>
				</Panel>
				{/*Component representing the edit entity modal.*/}
				<Modal show = {this.state.editOpen} onHide = {this.closeEdit}>
					<Modal.Header closeButton>
						<Modal.Title>Edit {this.props.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Some stuff about the entity
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle = "success" onClick = {this.onSave}>Save</Button>
					</Modal.Footer>
				</Modal>
				{/*Component representing a deletion warning modal. Will add a checkbox asking to never see the message
				again.*/}
				<Modal id = "story-editor-delete-warning" show = {this.state.warningOpen} onHide = {this.openWarning}>
					<Modal.Header>
						Are you sure you want to delete {this.props.name}?
					</Modal.Header>
					<Modal.Footer>
						<Row>
							<Col md = {8}></Col>
							<Col md = {2}>
								<Button bsStyle = "warning" onClick = {this.onDelete}>Yes</Button>
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