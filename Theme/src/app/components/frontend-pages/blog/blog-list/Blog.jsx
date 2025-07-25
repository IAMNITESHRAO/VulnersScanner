import React from 'react';
import BlogCard from '../blog-card/BlogCard';
import { getAllPosts } from "@/utils/markdown";
import { Container, Grid2 as Grid } from '@mui/material';

const BlogList = () => {
    const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug", "author", "authorImage", "views", "comments", "category"]);

    return (
        (<Container maxWidth="lg" sx={{
                mt: 4, mb: 8
            }}>
            <Grid container spacing={3}>
                {posts.map((blog, i) => (
                    <Grid
                        key={i}
                        size={{
                            xs: 12,
                            lg: 4,
                            md: 4,
                            sm: 6
                        }}
                        sx={{
                            display: "flex",
                            alignItems: "stretch"
                        }}>
                        <BlogCard blog={blog} />
                    </Grid>
                ))}
            </Grid>
        </Container >)
    );
}

export default BlogList;