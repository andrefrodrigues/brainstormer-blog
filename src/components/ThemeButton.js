import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Switch from "react-switch";
import { SunIcon } from './sun';
import { MoonIcon } from './moon';

const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
};

const iconStyle = {
    color: 'white',
    width: '20px',
    height: '20px'
}
export function ThemeButton() {
    return (
        <ThemeToggler>
            {({ theme, toggleTheme }) => (
                <label className="theme-button">
                    <Switch onChange={checked => toggleTheme(checked ? 'dark' : 'light')}
                        checked={theme === 'dark'}
                        checkedIcon={
                            <span style={wrapperStyle}>
                                <MoonIcon style={iconStyle}/>
                            </span>
                    }
                        uncheckedIcon={
                            <span style={wrapperStyle}>
                                <SunIcon style={iconStyle}/>
                            </span>
                    }
                        onColor="#18181B"
                        offColor='#18181B'
                    />
                </label>
            )}
        </ThemeToggler>
    );
}