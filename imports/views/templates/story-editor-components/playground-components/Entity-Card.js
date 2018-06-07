import React, { Component } from 'react';

//import React Bootstrap templates
import { Panel } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Well } from 'react-bootstrap';

//import stylesheets
import '../../../style/entity-card.css';


//import templates
import Associations from './Associations.js';

//import editable React component
import ContentEditable from 'react-contenteditable';

//import SlateJS
import { Editor } from 'slate-react';
import { Value } from 'slate';

//import CSS
import '/imports/views/style/entity-card-textbox.css';


/*
	`EntityCard` COMPONENT - Represents the section of the story editor playground where the user can
	define and destroy entities.

	REQUIRED PROPS:
		- `tag` : the type of entity selected by the user
		- `entityID` : the id of the entity to be edited
		- `deleteHandler` : a function for handling the deletion of an entity
*/
export default class EntityCard extends Component{
	constructor(props, context){
		super(props, context);

		this.state = {
			currentTag: this.props.tag,
			warningOpen: false,
			editOpen: false,
			canShowDeleteWarning: false,
			descriptionHTML: "Edit me!"
		}

		this.openWarning = this.openWarning.bind(this);
		this.closeWarning = this.closeWarning.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	openWarning(){
		if(this.state.canShowDeleteWarning)
			this.setState(() => ({warningOpen: true}));
		else
			this.onDelete();
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

	onDelete(showDeleteWarning = false){

		this.setState(() => ({ canShowDeleteWarning: showDeleteWarning }));

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
								<Tab eventKey = {1} title="Description">
									<Panel>
										<Panel.Body>
											<DescriptionTextBox HTML = {this.state.descriptionHTML}/>
										</Panel.Body>
									</Panel>
								</Tab>
								<Tab eventKey = {2} title="Associations"><Associations tag = {this.props.tag}/></Tab>
							</Tabs>	
						</div>				
					</Panel.Body>
				</Panel>

				{/*Component representing a deletion warning modal. Will add a checkbox asking to never see the message
				again.*/}
				<Modal id = "story-editor-delete-warning" show = {this.state.warningOpen} onHide = {this.openWarning}>
					<Modal.Header>
						Are you sure you want to delete {this.props.name}?
					</Modal.Header>
					<Modal.Footer>
						<Row>
							<Col md = {6}></Col>
							<Col md = {2}>
								<Button bsStyle = "warning" onClick = {() => this.onDelete(true)}>Yes</Button>
							</Col>
							<Col md = {2}>
								<Button bsStyle = "warning" onClick = {() => this.onDelete(false)}>Yes - Never Show This Again</Button>
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

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

//DescriptionTextBox Component - represents the textbox in the description tag
//of an entity card. The textbox responds to a simple markup language that works as
//follows:
/*
	*Any text between '{' and '}' is a link to another entity.
	*That link 'zone' should be formatted as follows:
		* '{' and '}' are bolded
		* The text in between them should be made a different color from the
			rest of the text.
*/
//There is a save button under the text box that shows up whenever the user starts editing. Upon saving,
//the text should be replaced with some clean HTML code with links that the user can use to navigate
//their outline.
function EntityBlock(props){
	return (
			<span {...props.attributes}><strong>{"{"}</strong>{props.children}<strong>{"}"}</strong></span>
	)
}


class DescriptionTextBox extends Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			value: initialValue
		}

		this.handleChange = this.handleChange.bind(this);
		//this.handleKey = this.handleKey.bind(this);
	}

	handleChange({ value }){
		this.setState({value})
	}

	handleKey(event, change){
		if(event.ctrlKey){
			event.preventDefault();

			change.toggleMark(inEntityBlock ? 'paragraph': 'entity');
			return true;
		}
	}

	render(){
		return (
				<Editor 
					value = {this.state.value} 
					onChange = {this.handleChange} 
					onKeyDown = {this.handleKey}
					//renderNode = {this.renderNode}
				/>
			)
	}

/*
	renderNode(props){
		switch(props.node.type){
			case 'entity': return <EntityBlock {...props}/>
		}
	}
*/
}