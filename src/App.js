import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import SearchScreen from "./screens/SearchScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import "./_app.scss";

const Layout = ({ children }) => {
    const [sidebar, setSidebar] = useState(false);

    const handleToggleSidebar = () => {
        setSidebar(!sidebar);
    };

    return (
        <>
            <Header onToggleSidebar={handleToggleSidebar} />
            <div className="app__container">
                <Sidebar
                    sidebar={sidebar}
                    onToggleSidebar={handleToggleSidebar}
                />
                <Container className="app_main" fluid>
                    {children}
                </Container>
            </div>
        </>
    );
};

function App() {
    const { accessToken, loading } = useSelector((state) => state.auth);

    const history = useHistory();

    useEffect(() => {
        if (!loading && !accessToken) {
            history.push("/auth");
        }
    }, [accessToken, loading, history]);

    return (
        <Switch>
            <Route path="/" exact>
                <Layout>
                    <HomeScreen />
                </Layout>
            </Route>

            <Route path="/auth">
                <LoginScreen />
            </Route>

            <Route path="/search/:query">
                <Layout>
                    <SearchScreen />
                </Layout>
            </Route>

            <Route path="/watch/:id">
                <Layout>
                    <WatchScreen />
                </Layout>
            </Route>

            <Route path="/feed/subscriptions">
                <Layout>
                    <SubscriptionsScreen />
                </Layout>
            </Route>

            <Route path="/channel/:channelId">
                <Layout>
                    <ChannelScreen />
                </Layout>
            </Route>

            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
}

export default App;
