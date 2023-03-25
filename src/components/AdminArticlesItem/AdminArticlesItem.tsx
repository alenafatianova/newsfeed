import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';

// страница редактирования партнерских статей
export const AdminArticlesItem: React.FC = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9} sx={{ mb: 3 }}>
          {id ? (
            <Typography variant="h4" gutterBottom>
              Редактирование статьи
            </Typography>
          ) : (
            'Создать новую'
          )}
        </Grid>
      </Grid>

      <Grid item xs={3}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button sx={{ mr: 1 }} color="success" variant="contained">
            Сохранить
          </Button>

          {id && (
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Удалить статью</MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Компания" variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Название статьи" variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth multiline maxRows={4} label="Подводка" variant="outlined" />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth multiline maxRows={12} label="Текст" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Input type="file" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
