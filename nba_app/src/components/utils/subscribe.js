import React from "react";
import axios from "axios";
import { URL_SUBS } from "./paths";

class Subscriptions extends React.Component {

    state = {
        email: "",
        error: false,
        success: false,
        alreadyIn: false
    }

    saveSubscription = (email) => {
        axios.get(`${URL_SUBS}?email=${email}`)
            .then(response => {
                if (!response.data.length) {
                    axios(URL_SUBS, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify({ email })
                    }).then(response => {
                        this.setState({
                            email: "",
                            success: true
                        });
                        this.clearMesssages();
                    })
                } else {
                    this.setState({
                        email: "",
                        alreadyIn: true
                    });
                    this.clearMesssages();
                }
            })
    }

    clearMesssages = () => {
        setTimeout(() => {
            this.setState({
                error: false,
                success: false,
                alreadyIn: false
            })
        }, 2000);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /^\S+@\S+\.\S+$/;

        if (regex.test(email)) {
            this.saveSubscription(email);
        }
        else {
            this.setState({ error: true });
            this.clearMesssages();
        }
    }

    onChangeInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    render() {
        const state = this.state;
        return (
            <div className="subcribe_panel">
                <h3>Subscribe to use</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={state.email}
                            placeholder="youremail@gmail.com"
                            onChange={this.onChangeInput}
                        />

                        <div className={state.error ? "error show" : "error"}>Check your email</div>
                        <div className={state.success ? "success show" : "success"}>Thank you</div>
                        <div className={state.alreadyIn ? "success show" : "success"}>You are already on the DB</div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Subscriptions;