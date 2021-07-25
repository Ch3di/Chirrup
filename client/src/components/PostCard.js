import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Popup from "./Popup";

export default function PostCard({
  post: { id, body, createdAt, username, likesCount, commentsCount, likes }
}) {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log("liked");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likesCount }} />
        <Popup content="Comment on post">
          <Button as={Link} to={`/posts/${id}`} labelPosition="right">
            <Button color="blue" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="teal" pointing="left">
              {commentsCount}
            </Label>
          </Button>
        </Popup>
        {user && user.username === username && (
          <DeleteButton postId={id} user={user} />
        )}
      </Card.Content>
    </Card>
  );
}
