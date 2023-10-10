import createTheme from "@mui/material/styles/createTheme";

export const siteTheme = createTheme({
    palette: {
        primary: {
            main: '#444654',
            light: '#8286a1'
        },
        secondary: {
            main: '#804340',
            light: '#f9e3e2'
        },
        background: {
            paper: '#f9e3e2'
        }
    },
    typography: {
        fontFamily: 'K2D',
        h1: {
            fontFamily: 'Pacifico',
            fontSize: '50px',
            color: '#804340',
        },
        h2: {
            color: '#804340',
            padding: '0.5em'
        },
        h3: {
            color: '#804340',
            padding: '0.5em'
        },
        h4: {
            color: '#804340',
            padding: '0.5em'
        },
        h5: {
            fontFamily: 'Pacifico',
            fontSize: 'xx-large',
            color: '#804340'
        },
        body1: {
            fontSize: 'large',
            margin: '1em'
        },
        button: {
            fontSize: 'medium'        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#f9e3e2',
                    backgroundImage: 'url(https://picsum.photos/id/866/2000)',
                    backgroundSize: 'cover',
                    padding: '1.5em'
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: '#f9e3e2',
                    width: 'fit-content',
                    padding: '1em',
                    margin: '0.2em'
                }
            }
        }
    }
})