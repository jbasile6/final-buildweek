import React, { Component } from 'react';
import axios from 'axios';

// my API key: 61577c390423683a9bfc0e9a28456c70536f046b

export class MapWindow extends Component {
    componentDidMount() {
        this.initData();
    }

    initData = async() => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
                method: 'get',
                timeout: 5000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            });
            console.log('Status:', res.status);
            console.log('Data:', res.data);
            console.log('Room ID:', res.data.room_id);

            return res.data
        } catch(err) {
            console.log(err)
        }
    };

    render() {
        return(
            <>
            <p>CS BUILD WEEK</p>
            </>
        )
    }

}


export default MapWindow;