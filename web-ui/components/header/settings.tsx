import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'

interface ISettingsProps {
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void
  handleCloseUserMenu: () => void
  anchorElUser: null | HTMLElement
  logout: () => void
}

export function Settings({ handleOpenUserMenu, handleCloseUserMenu, anchorElUser, logout }: ISettingsProps) {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleCloseUserMenu()
            logout()
          }}
        >
          <Typography textAlign='center'>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
