// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   CardActions,
//   Button,
//   Box,
// } from '@mui/material';
// import axios from 'axios';

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get('https://blogger-o29n.onrender.com/api/blogs');
//         setBlogs(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Latest Blog Posts
//       </Typography>
//       <Grid container spacing={4}>
//         {blogs.map((blog) => (
//           <Grid item xs={12} sm={6} md={4} key={blog._id}>
//             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//               {blog.image && (
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//               )}
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography gutterBottom variant="h5" component="h2">
//                   {blog.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {blog.content.substring(0, 150)}...
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="caption" color="text.secondary">
//                     By {blog.author.username} | {new Date(blog.createdAt).toLocaleDateString()}
//                   </Typography>
//                 </Box>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" component={Link} to={`/blog/${blog._id}`}>
//                   Read More
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  CircularProgress,
  Fade
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blogger-o29n.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Fade in={loading} unmountOnExit>
          <CircularProgress size={60} color="primary" />
        </Fade>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Blog Posts
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {blog.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image}
                  alt={blog.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content.substring(0, 150)}...
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    By {blog.author.username} | {new Date(blog.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/blog/${blog._id}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
