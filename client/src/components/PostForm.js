import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import colors from "../utils/colors";

export default function PostForm() {
  const [err, setErr] = useState(false);
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ""
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: newData }
      });
      values.body = "";
    },
    onError(e) {
      setErr(true);
    }
  });

  function createPostCallback() {
    createPost();
    setErr(false);
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Express your thoughts..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={err}
          />
          <Button
            type="submit"
            color={colors.primary}
            disabled={!values.body.trim()}
          >
            Post it
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likesCount
      comments {
        id
        body
        createdAt
      }
      commentsCount
    }
  }
`;
