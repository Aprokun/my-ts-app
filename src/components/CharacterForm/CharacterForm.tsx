import { ChangeEvent, FC } from 'react'
import { ICharacter, ICharacterParameters } from '../CharacterEditor/charactereditor.interface'
import { CharacterFormParametersFields } from './CharacterFormParametersFields'
import styles from './characterform.module.css'

type CharacterFormProps = {
	character: ICharacter,
	onUpdateCharacter: (character: ICharacter) => void
}

export const CharacterForm: FC<CharacterFormProps> = ({character, onUpdateCharacter}) => {

	const onCharacterChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {value} = e.target
		onUpdateCharacter({...character, name: value})
	}

	const onUpdateParameters = (parameters: ICharacterParameters) => {
		onUpdateCharacter({...character, parameters: parameters})
	}

	return (
		<div className={styles.container}>
			<label className={styles.paramLabel}>
				Имя:
				<input
					type='text' 
					name='name' 
					value={character.name} 
					onChange={onCharacterChange} 
				/>
			</label>
			<CharacterFormParametersFields 
				parameters={character.parameters}
				onUpdateParameters={onUpdateParameters} 
			/>
		</div>
	)
}
