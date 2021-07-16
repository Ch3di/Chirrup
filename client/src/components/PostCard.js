import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({
  post: { id, body, createdAt, username, likesCount, commentsCount, likes }
}) {
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
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="teal" basic>
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}
