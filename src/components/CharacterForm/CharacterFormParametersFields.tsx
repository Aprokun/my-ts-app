import { ChangeEvent, FC } from 'react'
import { ICharacterParameters } from '../CharacterEditor/charactereditor.interface'
import styles from './characterform.module.css'

type CharacterFormParametersProps = {
	parameters: ICharacterParameters,
	onUpdateParameters: (parameters: ICharacterParameters) => void
}

export const CharacterFormParametersFields: FC<CharacterFormParametersProps> = ({parameters, onUpdateParameters}) => {

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		onUpdateParameters({...parameters, [name]: value})
	}

	return (
		<div>
			<label className={styles.paramLabel}>
				Сила:
				<input
					type="number" 
					name="strength" 
					value={parameters.strength} 
					onChange={handleChange} 
				/>
			</label>
			<label className={styles.paramLabel}>
				Ловкость:
				<input
					type="number" 
					name="agility" 
					value={parameters.agility} 
					onChange={handleChange}
				/>
			</label>
			<label className={styles.paramLabel}>
				Интелект:
				<input
					type="number" 
					name="intelligence" 
					value={parameters.intelligence} 
					onChange={handleChange} 
				/>
			</label>
			<label className={styles.paramLabel}>
				Харизма:
				<input
					type="number"
					name="charisma" 
					value={parameters.charisma} 
					onChange={handleChange} 
				/>
			</label>
		</div>
	)
}
