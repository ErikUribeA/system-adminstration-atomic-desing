import { DefaultTheme } from "styled-components";

export const theme:DefaultTheme= {
    colors: {
        background: {
            gradient: {
                lightPurple: 'rgb(192, 132, 252)',
                pink: 'rgb(236, 72, 153)',
                red: 'rgb(239, 68, 68)'
            },
            white: 'rgb(255, 255, 255)',
            gray: {
                tabs: 'rgb(243, 244, 246)',     // pestañas inactivas
                pagination: 'rgb(229, 231, 235)' // botones de paginación
            }
        },
        text: {
            dark: 'rgb(31, 41, 55)',    // Negro/Gris oscuro
            medium: 'rgb(75, 85, 99)',  // Gris medio
            light: 'rgb(107, 114, 128)', // Gris claro
            white: 'rgb(255, 255, 255)'
        },
        accent: {
            purple: {
                default: 'rgb(168, 85, 247)',  // vacantes normal
                hover: 'rgb(147, 51, 234)'     // vacantes hover
            },
            pink: {
                default: 'rgb(236, 72, 153)',  // compañías normal
                hover: 'rgb(219, 39, 119)'     // compañías hover
            },
            red: {
                text: 'rgb(239, 68, 68)',      // botón eliminar texto
                hoverText: 'rgb(220, 38, 38)', // botón eliminar hover texto
                hoverBg: 'rgb(254, 242, 242)'  // botón eliminar hover fondo
            }
        },
        border: {
            gray: 'rgb(229, 231, 235)',
            focus: {
                purple: 'rgb(233, 213, 255)',
                pink: 'rgb(251, 207, 232)'
            }
        }
    },
    // Mantuve las otras propiedades del theme anterior
    fonts: {
        primary: "'Inter', sans-serif",
        secondary: "'Roboto', sans-serif"
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
    },
    breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px'
    }
};


