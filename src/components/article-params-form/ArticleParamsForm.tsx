import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';

import { Text } from '../text';
import clsx from 'clsx';
import { Select } from '../select';
import {
	OptionType,
	ArticleStateView,
	backgroundColors,
	contentWidthArr,
	ArticleStateElse,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useState, FormEvent } from 'react';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateView) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateView>(ArticleStateElse);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAppState(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setFormState(ArticleStateElse);

		setAppState(ArticleStateElse);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpened}
				onClick={() => setIsOpened((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={() => setIsOpened(false)}
				className={clsx(styles.overlay, isOpened && styles.overlay_open)}></div>
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
