import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = ({
	setSettings,
}: {
	setSettings: (settings: any) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const [settings, setLocalSettings] = useState(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleChange = (key: keyof typeof defaultArticleState, value: any) => {
		setLocalSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleReset = () => {
		setLocalSettings(defaultArticleState);
		setSettings(defaultArticleState);
	};

	const applySettings = (e: React.FormEvent) => {
		e.preventDefault();
		setSettings(settings);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={applySettings}>
					<Select
						selected={settings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(val) => handleChange('fontFamilyOption', val)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(val) => handleChange('fontSizeOption', val)}
						title='Размер шрифта'
					/>
					<Select
						selected={settings.fontColor}
						options={fontColors}
						onChange={(val) => handleChange('fontColor', val)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={settings.backgroundColor}
						options={backgroundColors}
						onChange={(val) => handleChange('backgroundColor', val)}
						title='Цвет фона'
					/>
					<Select
						selected={settings.contentWidth}
						options={contentWidthArr}
						onChange={(val) => handleChange('contentWidth', val)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
