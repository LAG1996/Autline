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
											<DescriptionTextBox text = {this.state.descriptionHTML}/>
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

class DescriptionTextBox extends Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			textChanged: false,
			intervalIndex: 0,
			lastKey: null,
			innerHTML: this.props.text
		}

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.parseString = this.parseString.bind(this);
	}

	componentDidMount(){
		console.log("Start watching the text box");

		let parseString = this.parseString.bind(this);

		let getIfTextChanged = () => {return this.state.textChanged;}
		getIfTextChanged = getIfTextChanged.bind(this);
		
		let setTextChangedFalse = () => {return this.setState(() => ({textChanged: false}))}
		setTextChangedFalse = setTextChangedFalse.bind(this);

		let index = setInterval(() => {

			if(getIfTextChanged()){
				//Decide if string parsing is even necessary
				parseString();

				setTextChangedFalse();
			}
		}, 10)

		console.log("Begin interval number " + index);

		this.setState({intervalIndex: index});
	}

	componentWillUnmount(){
		console.log("Canceling interval number " + this.state.intervalIndex);
		console.log("Stop watching the text box");
		clearInterval(this.state.intervalIndex);
	}

	parseString(){
		console.log("Doing some string parsing");

		console.log("Last key typed: " + this.state.lastKey)

		//
	}

	handleKeyDown(evt){
		//parseString(evt);
/*
		let _goLinkMode = this.state.linkMode;
		let _doToggleBold = this.state.doToggleBold;
		let _doToggleUnderline = this.state.doToggleUnderline;

		let key = evt.key;

		console.log("Key: " + evt.key);

		if(_goLinkMode)
		{

			document.execCommand('styleWithCSS', false, true);
			document.execCommand('forecolor', false, "#39b7cd");

			if(_doToggleUnderline){
				document.execCommand('underline', false);
			}

			_doToggleUnderline = false;
		}

		if(_doToggleBold)
		{
			console.log("Toggling off bold");
			document.execCommand('styleWithCSS', false, true);
			document.execCommand('bold', false, false);

			_doToggleBold = false;
		}

		if(key === "{" || key === "}")
		{
			document.execCommand('styleWithCSS', false, true);
			document.execCommand('bold', false, true);
			_doToggleBold = true;

			if(key === "{")
			{
				_goLinkMode = true;
				_doToggleUnderline = true;
			}
			else if(key === "}" && _goLinkMode)
			{
				_goLinkMode = false;
				document.execCommand('styleWithCSS', false, true);
				document.execCommand('forecolor', false, "#000000");
				document.execCommand('underline', false);
			}
		}

		//console.log("Target: ");
		//console.log(evt.target);
		console.log("Text: " + evt.target.textContent);
		console.log("InnerHTML: \n" + evt.target.innerHTML);

		this.setState(() => ({linkMode: _goLinkMode, doToggleBold: _doToggleBold, doToggleUnderline: _doToggleUnderline}));

		handleTextDelete = () => {

		}

		handleTextWrite = () => {

		}
		*/

		//Capture the text.
		let key = evt.key;
		this.setState(() => ({textChanged: true, lastKey: key}));
	}


	//This will parse the text (should be read from a database) and return HTML to show
	generateHTML = () => {
		return this.state.text;
	}

	render(){
		return (
			<ContentEditable
				html = {this.state.innerHTML}
				disabled = {false}
				onKeyDown = {this.handleKeyDown}
			/>)
	}
}