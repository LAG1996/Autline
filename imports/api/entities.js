/*
File containing class implementations of story Entities

An entity is any animate/inanimate object or concept in the story. This includes
characters, factions, locations, items, and the rules of the universe that the
story takes place in.
*/

//The base entity class. All entities have a name, a type, and a description
function Entity(name, type, events, desc){
	
	this.name = name;
	this.type = type;
	this.events = events;
	this.desc = desc;

}

//A base animate entity class.
/*
Inherits:
	Properties from Entity class

Properties:
	List<Event> events
	List<Location> locations
	List<Concept> goals
*/
//All animate entities have events that they are involved in, locations that they came from,
//and goals that they're pursuing. Characters and factions are considered animate entities.
function AnimateEntity(name, type, events, locations, items, goals, desc){

	Entity.call(name, type, events, desc);

	this.locations = locations;
	this.items = items;
	this.goals = goals;

}


/*
Inherits:
	Properties from AnimateEntity class
	Properties from Entity class

Properties:
	List<Faction> factions
*/
//All characters may be part of at least one faction
function Character(name, type, events, locations, items, goals, desc, factions){

	AnimateEntity.call(this, name, type, events, locations, items, goals, desc);

	this.factions = factions;

	Character.prototype.constructor = Character;

}

/*
Inherits:
	Properties from Character class
	Properties from AnimateEntity class
	Properties from Entity class

Properties:
	List<Character> characters
*/
//Since all characters may be part of some faction, all factions may contain
//multiple characters.
function Faction(name, type, events, locations, items, goals, desc, characters){

	AnimateEntity.call(this, name, type, events, locations, items, goals, desc);

	this.characters = characters;

	Faction.prototype.constructor = Faction;

}

//Base InanimateEntity class
/*
Inherits:
	Properties from Entity class

Properties:
	List<Event> events
	List<Faction> Factions
	List<Character> Characters
*/
//All inanimate entities have factions and characters related to them, whether
//in a "has a", "is from a", or "wants a".
function InanimateEntity(name, type, events, desc, factions, characters){

	Entity.call(this, name, type, events, desc);

	this.factions = factions;
	this.characters = characters;

	InanimateEntity.prototype.constructor = InanimateEntity;

}

/*
Inherits:
	Properties from InanimateEntity class
	Properties from Entity class

Properties:
	List<Items> items
*/
//Locations are inanimate entities that may contain items on top of characters and factions
function Location(name, type, events, desc, factions, characters, items){

	InanimateEntity.call(this, name, type, events, desc, factions, characters);

	this.items = items;

	Location.prototype.constructor = Location;

}

/*
Inherits:
	Properties from InanimateEntity class
	Properties from Entity class

Properties:
	Location location
*/
//Items are inanimate entities that may have some base location.
function Item(name, type, events, desc, factions, characters, location){

	InanimateEntity.call(this, name, type, events, desc, factions, characters);

	this.location = location;

	Item.prototype.constructor = Item;

}

/*
Inherits:
	Properties from InanimateEntity class
	Properties from Entity class

Properties:
	<None>
*/
//Concepts are miscellaneous inanimate entities. These include goals, beliefs and rules.
//TODO: There may be some room to specialize concepts into goals, beliefs, and rules.
function Concept(name, type, events, desc, factions, characters){

	InanimateEntity.call(this, name, type, events, desc, factions, characters)

	Concept.prototype.constructor = Concept;

}

/*
Inherits:
	Properties from Entity class

Properties:
	List<Character> characters
	List<Faction> factions
	List<Location> locations
*/
//Events are a special type of entity that involve characters, factions,
//and locations.
function Event(name, type, desc, characters, factions, locations){

	Entity.call(this, name, type, null, desc)

	this.characters = characters;
	this.factions = factions;
	this.locations = location;

}