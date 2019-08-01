import React, { Component } from 'react';
import axios from 'axios';
import CountdownTimer from 'react-component-countdown-timer';

// my API key: 61577c390423683a9bfc0e9a28456c70536f046b

export class MapWindow extends Component {

    constructor(props) {
        super();

        this.state = {
            inventory: [],
            cooldown: null,
            next_room_id: null,
            current_room_data: {
                current_room_id: null,
                prev_room_id: null,
                exits: [],
                items: [],
                players: [],
                errors: [],
                messages: [],
                title: null,
                description: null,
                coordinates: null,
                elevation: null,
                terrain: null
            },
            player_stats: {
                name: '',
                encumbrance: null,
                strength: 10,
                speed: 10,
                gold: null,
                inventory: [],
                status: [],
                errors: [],
                messages: [],
            },
            examined: {}
        };
    }
    // state^^^^---------------------------------------------------------------------------------------

    componentDidMount() {
        this.initRoomData();
        this.initStatus();
    }
    //componentDidMount^^^^^---------------------------------------------------------------------------------------



    initRoomData = async () => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/',
                method: 'get',
                timeout: 2000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            });
            console.log('Room Data', [{ 'Status:': res.status }, { 'Data:': res.data }, { 'Room ID:': res.data.room_id }]);
            this.setState({
                current_room_data: {
                    current_room_id: res.data.room_id,
                    exits: res.data.exits,
                    items: res.data.items,
                    players: res.data.players,
                    errors: res.data.errors,
                    messages: res.data.messages,
                    title: res.data.title,
                    description: res.data.description,
                    coordinates: res.data.coordinates,
                    elevation: res.data.elevation,
                    terrain: res.data.terrain
                }
            })
            console.log('initData:', this.state)
        } catch (err) {
            console.log(err)
        }
    };
    //roomData^^^^^---------------------------------------------------------------------------------------


    initStatus = async () => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/status/',
                method: 'post',
                timeout: 3000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            });
            this.setState({
                player_stats: {
                    name: res.data.name,
                    encumbrance: res.data.encumbrance,
                    strength: res.data.strength,
                    speed: res.data.speed,
                    gold: res.data.gold,
                    inventory: res.data.inventory,
                    status: res.data.status,
                    errors: res.data.errors,
                    messages: res.data.messages,
                }
            })
            console.log('playerstats STATE:', this.state)
        } catch (err) {
            console.log(err)
        }
    };
    //playerStats^^^^^^---------------------------------------------------------------------------------------



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
            this.setState({
                cooldown: res.data.cooldown,
                current_room_data: {
                    current_room_id: res.data.room_id,
                    prev_room_id: this.state.current_room_data.current_room_id,
                    exits: res.data.exits,
                    items: res.data.items,
                    players: res.data.players,
                    errors: res.data.errors,
                    messages: res.data.messages,
                    title: res.data.title,
                    description: res.data.description,
                    coordinates: res.data.coordinates,
                    elevation: res.data.elevation,
                    terrain: res.data.terrain
                }
            })
            console.log('movementstate State:', this.state)
        } catch (err) {
            console.log(err)
        }


    }
    //movePlayer^^^^^---------------------------------------------------------------------------------------

    examineRoom = async (name) => {
        //name of player or item you want to examine, hardcoded for now still need to make this dynamic
        let examine = name;
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/examine/',
                method: 'post',
                timeout: 2000,
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    name: examine
                }
            });
            console.log(res.data)

            this.setState({
                cooldown: res.data.cooldown,
                examined: {
                    name: res.data.name,
                    description: res.data.description,
                    errors: res.data.errors,
                    messages: res.data.messages
                }
            });
        } catch (err) {
            console.log(err);
        };
    };
    //examineRoom^^^^^^---------------------------------------------------------------------------------------

    pickupTreasure = async (name) => {
        let treasure = name;
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/take/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    name: treasure
                }
            });

            this.setState({
                cooldown: res.data.cooldown
            });
            console.log('Item PICKUP- Inventory:', this.state.player_stats.inventory)
        } catch (err) {
            console.log(err)
        };
    }
    //pickup Item^^^^^^---------------------------------------------------------------------------------------
    dropTreasure = async (name) => {
        let treasure = name;
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    name: treasure
                }
            });

            this.setState({
                cooldown: res.data.cooldown
            });
            console.log('Item Dropped:', this.state.player_stats.inventory)
        } catch (err) {
            console.log(err)
        };
    }
    //drop Item^^^^^^---------------------------------------------------------------------------------------

    prayToShrine = async () => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                }
            })
            console.log('Pray', res.data)
        } catch (err) {
            console.log(err)
        }
    }
    //PRAY^^^^^^---------------------------------------------------------------------------------------

    changeName = async (newName) => {
        try {
            let res = await axios({
                url: 'https://lambda-treasure-hunt.herokuapp.com/api/adv/change_name/',
                method: 'post',
                headers: {
                    Authorization: 'Token 61577c390423683a9bfc0e9a28456c70536f046b'
                },
                data: {
                    name: newName
                }
            })
            this.setState({
                name: res.data
            })
        }catch (err) {
            console.log(err)
        }
    }
    //nameChange^^^^^^---------------------------------------------------------------------------------------




    render() {
        return (
            <>
                <h1>CS BUILD WEEK</h1>
                <div className='btns'>
                    <div className='movement'>
                        <button onClick={() => this.movePlayer('n')}>North</button>
                        <button onClick={() => this.movePlayer('s')}>South</button>
                        <button onClick={() => this.movePlayer('e')}>East</button>
                        <button onClick={() => this.movePlayer('w')}>West</button>
                    </div>
                    <div className='pickup-drop'>
                        {this.state.current_room_data.items.length > 0 ? (
                            this.state.current_room_data.items.map(eachItem => {
                                return (
                                    <button onClick={() => this.pickupTreasure(eachItem)}>
                                        Pickup: {eachItem}
                                    </button>
                                )
                            })
                        ) : null}
                        {this.state.player_stats.inventory.length > 0 ? (
                            this.state.player_stats.inventory.map(eachItem => {
                                return (
                                    <button onClick={() => this.dropTreasure(eachItem)}>
                                        Drop: {eachItem}
                                    </button>
                                )
                            })
                        ) : null}

                    </div>
                    <div className='pray'>
                        {this.state.current_room_data.items.includes('shrine') ? (
                            <button onClick={() => this.prayToShrine()}>Pray to Shrine</button>
                        ) : null}
                    </div>
                </div>
                <div className='display-room-data'>
                    <div className='items'>
                        <h3>Items</h3>
                        {this.state.current_room_data.items.length > 0 ? (
                            this.state.current_room_data.items.map(eachItem => (
                                <div key={eachItem}>
                                    <button onClick={() => this.examineRoom(eachItem)}>
                                        Examine: {eachItem}
                                    </button>
                                </div>
                            ))
                        ) : (
                                <p>There are no items in this room.</p>
                            )}
                    </div>
                    <div className='players'>
                        <h3>Players</h3>
                        {this.state.current_room_data.players.length > 0 ? (
                            this.state.current_room_data.players.map(eachPlayer => (
                                <div key={eachPlayer}>
                                    <button onClick={() => this.examineRoom(eachPlayer)}>
                                        Examine: {eachPlayer}
                                    </button>
                                </div>
                            ))
                        ) : (
                                <p>There are no players in this room.</p>
                            )}
                    </div>
                    <div className='exits'>
                        <h3>Room Exits</h3>
                        {this.state.current_room_data.exits.map(eachExit => (
                            <p key={eachExit}>
                                {eachExit.toUpperCase()}
                            </p>
                        ))}
                        {/* {this.state.cooldown === this.state.cooldown ? (
                            <CountdownTimer count={this.state.cooldown} />
                        ) : <CountdownTimer count={this.state.cooldown} />} */}
                    </div>
                </div>
                <div className='player-stats'>
                    <h3>Player Stats</h3>
                    <p>Name: {this.state.player_stats.name}</p>
                    <p>Speed: {this.state.player_stats.speed}</p>
                    <p>Strength: {this.state.player_stats.strength}</p>
                    <p>Encumbrance: {this.state.player_stats.encumbrance}</p>
                </div>
                <div className='player-stats'>
                    <h3>Current Room Info</h3>
                    <p>{this.state.current_room_data.title} : {this.state.current_room_data.current_room_id}</p>
                    <p>{this.state.current_room_data.coordinates}</p>
                    <p>{this.state.current_room_data.description}</p>
                    <p>{this.state.current_room_data.terrain}</p>
                </div>
            </>
        )
    }

}


export default MapWindow;