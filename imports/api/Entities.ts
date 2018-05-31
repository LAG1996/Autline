//Abstract class for all entities
abstract class Entity {
	protected _myTag: string; //The tag of this entity
	protected _myName: string; //The name of this entity
	protected _myDesc: string; //The description of this entity

	constructor(name){
		this._myName = name;
		this._myDesc = "";
	}
}

//Class representing locations in a story
export class SettingLocation extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Location";
	}
}

//Class representing items in a story
export class SettingItem extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Item";
	}
}

//Class representing factions and races in a story
export class SettingFactions extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Factions";
	}
}

//Class representing rules and concepts in a story
export class SettingRules extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Rules";
	}
}