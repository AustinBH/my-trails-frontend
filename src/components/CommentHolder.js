import React from 'react'
import { Grid, Button } from 'semantic-ui-react';

const CommentHolder = props => {
    return <>
        <Grid columns={3} divided>
            {props.comments && props.comments.map(comment => {
                return <Grid.Row>
                    <Grid.Column>
                        <label><strong>User: </strong></label>
                        <p>{comment.user.username}</p>
                    </Grid.Column>
                    <Grid.Column>
                        <label><strong>Content: </strong></label>
                        <p>{comment.content}</p>
                    </Grid.Column>
                </Grid.Row>
            })}
        </Grid>
        <Button content='New Comment'/>
    </>
}

export default CommentHolder;