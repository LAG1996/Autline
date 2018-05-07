import "../story_edit.html"

/*////////////////////////////////////////
* BEGIN
* 		STATE TRACKING AND CONFIG SETUP
* SECTION
*/////////////////////////////////////////
//Make a cache for the state the story editor is in. The state includes:
//-the type of entity the user is currently looking at
//-the whether the entity card is visible or not (i.e., the user picked an entity to edit)
//-what tab on the entity card is selected (could be none in the case where the user only picked an entity, but has not picked a tab)
var EditorState = new ReactiveDict()
EditorState.set("entity_type", null)
EditorState.set("is_card_visible", false)
EditorState.set("is_tab_type_selected", false)

//Make a mapping from the types of entities to functions that do the following:
//-Change the message at the top of the screen
//-Grabs a new list of entities of that type
//-Configure the tabs in the entity card
var entityTypeConfigs = {

	locations: function(){ChangeTopMessage("locations"); GetEntitiesOfType("locations");},
	factions: function(){ChangeTopMessage("factions"); GetEntitiesOfType("factions");},
	items: function(){ChangeTopMessage("items"); GetEntitiesOfType("items");},
	rules: function(){ChangeTopMessage("rules"); GetEntitiesOfType("rules");},
	characters: function(){ChangeTopMessage("characters"); GetEntitiesOfType("characters");},
	events: function(){ChangeTopMessage("events"); GetEntitiesOfType("events");}

}

//Factions and races are paired together in the editor, so we will make them map to the same functions
entityTypeConfigs.races = entityTypeConfigs.factions
//Rules and concepts are paired together in the editor, so we will make them map to the same functions
entityTypeConfigs.concepts = entityTypeConfigs.rules

//Make a mapping from the types of entities to the message that appears at the top of the story editor
var entityType2TopMessage = {

	locations: {title: "Locations"},
	factions: {title: "Factions and Races"},
	items: {title: "Items"},
	rules: {title: "Rules and Concepts"},
	characters: {title: "Characters"},
	events: {title: "Plot Events"}

}
entityType2TopMessage.races = entityType2TopMessage.factions
entityType2TopMessage.concepts = entityType2TopMessage.rules

//Make a mapping from the types of entities to the labels on the tabs in the entity card
var entityType2Tabs = {

	'locations': [
	{
		type: 'locations',
		label: 'Place I am a Part of'
	},
	{
		type: 'locations',
		label: "Places that are a part of me"
	},
	{
		type: 'characters',
		label: 'People who came from me'
	},
	{
		type: 'factions',
		label: 'Races or Factions that came from me'
	},
	{
		type: 'events',
		label: "Events I was involved in"
	},
	{
		type: 'desc',
		label: 'A little more about me'
	}],
	'items': [
	{
		type: 'locations',
		label: 'Place I came from'
	},
	{
		type: 'characters',
		relation: 'smaller',
		label: "People who want me"
	},
	{
		type: 'events',
		label: "Events I was involved in"
	},
	{
		type: 'desc',
		label: 'A little more about me'
	}],
	'factions': [
	{
		type: 'locations',
		label: 'Place I can be found'
	},
	{
		type: 'characters',
		label: "People affiliated with me"
	},
	{
		type: 'events',
		label: "Events I was involved in"
	},
	{
		type: 'desc',
		label: 'A little more about me'
	}],
	'concepts': [
	{
		type: 'desc',
		label: 'A description'
	}],
	'characters':[
	{
		type: 'locations',
		label: 'The place I came from'
	},
	{
		type: 'factions',
		relation: 'smaller',
		label: "Affiliations"
	},
	{
		type: 'events',
		label: 'Events that I was involved in'

	},
	{
		type: 'desc',
		label: "A little more about me"
	}
	],
	'events':[
	{
		type: "locations",
		label: "Where did I happen?"
	},
	{
		type: "characters",
		label: "Who was involved in me?"
	},
	{
		type: "factions",
		label: "Any specific factions or races involved?"
	},
	{
		type: "desc",
		label: "A little more about me"
	}
	]
}

//Automatically attach ids to each tab
for(let key in entityType2Tabs)
{
	let id = 0
	for(let t in entityType2Tabs[key])
	{
		entityType2Tabs[key][t].id = id++
	}
}

/*/////////////////////////////
* BEGIN
*	ENTITY EDITOR CONFIG
* SECTION
*/////////////////////////////
//First, set some global helper functions

