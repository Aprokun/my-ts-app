import { FC, useState } from 'react'
import { CharacterForm } from '../CharacterForm/CharacterForm'
import { CharacterSkillList } from '../CharacterSkillList/CharacterSkillList'
import { CharacterStats } from '../CharacterStats/CharacterStats'
import { ICharacter, ICharacterSkills } from './charactereditor.interface'
import styles from './charactereditor.module.css'

const initCharacter: ICharacter = {
	name: "",
	parameters: {
		agility: 0,
		charisma: 0,
		intelligence: 0,
		strength: 0
	},
	additionalParameters: {
		dodge: 0,
		energy: 0,
		health: 0
	},
	skills: {
		attack: 0,
		stealth: 0,
		archery: 0,
		learning: 0,
		survival: 0,
		medicine: 0,
		intimidation: 0,
		insight: 0,
		appearance: 0,
		manipulation: 0
	},
	currentHealth: 0
}

export const CharacterEditor: FC = () => {

	const [character, setCharacter] = useState<ICharacter>(initCharacter)

	const onUpdateCharacter = (character: ICharacter) => {
		const updatedHealth = 3 + Number(character.parameters.strength)
		
		setCharacter({
			...character,
			additionalParameters: {
				...character.additionalParameters,
				health: updatedHealth
			},
			currentHealth: updatedHealth
		})
	}

	const onSkillUpdated = (skills: ICharacterSkills) => setCharacter({...character, skills: skills})

	const exportCharacter = (character: ICharacter) => {
		const characterData = JSON.stringify(character, null, 2);
		const blob = new Blob([characterData], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		
		link.href = url;
		link.download = `${character.name || 'character'}.json`;
		link.click();
	};
	  
	const importCharacter = (
		event: React.ChangeEvent<HTMLInputElement>, 
		onUpdateCharacter: (character: ICharacter) => void
	) => {
		const file = event.target.files?.[0];
		
		if (file) {
			const reader = new FileReader();
		  	
			reader.onload = (e) => {
			
				const result = e.target?.result as string;
			const importedCharacter = JSON.parse(result);

			importedCharacter.parameters = {
				strength: Number(importedCharacter.parameters.strength),
				agility: Number(importedCharacter.parameters.agility),
				intelligence: Number(importedCharacter.parameters.intelligence),
				charisma: Number(importedCharacter.parameters.charisma)
			};
			importedCharacter.additionalParameters = {
				health: Number(importedCharacter.additionalParameters.health),
				dodge: Number(importedCharacter.additionalParameters.dodge),
				energy: Number(importedCharacter.additionalParameters.energy)
			};
			importedCharacter.skills = Object.fromEntries(
				Object.entries(importedCharacter.skills).map(([key, value]) => [key, Number(value)])
			);

			onUpdateCharacter(importedCharacter);
		};
		  
		  reader.readAsText(file);
		}
	};

	const onDamaged = () => {

		setCharacter(prevCharacter => ({
			...prevCharacter,
			currentHealth: Math.max(prevCharacter.currentHealth - 1, 0)
		}))
	}

	return (
		<div className={styles.page}>
			<div>
				<div className={styles.container}>
					<img
						onClick={onDamaged}
						className={styles.characterImg} 
						src={require("../../assets/character.png")} 
					/>
					<div className={styles.characterInfo}>
						<CharacterForm
							character={character} 
							onUpdateCharacter={onUpdateCharacter} 
						/>
						<CharacterStats 
							parameters={character.parameters}
							health={character.currentHealth}						
						/>
						<CharacterSkillList 
							character={character} 
							onSkillUpdated={onSkillUpdated} 
						/>
					</div>			
				</div>
				<div>
					<button onClick={() => exportCharacter(character)}>
						Экспортировать персонажа
					</button>
					<input 
						type="file" 
						accept=".json" 
						onChange={(e) => importCharacter(e, onUpdateCharacter)} 
					/>
				</div>
			</div>
		</div>
	)
}
