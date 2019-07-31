import React, { Component } from 'react';
import axios from 'axios';

// my API key: 61577c390423683a9bfc0e9a28456c70536f046b

export class MapWindow extends Component {
    componentDidMount() {
        this.initRoomData();
        this.initStatus();
    }

    initRoomData = async () => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
                method: 'get',
                timeout: 1000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            });
            console.log('Room Data', [{ 'Status:': res.status }, { 'Data:': res.data }, { 'Room ID:': res.data.room_id }]);

            return res.data
        } catch (err) {
            console.log(err)
        }
    };

    initStatus = async () => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
                method: 'post',
                timeout: 2000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            });
            console.log('Player Status', [{ 'Status:': res.status }, { 'Data:': res.data }, { 'Player Name:': res.data.name }]);

            return res.data
        } catch (err) {
            console.log(err)
        }
    };

    movePlayer = async (direction, next_room_id = null) => {
        let axiosCall;
        if (next_room_id !== null) {
            axiosCall = {
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    direction: direction,
                    next_room_id: next_room_id.toString()
                }
            }
        } else {
            axiosCall = {
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    direction: direction
                }
            }
        }
        try {
            let res = await axios(axiosCall);
            console.log('Move', [{ 'Status:': res.status }, { 'Data:': res.data }])
            setTimeout(() => {
                this.initStatus();
            }, res.data.cooldown * 1000);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <>
                <h1>CS BUILD WEEK</h1>
                <div>
                    <button onClick={() => this.movePlayer('n')}>North</button>
                    <button onClick={() => this.movePlayer('s')}>South</button>
                    <button onClick={() => this.movePlayer('e')}>East</button>
                    <button onClick={() => this.movePlayer('w')}>West</button>
                </div>
            </>
        )
    }

}


export default MapWindow;