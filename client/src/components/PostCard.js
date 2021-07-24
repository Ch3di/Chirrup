import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
export default function PostCard({
  post: { id, body, createdAt, username, likesCount, commentsCount, likes }
}) {
  const { user } = useContext(AuthContext);

  const likePost = () => {
    console.log("liked");
  };

  const commentOnPost = () => {
    console.log("commented");
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
        <Button
          as={Link}
          to={`/posts/${id}`}
          labelPosition="right"
          onClick={likePost}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => console.log("post deleted")}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
