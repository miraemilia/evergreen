import createTheme from "@mui/material/styles/createTheme";

export const siteTheme = createTheme({
    palette: {
        primary: {
            main: '#003805',
            light: '#49a364'
        },
        secondary: {
            main: '#04240d',
            light: '#e0ecf5'
        },
        background: {
            paper: '#d1e0d8'
        }
    },
    typography: {
        fontFamily: 'K2D',
        h1: {
            fontFamily: 'Whisper',
            fontSize: '60px',
            color: '#04240d',
        },
        h2: {
            color: '#04240d',
            padding: '0.5em'
        },
        h3: {
            color: '#04240d',
            padding: '0.5em'
        },
        h4: {
            color: '#04240d',
            padding: '0.5em'
        },
        h5: {
            fontFamily: 'Pacifico',
            fontSize: 'xx-large',
            color: '#04240d'
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
                    background: '#87ab9d',
                    //backgroundImage: 'url(https://picsum.photos/id/866/2000)',
                    //backgroundSize: 'cover',
                    padding: '1.5em'
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    background: '#d1e0d8',
                    width: 'fit-content',
                    padding: '1em',
                    margin: '0.2em'
                }
            }
        }
    }
})