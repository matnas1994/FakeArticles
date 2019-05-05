import React, { Component } from 'react'


class Loading extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }

}

export default Loading