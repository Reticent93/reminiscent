import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth";
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const App = () => (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
)

export default App;


