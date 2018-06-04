interface IEntityAccess {

	getName(): string;
	setName(name: string): void;

	getTag(): string;

	getDesc(): string;
	setDesc(desc: string): void;
}

//Abstract class for all entities
abstract class Entity implements IEntityAccess {
	protected _myTag: string; //The tag of this entity
	protected _myName: string; //The name of this entity
	protected _myDesc: string; //The description of this entity

	constructor(name){
		this._myName = name;
		this._myDesc = "";
	}

	//Getters
	protected getName() : string{
		return this._myName;
	}

	protected getTag() : string{
		return this._myTag;
	}

	protected getDesc(): string{
		return this._myDesc;
	}

	//Setters
	protected setName(name: string): string{
		this._myName = name;
	}

	protected setDesc(desc: string): string{
		this._myDesc = desc;
	}
}

//Class representing locations in a story
export class Locations extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Locations";
	}
}

//Class representing items in a story
export class Items extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Items";
	}
}

//Class representing factions and races in a story
export class Factions extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Factions";
	}
}

//Class representing rules and concepts in a story
export class Rules extends Entity{
	constructor(name){
		super(name);

		this._myTag = "Rules";
	}
}

//Class representing characters in a story
export class Characters extends Entity{
	constructor(name){
		super(name);
		this._myTag = "Characters";
	}
}

//Class representing events in a story
export class Events extends Entity{
	constructor(name){
		super(name);
		this._myTag = "Events";
	}
}