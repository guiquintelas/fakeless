import {
  Box, Button, InputBase, Paper,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useFeedContext } from '../contexts/FeedContext';
import { useUserContext } from '../contexts/UserContext';

const NewPostForm: React.FC = () => {
  const { user } = useUserContext();
  const [post, setPost] = useState('');
  const { setFeed } = useFeedContext();

  return (
    <Paper>
      <Box p={2}>
        <InputBase
          multiline
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder={`Olá ${user!.username}! Que notícia te pertuba?`}
          style={{
            width: '100%',
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            disabled={!post}
            onClick={() => {
              setPost('');
              setFeed((oldFeed) => ({
                ...oldFeed,
                posts: [
                  {
                    content: post,
                    createdAt: new Date(),
                    createdBy: user!.username,
                  },
                  ...oldFeed.posts,
                ],
              }));
            }}
          >
            Postar Notícia
          </Button>
        </Box>
      </Box>
    </Paper>

  );
};

export default NewPostForm;