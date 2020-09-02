import React, {
  createContext, useState, useContext,
} from 'react';
import { v4 as uuid } from 'uuid';

export type Post = {
  id: string,
  content: string,
  createdAt: Date,
  createdBy: string,
  liked: boolean
}

type Feed = {
    posts: Post[],
};

type FeedContextType = {
  feed: Feed,
  loading: Boolean,
  addPost: (post: Post) => void,
  loadMorePosts: () => Promise<void>,
  toggleLikePost: (id: string) => void
}

const defaultFeed: Feed = {
  posts: [
    {
      id: uuid(),
      content: 'post 1',
      createdBy: 'Guilherme Frota',
      createdAt: new Date(),
      liked: false,
    },
    {
      id: uuid(),
      content: 'post 2',
      createdBy: 'Guilherme Frota',
      createdAt: new Date(),
      liked: false,
    },
    {
      id: uuid(),
      content: 'post 3',
      createdBy: 'Guilherme Frota',
      createdAt: new Date(),
      liked: false,
    },
    {
      id: uuid(),
      content: 'post 4',
      createdBy: 'Guilherme Frota',
      createdAt: new Date(),
      liked: false,
    },
  ],
};

export const FeedContext = createContext<FeedContextType>({
  feed: defaultFeed,
  loading: false,
  addPost: () => {
    throw new Error('state not initialized');
  },
  loadMorePosts: () => {
    throw new Error('state not initialized');
  },
  toggleLikePost: () => {
    throw new Error('state not initialized');
  },
});

const FeedProvider: React.FC = ({ children }) => {
  const [feed, setFeed] = useState<Feed>(defaultFeed);
  const [loading, setLoading] = useState<Boolean>(false);

  return (
    <FeedContext.Provider
      value={{
        feed,
        loading,

        addPost: (post: Post) => {
          setFeed((oldFeed) => ({
            ...oldFeed,
            posts: [
              post,
              ...oldFeed.posts,
            ],
          }));
        },

        loadMorePosts: async () => {
          setLoading(true);
          return new Promise<void>((res) => setTimeout(() => {
            setFeed((oldFeed) => ({
              ...oldFeed,
              posts: [
                ...oldFeed.posts,
                {
                  id: uuid(),
                  content: 'post 1',
                  createdBy: 'Guilherme Frota',
                  createdAt:
                  new Date(),
                  liked: false,
                },
                {
                  id: uuid(),
                  content: 'post 2',
                  createdBy: 'Guilherme Frota',
                  createdAt:
                  new Date(),
                  liked: false,
                },
                {
                  id: uuid(),
                  content: 'post 3',
                  createdBy: 'Guilherme Frota',
                  createdAt:
                  new Date(),
                  liked: false,
                },
                {
                  id: uuid(),
                  content: 'post 4',
                  createdBy: 'Guilherme Frota',
                  createdAt:
                  new Date(),
                  liked: false,
                },
                {
                  id: uuid(),
                  content: 'post 5',
                  createdBy: 'Guilherme Frota',
                  createdAt:
                  new Date(),
                  liked: false,
                },
              ],
            }));
            setLoading(false);
            res();
          }, 500));
        },

        toggleLikePost: (id: string) => {
          setFeed((oldFeed) => ({
            ...oldFeed,
            posts: oldFeed.posts.map((post) => {
              if (post.id === id) {
                return {
                  ...post,
                  liked: !post.liked,
                };
              }
              return post;
            }),
          }));
        },
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;

export function useFeedContext() {
  return useContext(FeedContext);
}
