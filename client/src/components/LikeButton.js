import { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import Popup from "./Popup";
import colors from "../utils/colors";
import { LIKE_POST_MUTATION } from "../utils/graphql";

export default function LikeButton({
  user,
  post: { id, likesCount, likes },
  errorCallback
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    errorPolicy: "none",
    onError(error) {
      if (errorCallback) errorCallback({ message: error.message });
    }
  });

  const likeButton = user ? (
    <Button color={colors.likeButton} onClick={likePost} basic={!liked}>
      <Icon name="heart" />
    </Button>
  ) : (
    <Button as={Link} to="/login" color={colors.likeButton} basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup content={liked ? "Unlike" : "Like"}>
      <Button as="div" labelPosition="right">
        {likeButton}
        <Label basic color={colors.likeButton} pointing="left">
          {likesCount}
        </Label>
      </Button>
    </Popup>
  );
}
