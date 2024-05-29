import { FC } from 'react'
import { ICharacter, ICharacterParameters, ICharacterSkills } from '../CharacterEditor/charactereditor.interface'
import styles from './characterskilllist.module.css'

const skills = [
	{ name: 'Атака', key: 'attack', attribute: 'strength' },
	{ name: 'Стелс', key: 'stealth', attribute: 'agility' },
	{ name: 'Стрельба из лука', key: 'archery', attribute: 'agility' },
	{ name: 'Обучаемость', key: 'learning', attribute: 'intelligence' },
	{ name: 'Выживание', key: 'survival', attribute: 'intelligence' },
	{ name: 'Медицина', key: 'medicine', attribute: 'intelligence' },
	{ name: 'Запугивание', key: 'intimidation', attribute: 'charisma' },
	{ name: 'Проницательность', key: 'insight', attribute: 'charisma' },
	{ name: 'Внешний вид', key: 'appearance', attribute: 'charisma' },
	{ name: 'Манипулирование', key: 'manipulation', attribute: 'charisma' },
];

type CharacterSkillListProps = {
	character: ICharacter,
	onSkillUpdated: (skills: ICharacterSkills) => void;
}

export const CharacterSkillList: FC<CharacterSkillListProps> = ({character, onSkillUpdated}) => {

	const handleSkillChange = (skill: string, level: number) => {
		const updatedSkills = { ...character.skills, [skill]: level };
		onSkillUpdated(updatedSkills);
	};
	
	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement>, 
		attribute: keyof ICharacterParameters
	) => {
		const { name, value } = e.target;
		const max = character.parameters[attribute];
		const numValue = parseInt(value, 10);
	
		if (numValue <= max) {
			handleSkillChange(name, numValue);
		}
	};
	
	return (
		<div className={styles.container}>
			{skills.map(skill => (
				<div key={skill.key}>
					<label className={styles.paramLabel}>
						{skill.name}:
						<input
							type="number"
							name={skill.key}
							value={character.skills[skill.key]}
							onChange={(e) => handleInput(e, skill.attribute as keyof ICharacterParameters)}
							min={0}
							max={5}
						/>
					</label>
				</div>
			))}
		</div>
	)
}
