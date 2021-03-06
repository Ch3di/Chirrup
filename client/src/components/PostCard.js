import { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Popup from "./Popup";
import colors from "../utils/colors";

export default function PostCard({
  post: { id, body, createdAt, username, likesCount, commentsCount, likes }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Icon
          className="right floated"
          color="grey"
          size="big"
          name="user circle"
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
            <Button color={colors.commentButton} basic>
              <Icon name="comments" />
            </Button>
            <Label basic color={colors.commentButton} pointing="left">
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
