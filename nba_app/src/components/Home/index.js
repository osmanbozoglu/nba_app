import React from "react";

import HomeSlider from "./slider";
import Subscriptions from "../utils/subscribe";
import HomeArticles from "./articles";
import Poll from "../utils/poll";

class Home extends React.Component {

    state = {
        home: ""
    }

    render() {
        return (
            <>
                <HomeSlider />
                <Subscriptions />
                <div className="container">
                    <HomeArticles />
                </div>
                <Poll />

            </>
        )
    }
}

export default Home;