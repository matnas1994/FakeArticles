import React, { Component } from 'react'
import {Tag} from '../Tag'

class Tags extends Component {

    render() {
        const {tags} = this.props;
        const renderTags = tags.map(tag => {
            return <Tag key={tag.id} text={tag.text}/>
        });

        return (
            <div>
                Tags:{renderTags} 
            </div>

        )
    }
}

export default Tags