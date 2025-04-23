import { Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  // Agar user object available nahi hai, toh ek loading message dikhayein
  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Profile</Typography>
      {/* Safely display name or fallback */}
      <Typography>Name: {user?.name || user?.displayName || 'No name available'}</Typography>
      <Typography variant="body1">Email: {user?.email}</Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </div>
  );
}
