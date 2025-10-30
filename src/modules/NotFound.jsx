import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box sx={{ textAlign:'center', py: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>404</Typography>
      <Typography color="text.secondary" gutterBottom>ไม่พบหน้าที่คุณต้องการ</Typography>
      <Button variant="contained" component={Link} to="/">กลับหน้าหลัก</Button>
    </Box>
  );
}