//Helper function for getting the tabs for an entity card
var global_helper_variables = new ReactiveDict()
global_helper_variables.set('tabs', null) //Reactive variable that stores general tab data. Edited when the user switches an entity
global_helper_variables.set('modal tab data', null) //Reactive variable that stores data for the tab selected on the modal. Edited 
global_helper_variables.set('card tab data', null) //Reactive variable that stores data for the tab selected on the entity card

var global_flags = new ReactiveDict()
global_flags.set("isEntityTypeSelected", false)

//Create a dictionary for the story editor
Template.story_edit_root.onCreated(function(){
	this.dict = new ReactiveDict()

	//Set a key for the title that will appear at the top
	this.dict.set('title', '')
})

Template.entity_toolbar.helpers({
	tabs: function(){ return global_helper_variables.get('tabs') } //Return a reactive variable that contains tab data
})

Template.entity_toolbar.events({

	"click .entity_tab_link"(event){
		global_helper_variables.set("card tab data", global_helper_variables.get("tabs")[event.target.id] )}

})

Template.story_edit_root.helpers({
	title: function(){
		//Return a reactive variable that contains the title
		return Template.instance().dict.get('title')
	},

	type_selected: function(){

		return global_flags.get("isEntityTypeSelected")
	}
})

Template.story_edit_root.events({
	//Set events for clicking links on the sidebar
	"click .entity_type_switch"(event){

		//Set the editor state
		EditEditorState(event.target.id, false, null)

		Template.instance().dict.set('title', entityType2TopMessage[event.target.id].title)


		//Set the general tab data
		global_helper_variables.set('tabs', entityType2Tabs[event.target.id])

		//Set
		global_flags.set('isEntityTypeSelected', true)
	}
})


function EditEditorState(entity_type, card_visible, tab_type_selected){
	EditorState.set("entity_type", entity_type);
	EditorState.set("is_card_visible", card_visible);
	EditorState.set("is_tab_type_selected", tab_type_selected)
}
/*/////////////////////////////
* END
*	ENTITY EDITOR CONFIG
* SECTION
*/////////////////////////////

/*/////////////////////////////
* BEGIN
*	ENTITY CARD CONFIG
* SECTION
*/////////////////////////////

Template.entity_card.helpers({

	"selected_tab_label": function(){ 
		if(global_helper_variables.get("card tab data")){return global_helper_variables.get("card tab data").label} }

})

/*/////////////////////////////
* END
*	ENTITY CARD CONFIG
* SECTION
*/////////////////////////////

/*///////////////////////////
* BEGIN
*	ENTITY MODAL CONFIG
* SECTION
*///////////////////////////
var modal_on = false

Template.m_entity_toolbar.helpers({

	tabs: function(){ return global_helper_variables.get('tabs'); }

})

Template.m_entity_toolbar.events({
	"click .m_entity_tab_link"(events){ 
		global_helper_variables.set("modal tab data", global_helper_variables.get("tabs")[event.target.id]); }
})



Template.create_entity_modal.helpers({

	"selected_tab_label": function(){ 
		if( global_helper_variables.get("modal tab data") ){ 
			return global_helper_variables.get("modal tab data").label; 
		}
	},

	"event": function(){
		EditorState.get("entity_type") == "events";
	}
})

Template.create_entity_modal.events({

	"click #create-btn": function(){

		console.log("Create entity of type " + EditorState.get("entity_type"))

	}

})

Template.edit_entity_modal.helpers({

	"selected_tab_label": function(){ 
		if( global_helper_variables.get("modal tab data") ){ 
			return global_helper_variables.get("modal tab data").label; 
		}
	},
	
	"event": function(){
		console.log(EditorState.get("entity_type"))
		console.log(EditorState.get("entity_type") == "events")
		EditorState.get("entity_type") == "events";
	}
})

Template.edit_entity_modal.events({

	"click #edit-btn": function(){

		console.log("Edit entity of type " + EditorState.get("entity_type"))

	}

})

function getSelectedTabLabel(){

	if( global_helper_variables.get("modal tab data") ){ 
		return global_helper_variables.get("modal tab data").label; 
	}

	return "";
}

function isEvent(){

	return EditorState.get("entity_type") == "events";
}

/*///////////////////////////
* END
*	ENTITY MODAL CONFIG
* SECTION
*///////////////////////////