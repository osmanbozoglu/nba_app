import React from "react";
import axios from "axios";
import { URL_TEAMS } from "../utils/paths";
import MyModal from "./modal";

import {
    CSSTransition,
    TransitionGroup
} from "react-transition-group";


class Teams extends React.Component {

    state = {
        teams: [], // whole list
        filtered: [], //altered team array
        team: null,
        keyword: ""
    }

    componentDidMount() {
        axios.get(URL_TEAMS)
            .then(response => {
                this.setState({
                    teams: response.data,
                    filtered: response.data
                })
            })
    }

    clearModal = () => {
        this.setState({ team: null })
    }

    showModalTeam = (data) => {
        this.setState({ team: data })
    }

    renderList = (filtered) => (
        filtered.map((item, index) => (
            <CSSTransition
                key={index}
                timeout={500}
                classNames="fade"
            >
                <div
                    className="team_item"
                    onClick={() => this.showModalTeam(item)}
                >
                    <img alt={item.name} src={`/images/teams/${item.logo}`} />
                </div>
            </CSSTransition>
        ))
    )

    searchTerm = (event) => {
        const keyword = event.target.value;

        if (keyword !== "") {
            const list = this.state.teams.filter(item => {
                return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
            });
            this.setState({
                filtered: list,
                keyword
            })
        } else {
            this.setState({
                filtered: this.state.teams,
                keyword
            })
        }
    }

    render() {
        return (
            <div className="teams_component">
                <div className="teams_input">
                    <input
                        type="text"
                        placeholder="Search for a team"
                        value={this.state.keyword}
                        onChange={e => this.searchTerm(e)}
                    />
                </div>
                <div className="container teams_container">
                    <TransitionGroup component="span">
                        {this.renderList(this.state.filtered)}
                    </TransitionGroup>
                </div>
                <MyModal
                    team={this.state.team}
                    clearModal={() => this.clearModal()}
                />
            </div>
        )
    }
}


export default Teams;
