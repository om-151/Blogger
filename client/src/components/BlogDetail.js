// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   Chip,
//   Stack,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from '@mui/material';
// import axios from 'axios';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [error, setError] = useState('');

//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await axios.get(`https://blogger-o29n.onrender.com/api/blogs/${id}`);
//         setBlog(response.data);
//       } catch (error) {
//         setError('Failed to load blog post');
//         console.error('Error fetching blog:', error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://blogger-o29n.onrender.com/api/blogs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       navigate('/');
//     } catch (error) {
//       setError('Failed to delete blog post');
//       console.error('Error deleting blog:', error);
//     }
//     setOpenDialog(false);
//   };

//   if (!blog) {
//     return (
//       <Container>
//         <Typography>{error || 'Loading...'}</Typography>
//       </Container>
//     );
//   }

//   const isAuthor = user.id === blog.author._id;

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         {blog.image && (
//           <Box
//             component="img"
//             sx={{
//               width: '100%',
//               height: 'auto',
//               maxHeight: '400px',
//               objectFit: 'cover',
//               borderRadius: 1,
//               mb: 3,
//             }}
//             src={blog.image}
//             alt={blog.title}
//           />
//         )}
//         <Typography variant="h3" gutterBottom>
//           {blog.title}
//         </Typography>
//         <Box sx={{ mb: 3 }}>
//           <Typography variant="subtitle1" color="text.secondary">
//             By {blog.author.username} | {new Date(blog.createdAt).toLocaleDateString()}
//           </Typography>
//         </Box>
//         <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
//           {blog.content}
//         </Typography>
//         {blog.tags && blog.tags.length > 0 && (
//           <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
//             {blog.tags.map((tag, index) => (
//               <Chip key={index} label={tag} variant="outlined" />
//             ))}
//           </Stack>
//         )}
//         {isAuthor && (
//           <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
//             <Button
//               variant="contained"
//               color="primary"
//               component={Link}
//               to={`/blog/edit/${id}`}
//             >
//               Edit
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => setOpenDialog(true)}
//             >
//               Delete
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Delete Blog Post</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this blog post? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button onClick={handleDelete} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default BlogDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Fade,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://blogger-o29n.onrender.com/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError('Failed to load blog post');
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://blogger-o29n.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (error) {
      setError('Failed to delete blog post');
      console.error('Error deleting blog:', error);
    }
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Fade in={loading} unmountOnExit>
          <CircularProgress size={60} color="primary" />
        </Fade>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <Typography color="error">{error || 'Blog post not found.'}</Typography>
      </Container>
    );
  }

  const isAuthor = user.id === blog.author._id;

  return (
    <Container maxWidth="md" sx={{ mt: 4, overflowX: 'hidden' }}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4, overflowX: 'hidden' }}>
        {blog.image && (
          <Box
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: 1,
              mb: 3,
              display: 'block',
            }}
            src={blog.image}
            alt={blog.title}
          />
        )}
        <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
          {blog.title}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" color="text.secondary">
            By {blog.author.username} | {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {blog.content}
        </Typography>
        {blog.tags && blog.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mt: 3, flexWrap: 'wrap' }}>
            {blog.tags.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Stack>
        )}
        {isAuthor && (
          <Box sx={{ mt: 4, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/blog/edit/${id}`}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Blog Post</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this blog post? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogDetail;
