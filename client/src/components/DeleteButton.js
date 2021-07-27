import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import Popup from "./Popup";
import colors from "../utils/colors";
import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION
} from "../utils/graphql";

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        });
        let newData = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: newData }
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId }
  });

  return (
    <>
      <Popup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          basic
          as="div"
          color={colors.deleteButton}
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Popup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => deletePostOrComment()}
      />
    </>
  );
}
