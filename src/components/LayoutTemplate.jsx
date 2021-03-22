import React from 'react'
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import CssBaseline from "@material-ui/core/CssBaseline";

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
        },
        palette: {
            type: "dark",
            primary: blue
        }
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={'relative'}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Pokemon.list
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </ThemeProvider>
        </>
    )
}
