'use client';
import Grid from '@mui/material/Grid2';
import { useEffect } from 'react';
import { useSelector,useDispatch  } from 'react-redux';
import { fetchPosts } from '@/store/apps/userProfile/UserProfileSlice';
import PostItem from './PostItem';
import { PostTextBox } from './PostTextBox';

const Post = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const getPosts = useSelector((state) => state.userpostsReducer.posts);

  return (
    (<Grid container spacing={3}>
      <Grid
        size={{
          sm: 12
        }}>
        <PostTextBox />
      </Grid>
      {getPosts.map((posts) => {
        return (
          (<Grid
            key={posts.id}
            size={{
              sm: 12
            }}>
            <PostItem post={posts} />
          </Grid>)
        );
      })}
    </Grid>)
  );
};

export default Post;
