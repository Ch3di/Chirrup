import { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Grid, Card, Icon, Label, Button, Form } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import Popup from "../components/Popup";
import colors from "../utils/colors";
import { FETCH_POST_QUERY, POST_COMMENT_MUTATION } from "../utils/graphql";

export default function PostPage(props) {
  const postId = props.match.params.postId;

  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  function deletePostCallback() {
    props.history.push("/");
  }

  const [createComment] = useMutation(POST_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: { postId, body: comment }
  });

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    let {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likesCount,
      commentsCount
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Icon color="grey" size="massive" name="user circle" />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likesCount, likes }} />
                <Popup content="Comment on post">
                  <Button as="div" labelPosition="right">
                    <Button color="blue" basic>
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentsCount}
                    </Label>
                  </Button>
                </Popup>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment:</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="comment..."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className={`ui button ${colors.primary}`}
                        disabled={comment.trim() === ""}
                        onClick={createComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}
