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
  Drawer,
  useMediaQuery,
  useTheme,
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
  Menu as MenuIcon,
} from "@mui/icons-material";

export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
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
  const [notifications] = useState(3);
  const [profileViews] = useState(34);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');

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
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleOpenComments = (post) => {
    setActivePost(post);
    setCommentDialogOpen(true);
  };

  const handleAddComment = () => {
    if (newComment.trim() && activePost) {
      setPosts(
        posts.map((post) => {
          if (post.id === activePost.id) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: "Shantanu Singh",
                  content: newComment,
                  time: "Just now",
                },
              ],
            };
          }
          return post;
        })
      );
      setNewComment("");
      setCommentDialogOpen(false);
    }
  };

  const handleShare = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, shares: post.shares + 1 };
        }
        return post;
      })
    );
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
    setPosts(posts.filter((post) => post.id !== selectedPostId));
    handleMenuClose();
  };

  const handleNavClick = (item) => {
    setActiveNavItem(item);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const renderSidebar = () => (
    <Box>
      <Paper elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
        <Box sx={{ height: 60, bgcolor: 'primary.main' }} />
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 2, pt: 0 }}>
          <Avatar
            sx={{
              width: 72,
              height: 72,
              mt: -4,
              bgcolor: 'primary.main',
              border: 2,
              borderColor: 'background.paper',
            }}
          >
            S
          </Avatar>
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
              {posts.reduce(
                (sum, post) => sum + post.likes + post.comments.length,
                0
              )}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Recent
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            cursor: "pointer",
            py: 0.5,
            "&:hover": { color: "primary.main" },
          }}
        >
          # ReactJS
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            cursor: "pointer",
            py: 0.5,
            "&:hover": { color: "primary.main" },
          }}
        >
          # Frontend
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            cursor: "pointer",
            py: 0.5,
            "&:hover": { color: "primary.main" },
          }}
        >
          # WebDev
        </Typography>
      </Paper>
    </Box>
  );

  const renderRightSidebar = () => (
    <Box>
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          LinkedIn News
        </Typography>
        <List dense disablePadding>
          <ListItem button disableGutters sx={{ py: 1 }}>
            <ListItemText
              primary="Groww makes strong market debut"
              secondary="19h ago • 6,396 readers"
              primaryTypographyProps={{
                fontWeight: 600,
                variant: "body2",
              }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </ListItem>
          <ListItem button disableGutters sx={{ py: 1 }}>
            <ListItemText
              primary="Delhi AQI disrupts daily life"
              secondary="21h ago • 1,355 readers"
              primaryTypographyProps={{
                fontWeight: 600,
                variant: "body2",
              }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </ListItem>
          <ListItem button disableGutters sx={{ py: 1 }}>
            <ListItemText
              primary="India at COP30: Latest updates"
              secondary="22h ago • 825 readers"
              primaryTypographyProps={{
                fontWeight: 600,
                variant: "body2",
              }}
              secondaryTypographyProps={{ variant: "caption" }}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Add to your feed
        </Typography>
        <List dense disablePadding>
          <ListItem disableGutters sx={{ mb: 2 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main', width: 48, height: 48 }}>
              C
            </Avatar>
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
              color="primary"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Follow
            </Button>
          </ListItem>
          <ListItem disableGutters>
            <Avatar sx={{ mr: 2, bgcolor: 'secondary.main', width: 48, height: 48 }}>
              D
            </Avatar>
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
              color="primary"
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Follow
            </Button>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: 'primary.main' }}>
              LinkedIn
            </Typography>
            
            {isMobile ? (
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => setMobileDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton 
                  color={activeNavItem === 'home' ? 'primary' : 'default'}
                  onClick={() => handleNavClick('home')}
                >
                  <Home />
                </IconButton>
                <IconButton 
                  color={activeNavItem === 'network' ? 'primary' : 'default'}
                  onClick={() => handleNavClick('network')}
                >
                  <Group />
                </IconButton>
                <IconButton 
                  color={activeNavItem === 'jobs' ? 'primary' : 'default'}
                  onClick={() => handleNavClick('jobs')}
                >
                  <Work />
                </IconButton>
                <IconButton 
                  color={activeNavItem === 'messaging' ? 'primary' : 'default'}
                  onClick={() => handleNavClick('messaging')}
                >
                  <Chat />
                </IconButton>
                <IconButton 
                  color={activeNavItem === 'notifications' ? 'primary' : 'default'}
                  onClick={() => handleNavClick('notifications')}
                >
                  <Badge badgeContent={notifications} color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', ml: 1 }}>
                  S
                </Avatar>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={600}>Menu</Typography>
            <IconButton onClick={() => setMobileDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            <ListItem button onClick={() => handleNavClick('home')}>
              <Home sx={{ mr: 2 }} color="primary" />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleNavClick('network')}>
              <Group sx={{ mr: 2 }} color="primary" />
              <ListItemText primary="My Network" />
            </ListItem>
            <ListItem button onClick={() => handleNavClick('jobs')}>
              <Work sx={{ mr: 2 }} color="primary" />
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem button onClick={() => handleNavClick('messaging')}>
              <Chat sx={{ mr: 2 }} color="primary" />
              <ListItemText primary="Messaging" />
            </ListItem>
            <ListItem button onClick={() => handleNavClick('notifications')}>
              <Badge badgeContent={notifications} color="error" sx={{ mr: 2 }}>
                <Notifications color="primary" />
              </Badge>
              <ListItemText primary="Notifications" />
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          {renderSidebar()}
        </Box>
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            {renderSidebar()}
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ mb: 2, overflow: 'hidden' }}>
              <Box sx={{ height: 30, }} />
              <Box sx={{ p: 2, mt: -3 }}>
                <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', border: 2, borderColor: 'background.paper' }}>
                    S
                  </Avatar>
                  <TextField
                    fullWidth
                    placeholder="Start a post"
                    multiline
                    rows={2}
                    variant="outlined"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={1}>
                  <Button size="small" startIcon={<Photo />} >
                    Photo
                  </Button>
                  <Button size="small" startIcon={<VideoLibrary />} >
                    Video
                  </Button>
                  <Button size="small" startIcon={<Event />} >
                    Event
                  </Button>
                  <Button size="small" startIcon={<Article />} >
                    Article
                  </Button>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, textTransform: "none", fontWeight: 600 }}
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </Box>
            </Paper>

            {posts.map((post) => (
              <Paper key={post.id} elevation={1} sx={{ p: 2, mb: 2 }}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  mb={2}
                >
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: post.author === "Shantanu Singh" ? 'primary.main' : 'grey.500',
                      }}
                    >
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
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, post.id)}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Typography variant="body2" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>

                <Divider />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ px: 1, py: 0.5 }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {post.likes} likes
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.comments.length} comments • {post.shares} shares
                  </Typography>
                </Box>

                <Divider />

                <Box display="flex" justifyContent="space-around" sx={{ pt: 1 }}>
                  <Button
                    size="small"
                    startIcon={<ThumbUp fontSize="small" />}
                    onClick={() => handleLike(post.id)}
                    color={post.liked ? "primary" : "inherit"}
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Like
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Comment fontSize="small" />}
                    onClick={() => handleOpenComments(post)}
                    color="inherit"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Comment
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Share fontSize="small" />}
                    onClick={() => handleShare(post.id)}
                    color="inherit"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Send fontSize="small" />}
                    color="inherit"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                  >
                    Send
                  </Button>
                </Box>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            {renderRightSidebar()}
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={commentDialogOpen}
        onClose={() => setCommentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Comments
            </Typography>
            <IconButton onClick={() => setCommentDialogOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {activePost && (
            <>
              <Box mb={2} pb={2} borderBottom={1} borderColor="divider">
                <Typography variant="body2" mb={1}>
                  {activePost.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  by {activePost.author}
                </Typography>
              </Box>
              {activePost.comments.map((comment) => (
                <Box key={comment.id} mb={2}>
                  <Box display="flex" gap={1} alignItems="flex-start">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {comment.author[0]}
                    </Avatar>
                    <Box flex={1}>
                      <Paper elevation={0} sx={{ p: 1.5, bgcolor: 'action.hover' }}>
                        <Typography variant="caption" fontWeight={600} display="block">
                          {comment.author}
                        </Typography>
                        <Typography variant="body2">{comment.content}</Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1, mt: 0.5, display: "block" }}
                      >
                        {comment.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box display="flex" gap={1} mt={3}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>S</Avatar>
                <TextField
                  fullWidth
                  placeholder="Add a comment..."
                  variant="outlined"
                  size="small"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleAddComment()
                  }
                />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setCommentDialogOpen(false)}
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Post Comment
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Post</MenuItem>
      </Menu>
    </Box>
  );
}