import React, { Component } from 'react';

//import React Bootstrap components
import { PageHeader } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

//import templates
import EntityCard from './playground-components/Entity-Card.js';
import EntityListItem from './playground-components/Entity-ListItem.js';

//import some important fields
import { tagsToTitles } from '/imports/api/EntityDictionaries.js';

//import stylesheets
import '../../style/entity-playground.css';


var tagsToCounts = {
	"Locations" : 0,
	"Factions" : 0,
	"Items" : 0,
	"Characters" : 0,
	"Events" : 0,
	"Rules" : 0
};

//Playground Component - Represents the bulk of the story editor page.
//The playground has a list of entities of the type passed to it by the story editor controller
//and an entity card representing the entity chosen by the user.

/*
	`Playground` COMPONENT - Represents the bulk of the story editor page, where the user can
	create, destroy, and define the entities for their stories.

	REQUIRED PROPS:
		- `tag` : the type of entity selected by the user
*/
export default class Playground extends Component{
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
			},
			tagsToCounts: {
				"Locations" : 0,
				"Factions" : 0,
				"Items" : 0,
				"Characters" : 0,
				"Events" : 0,
				"Rules" : 0
			}
		};

		this.openCreate = this.openCreate.bind(this);
		this.closeCreate = this.closeCreate.bind(this);
		this.openCard = this.openCard.bind(this);
		this.closeCard = this.closeCard.bind(this);
		this.onCreateEntity = this.onCreateEntity.bind(this);
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

	onCreateEntity(){
		//this.closeCreate();
		//tagsToCounts[this.props.tag] += 1;

		let newTTC = {...this.state.tagsToCounts};
		newTTC[this.props.tag] += 1;

		console.log("Creating...\nTag: " + this.props.tag + "\nCounts: " + newTTC[this.props.tag]);

		let newTTE = {...this.state.tagsToEntities};
		newTTE[this.props.tag].push(
			<EntityListItem 
				key = {newTTC[this.props.tag]}
				entityId = {newTTC[this.props.tag]}
				name = {this.props.tag + " " + newTTC[this.props.tag]}
				handler = {this.openCard}
			/>)

		this.setState(() => ({tagsToEntities: {...newTTE}, tagsToCounts: {...newTTC}}));
	}

	onDeleteEntity(entityId, tag){
		console.log("Deleting...\nentityID: " + entityId + "\ntag: " + tag);
		
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
					<Button onClick = {() => this.onCreateEntity()}>Create</Button>
				</div>

				{/*First four columns are for the list of entities of the selected type*/}
				<Row>
					<Col xs = {8} md = {4}>
						<ListGroup>
							{this.state.tagsToEntities[this.props.tag]}
						</ListGroup>
						{/*<EntityList entityList = {this.state.tagsToEntities[this.props.tag]}/>*/}
					</Col>
					{/*Next eight columns are for the card holding the selected entity's info.
					Will need to do a check deciding whether an entity is selected or not.*/}
					<Col xs = {12} md = {8}>
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