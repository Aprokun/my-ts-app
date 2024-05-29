import { FC } from 'react'
import { ICharacterParameters } from '../CharacterEditor/charactereditor.interface'
import styles from './characterstats.module.css'

type CharacterStatsProps = {
	parameters: ICharacterParameters
}

export const CharacterStats: FC<CharacterStatsProps> = ({parameters}) => {

	const health = 3 + Number(parameters.strength);
  	const dodge = 10 + Number(parameters.agility);
  	const energy = Number(parameters.agility) + Number(parameters.intelligence);

	return (
		<div className={styles.container}>
			<p>Жизненная сила: {health}</p>
			<p>Уклонение: {dodge}</p>
			<p>Энергичность: {energy}</p>
		</div>
	);
}
