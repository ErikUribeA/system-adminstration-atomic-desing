import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            background: {
                gradient: {
                    lightPurple: string;
                    pink: string;
                    red: string;
                };
                white: string;
                gray: {
                    tabs: string;
                    pagination: string;
                };
            };
            text: {
                dark: string;
                medium: string;
                light: string;
                white: string;
            };
            accent: {
                purple: {
                    default: string;
                    hover: string;
                };
                pink: {
                    default: string;
                    hover: string;
                };
                red: {
                    text: string;
                    hoverText: string;
                    hoverBg: string;
                };
            };
            border: {
                gray: string;
                focus: {
                    purple: string;
                    pink: string;
                };
            };
        };
        fonts: {
            primary: string;
            secondary: string;
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        breakpoints: {
            mobile: string;
            tablet: string;
            desktop: string;
        };
    }
}