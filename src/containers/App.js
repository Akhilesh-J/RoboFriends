import React, {Component} from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
// import {robots} from './Robots';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searches: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {
                this.setState({robots: users})
            })
    }

    onSearchChange = (event) => {
        this.setState({searches: event.target.value})
    }

    render() {
        const {robots, searches} = this.state;
        const filteredRobot = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searches.toLowerCase());
        })
        return !robots.length ?
            <h1 className="tc">LOADING</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobot}/>
                    </Scroll>
                </div>
            )
    }
}

export default App;