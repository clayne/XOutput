import React from "react";
import { Switch, Route, Redirect, RouteChildrenProps } from "react-router";
import { DeviceSelector } from "./emulation/DeviceSelector";
import { XboxEmulation } from "./emulation/xbox";
import { Link } from "react-router-dom";
import { Controllers } from "./controllers/Controllers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InputIcon from '@material-ui/icons/Input';
import LanguageIcon from '@material-ui/icons/Language';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Inputs } from "./input/Inputs";
import { InputDetails } from "./input/Details";
import { Ds4Emulation } from "./emulation/ds4";
import { Styled, StyleGenerator } from '../utils'
import Translation from "../translation/Translation";
import { Notifications } from "./Notifications";

type ClassNames = 'menubarButton' | 'mainContent' | 'title' | 'drawerRoot' | 'placeholder';

const styles: StyleGenerator<ClassNames> = () => ({
    menubarButton: {
        color: 'white',
    },
    mainContent: {
        margin: '8px',
    },
    title: {
      flexGrow: 1,
    },
    drawerRoot: {
        width: '360px',
        maxWidth: '360px',
    },
    placeholder: {
        flexGrow: 1,
    },
});

export interface MainMenuProps extends Styled<ClassNames> {

}

export interface MainMenuState {
    menuOpen: boolean;
}

class MainMenuComponent extends React.Component<MainMenuProps, MainMenuState> {

    state: MainMenuState = {
        menuOpen: false,
    }

    changeMenu(open: boolean): void {
        this.setState({
            menuOpen: open,
        });
    }

    render() {
        const { classes } = this.props;
        return <>
            <Switch>
                <Route path="/emulation" />
                <Route>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menubarButton} color="inherit" aria-label="menu" onClick={() => this.changeMenu(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                XOutput
                            </Typography>
                            <div className={classes.placeholder}></div>
                            <Badge badgeContent={0} color="secondary">
                                <Link to='/notifications' color='textPrimary'>
                                    <IconButton edge="start" className={classes.menubarButton} color="inherit" aria-label="menu">
                                        <NotificationsIcon />
                                    </IconButton>
                                </Link>
                            </Badge>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor='left' open={this.state.menuOpen} onClose={() => this.changeMenu(false)}>
                        <div className={classes.drawerRoot}>
                            <List component="nav" aria-label="secondary mailbox folders">
                                <ListItem button component={Link} to="/" onClick={() => this.changeMenu(false)}>
                                    <ListItemIcon>
                                        <SportsEsportsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={Translation.translate('ActiveControllers')} />
                                </ListItem>
                                <ListItem button component={Link} to="/inputs" onClick={() => this.changeMenu(false)}>
                                    <ListItemIcon>
                                        <InputIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={Translation.translate('InputDevices')} />
                                </ListItem>
                                <ListItem button component={Link} to="/devices" onClick={() => this.changeMenu(false)}>
                                    <ListItemIcon>
                                        <LanguageIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={Translation.translate('OnlineDevices')} />
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                </Route>
            </Switch>
            <div className={classes.mainContent}>
                <Switch>
                    <Route path="/" exact>
                        <Controllers></Controllers>
                    </Route>
                    <Route path="/devices">
                        <DeviceSelector></DeviceSelector>
                    </Route>
                    <Route path="/emulation/MicrosoftXbox360/:emulator" component={(props: RouteChildrenProps<{emulator: string}>) => (
                        <XboxEmulation deviceType='MicrosoftXbox360' emulator={props.match.params.emulator}></XboxEmulation>
                    )} />
                    <Route path="/emulation/SonyDualShock4/:emulator" component={(props: RouteChildrenProps<{emulator: string}>) => (
                        <Ds4Emulation deviceType='SonyDualShock4' emulator={props.match.params.emulator}></Ds4Emulation>
                    )} />
                    <Route path="/inputs" exact>
                        <Inputs></Inputs>
                    </Route>
                    <Route path="/inputs/:id" component={(props: RouteChildrenProps<{id: string}>) => (
                        <InputDetails id={props.match.params.id}></InputDetails>
                    )} />
                    <Route path="/notifications" exact>
                        <Notifications></Notifications>
                    </Route>
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </div>
        </>;
    }
}

export const MainMenu = withStyles(styles)(MainMenuComponent);
