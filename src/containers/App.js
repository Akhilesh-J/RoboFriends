import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
// import {robots} from './Robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

function App () {
    const [robots, setRobots] = useState([])
    const [searches, setSearches] = useState('')
    // const [count, setCount] = useState(0)

    useEffect(() => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => {setRobots( users )})
                // console.log(count)
    }, []) // only run if count changes.
    //empty dependency means componentDidMount i.e run once & no dependency means loop i.e run forever
    //& with a dependency it means run the useEffect agn when the dependency i.e the passed in dep - state changes

   const onSearchChange = (event) => {
        setSearches(event.target.value)
    }

    const filteredRobot = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searches.toLowerCase());
    })

    return !robots.length ?
        <h1 className="tc">LOADING</h1> :
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                {/*<button onClick={() => setCount(count + 1)}>Click Me!</button>*/}
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobot}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )

    }

export default App;