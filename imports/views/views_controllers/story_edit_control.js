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
var editorState = {entity_type: null, card_visible: false, tab_type_selected: null}

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

/*/////////////////////////////
* BEGIN
*	ENTITY EDITOR CONFIG
* SECTION
*/////////////////////////////
//First, set some global helper functions

//Helper function for getting the tabs for an entity card
var tabs_dict = new ReactiveDict()
tabs_dict.set('tabs', null)
Template.registerHelper("tabs", function(){

	console.log(tabs_dict.get('tabs'))
	return tabs_dict.get('tabs')

})

Template.story_edit.onCreated(function(){
	this.dict = new ReactiveDict()
	this.dict.set('title', '')
})

Template.story_edit.helpers({
	title: function(){
		console.log("y")
		return Template.instance().dict.get('title')
	}
})

Template.story_edit.events({
	//Set events for clicking links on the sidebar
	"click .entity_type_switch"(event){

		EditEditorState(event.target.id, false, null)

		Template.instance().dict.set('title', entityType2TopMessage[editorState.entity_type].title)
		tabs_dict.set('tabs', entityType2Tabs[editorState.entity_type])
	}
})


function EditEditorState(entity_type, card_visible, tab_type_selected){
	editorState.entity_type = entity_type
	editorState.card_visible = card_visible
	editorState.tab_type_selected = tab_type_selected
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

/*/////////////////////////////
* END
*	ENTITY CARD CONFIG
* SECTION
*/////////////////////////////