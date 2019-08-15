import React, { Component } from 'react'
import { Image, Icon, Card } from 'semantic-ui-react';

class MapMarker extends Component {

    state = {
        show: false
    }

    handleClick = ev => {
        this.setState({show: !this.state.show})
    }

    render() {
        return <div className='marker-holder'>
            <div className='map-marker' onClick={this.handleClick}>
                {this.props.current ?
                    <Image src='https://img.icons8.com/color/2x/user-location.png' alt='user-marker' />
                    :
                    <Image src='https://img.icons8.com/dusk/2x/filled-flag.png' alt='map-marker' />
                }
            </div>
            {this.state.show ?
                <div className='marker-info'>
                    <Card style={{zIndex: 3}}>
                        {this.props.trail.imgMedium ?
                            <Image style={{height: 150}}src={this.props.trail.imgMedium} alt={this.props.trail.name} />
                            :
                            null
                        }
                        <Card.Content>
                            <Card.Header>
                                {this.props.trail.name}
                                <Icon name='cancel' style={{ cursor: 'pointer', float: 'right' }} onClick={this.handleClick} />
                            </Card.Header>
                        {this.props.trail.summary ?
                            <Card.Description >
                                {this.props.trail.summary}
                            </Card.Description>
                            :
                            null
                        }
                        {this.props.trail.conditionStatus ?
                            <Card.Content>
                                <Card.Meta>
                                    Condition: {this.props.trail.conditionStatus}
                                </Card.Meta>
                                <Card.Meta>
                                    As of: {this.props.trail.conditionDate}
                                </Card.Meta>
                            </Card.Content>
                            :
                            null
                        }
                        </Card.Content>
                    </Card>
                </div>
                :
                null
            }
        </div>
    }
    
}

export default MapMarker;