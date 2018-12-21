import React from "react";

const Styles = {
    container: {
        paddingTop: "100px",
        textAlign: "center"
    }
}
export default () =>
    <div style={Styles.container} className="NotFound">
        <h3>Sorry, page not found!</h3>
    </div>;
