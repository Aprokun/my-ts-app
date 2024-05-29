export interface ICharacterParameters {
	strength: number,
	agility: number,
	intelligence: number,
	charisma: number
}

export interface ICharacterAdditionalParameters {
	health: number,
	dodge: number,
	energy: number
}

export interface ICharacterSkills { 
	[key: string]: number
}

export interface ICharacter {
	name: string,
	parameters: ICharacterParameters,
	additionalParameters: ICharacterAdditionalParameters,
	skills: ICharacterSkills,
	currentHealth: number
}