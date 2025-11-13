import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Grid,
  Paper,
  Container,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Home,
  Group,
  Work,
  Chat,
  Notifications,
  ThumbUp,
  Comment,
  Share,
  Send,
  Photo,
  VideoLibrary,
  Event,
  Article,
  MoreVert,
  Close,
} from "@mui/icons-material";

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Alex Johnson",
      role: "Software Engineer",
      time: "1h ago",
      content: "Excited to share my new React + MUI project today!",
      likes: 24,
      comments: [],
      shares: 5,
      liked: false,
    },
    {
      id: 2,
      author: "Sarah Chen",
      role: "UX Designer",
      time: "3h ago",
      content: "Just completed a major redesign for our mobile app. The user feedback has been incredible! 🚀",
      likes: 42,
      comments: [],
      shares: 8,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [profileViews, setProfileViews] = useState(34);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: "Shantanu Singh",
        role: "Frontend Developer",
        time: "Just now",
        content: newPost,
        likes: 0,
        comments: [],
        shares: 0,
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleOpenComments = (post) => {
    setActivePost(post);
    setCommentDialogOpen(true);
  };

  const handleAddComment = () => {
    if (newComment.trim() && activePost) {
      setPosts(posts.map(post => {
        if (post.id === activePost.id) {
          return {
            ...post,
            comments: [...post.comments, {
              id: Date.now(),
              author: "Shantanu Singh",
              content: newComment,
              time: "Just now"
            }]
          };
        }
        return post;
      }));
      setNewComment("");
      setCommentDialogOpen(false);
    }
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    }));
    alert("Post shared to your network!");
  };

  const handleMenuOpen = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(postId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPostId(null);
  };

  const handleDeletePost = () => {
    setPosts(posts.filter(post => post.id !== selectedPostId));
    handleMenuClose();
  };

  return (
    <Box sx={{ bgcolor: "#f3f2ef", minHeight: "100vh" }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0a66c2" }}>
              LinkedIn
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton color="inherit">
                <Home />
              </IconButton>
              <IconButton color="inherit">
                <Group />
              </IconButton>
              <IconButton color="inherit">
                <Work />
              </IconButton>
              <IconButton color="inherit">
                <Chat />
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={notifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#0a66c2", ml: 1 }}>S</Avatar>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ mb: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <Box sx={{ height: 60, backgroundColor: "#0a66c2", borderRadius: "8px 8px 0 0" }} />
              <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 2, pt: 0 }}>
                <Avatar sx={{ width: 72, height: 72, mt: -4, bgcolor: "#0a66c2", border: "2px solid white" }}>S</Avatar>
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                  Shantanu Singh
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Frontend Developer
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="text.secondary">
                    Profile viewers
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    {profileViews}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Post impressions
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={600}>
                    {posts.reduce((sum, post) => sum + post.likes + post.comments.length, 0)}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle2" fontWeight={600} mb={1}>
                Recent
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer", py: 0.5, "&:hover": { color: "primary.main" } }}>
                # ReactJS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer", py: 0.5, "&:hover": { color: "primary.main" } }}>
                # Frontend
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ cursor: "pointer", py: 0.5, "&:hover": { color: "primary.main" } }}>
                # WebDev
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: "#0a66c2" }}>S</Avatar>
                <TextField
                  fullWidth
                  placeholder="Start a post"
                  multiline
                  rows={2}
                  variant="outlined"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 10,
                    }
                  }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                <Button size="small" startIcon={<Photo />} sx={{ color: "#378fe9" }}>
                  Photo
                </Button>
                <Button size="small" startIcon={<VideoLibrary />} sx={{ color: "#5f9b41" }}>
                  Video
                </Button>
                <Button size="small" startIcon={<Event />} sx={{ color: "#c37d16" }}>
                  Event
                </Button>
                <Button size="small" startIcon={<Article />} sx={{ color: "#e16745" }}>
                  Article
                </Button>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 2, 
                  borderRadius: 10,
                  textTransform: "none",
                  fontWeight: 600
                }}
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
              >
                Post
              </Button>
            </Paper>

            {posts.map((post) => (
              <Paper key={post.id} elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: post.author === "Shantanu Singh" ? "#0a66c2" : "#666" }}>
                      {post.author[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {post.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {post.role} • {post.time}
                      </Typography>
                    </Box>
                  </Box>
                  {post.author === "Shantanu Singh" && (
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, post.id)}>
                      <MoreVert fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between" sx={{ px: 1, py: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {post.likes} likes
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.comments.length} comments • {post.shares} shares
                  </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-around">
                  <Button
                    size="small"
                    startIcon={<ThumbUp fontSize="small" />}
                    onClick={() => handleLike(post.id)}
                    sx={{
                      color: post.liked ? "#0a66c2" : "#666",
                      textTransform: "none",
                      fontWeight: 600
                    }}
                  >
                    Like
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Comment fontSize="small" />}
                    onClick={() => handleOpenComments(post)}
                    sx={{ color: "#666", textTransform: "none", fontWeight: 600 }}
                  >
                    Comment
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Share fontSize="small" />}
                    onClick={() => handleShare(post.id)}
                    sx={{ color: "#666", textTransform: "none", fontWeight: 600 }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Send fontSize="small" />}
                    sx={{ color: "#666", textTransform: "none", fontWeight: 600 }}
                  >
                    Send
                  </Button>
                </Box>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                LinkedIn News
              </Typography>
              <List dense disablePadding>
                <ListItem button disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary="Groww makes strong market debut"
                    secondary="19h ago • 6,396 readers"
                    primaryTypographyProps={{ fontWeight: 600, variant: "body2", fontSize: "0.875rem" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
                <ListItem button disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary="Delhi AQI disrupts daily life"
                    secondary="21h ago • 1,355 readers"
                    primaryTypographyProps={{ fontWeight: 600, variant: "body2", fontSize: "0.875rem" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
                <ListItem button disableGutters sx={{ py: 1 }}>
                  <ListItemText
                    primary="India at COP30: Latest updates"
                    secondary="22h ago • 825 readers"
                    primaryTypographyProps={{ fontWeight: 600, variant: "body2", fontSize: "0.875rem" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItem>
              </List>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle2" fontWeight={600} mb={2}>
                Add to your feed
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: "#0a66c2", width: 48, height: 48 }}>C</Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>
                      Coding Daily
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Company • Technology
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      borderRadius: 10,
                      textTransform: "none",
                      fontWeight: 600
                    }}
                  >
                    Follow
                  </Button>
                </ListItem>
                <ListItem disableGutters>
                  <Avatar sx={{ mr: 2, bgcolor: "#e16745", width: 48, height: 48 }}>D</Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>
                      Design Weekly
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Page • Design
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      borderRadius: 10,
                      textTransform: "none",
                      fontWeight: 600
                    }}
                  >
                    Follow
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Dialog 
        open={commentDialogOpen} 
        onClose={() => setCommentDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>Comments</Typography>
            <IconButton onClick={() => setCommentDialogOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {activePost && (
            <>
              <Box mb={2} pb={2} borderBottom="1px solid #e0e0e0">
                <Typography variant="body2" mb={1}>{activePost.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  by {activePost.author}
                </Typography>
              </Box>
              {activePost.comments.map((comment) => (
                <Box key={comment.id} mb={2}>
                  <Box display="flex" gap={1} alignItems="flex-start">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: "#0a66c2" }}>
                      {comment.author[0]}
                    </Avatar>
                    <Box flex={1}>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: "#f3f2ef", borderRadius: 2 }}>
                        <Typography variant="caption" fontWeight={600} display="block">
                          {comment.author}
                        </Typography>
                        <Typography variant="body2">{comment.content}</Typography>
                      </Paper>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1, mt: 0.5, display: "block" }}>
                        {comment.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box display="flex" gap={1} mt={3}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#0a66c2" }}>S</Avatar>
                <TextField
                  fullWidth
                  placeholder="Add a comment..."
                  variant="outlined"
                  size="small"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleAddComment()}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 10,
                    }
                  }}
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCommentDialogOpen(false)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddComment} 
            disabled={!newComment.trim()}
            sx={{ 
              borderRadius: 10,
              textTransform: "none",
              fontWeight: 600
            }}
          >
            Post Comment
          </Button>
        </DialogActions>
      </Dialog>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Post</MenuItem>
      </Menu>
    </Box>
  );
}