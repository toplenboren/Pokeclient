import React from 'react'
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {lightBlue, orange} from "@material-ui/core/colors";

export default function LayoutTemplate({children}) {

    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                'Inter',
                'Arial',
                'sans-serif',
            ].join(','),
            h6: {
                'font-weight':'bold'
            }
        },
        palette: {
            type: "dark",
            primary: orange,
            secondary: lightBlue,
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={'relative'}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Pokeclient!
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </ThemeProvider>
        </>
    )
}
