import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Link as RouterLink } from "react-router-dom"

import { NotAuthorized } from "../../../shared/pages/NotAuthorized"
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { deleteUser, fetchAllUsers, updateUser, updateUserRole } from "../reducers/usersReducer"
import { UserRow } from "../types/UserRow"
import { RoleUpdateParams } from "../types/RoleUpdate"
import { UserRole } from "../types/UserRole"

export const AdminUsersPage = () => {

  const dispatch = useAppDispatch()

    const {profile, token} = useAppSelector(state => state.credentialsReducer)
    const {users, totalUsers, error} = useAppSelector(state => state.usersReducer)

    const [alert, setAlert] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selection, setSelection] = useState<GridRowSelectionModel>([])
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 20})

    useEffect(() => {
        console.log(`changed with page ${paginationModel.page}, pageSize ${paginationModel.pageSize}`)
        dispatch(fetchAllUsers({limit: paginationModel.pageSize, offset: (paginationModel.page)*paginationModel.pageSize, token: token}))
    }, [paginationModel])
  
    if (!profile || (profile && profile.role !== 'Admin')) {
        return (
            <NotAuthorized />
        )
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            sortable: false        
        },
        {
            field: 'name',
            headerName: 'Name' ,
            sortable: false       
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: false 
        },
        {
            field: 'role',
            headerName: 'Role',
            editable: true,
            sortable: false,
            type: 'singleSelect',
            valueOptions: Object.values(UserRole)
        }
    ]
    const rows : UserRow[] = users.map<UserRow>(u => ({
        id : u.id,
        name: u.name,
        email: u.email,
        role: u.role
    }))

    const handleRowUpdate = (updatedRow : UserRow, originalRow: UserRow) => {
        if (updatedRow === originalRow) {
            return originalRow
        }
        const updateParams : RoleUpdateParams = {
            id: updatedRow.id,
            role: updatedRow.role,
            token: token
        }
        dispatch(updateUserRole(updateParams))
        return updatedRow
    }

    const handleUpdateError = () => {
        setAlert('User update failed')
        setDialogOpen(true)
    }

    const handleDeleteSelected = () => {
        selection.forEach(s => {
            const deleteParams = {id: s.toString(), token: token}
            dispatch(deleteUser(deleteParams))
        })
    }



  if (!profile || (profile && profile.role !== 'Admin')) {
      return (
        <main>
          <NotAuthorized />
        </main>
      )
  }

  return (
    
    <main>
        <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
        <Typography variant='h2'>Manage users</Typography>
        {error && <Alert severity='error'>Could not retrieve user data</Alert>}
        <Box width='100%'>
                <Button onClick={handleDeleteSelected}>Delete</Button>
                <DataGrid
                    editMode='row'
                    processRowUpdate={handleRowUpdate}
                    onProcessRowUpdateError={handleUpdateError}
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    onRowSelectionModelChange={setSelection}
                    paginationMode="server"
                    rowCount = {totalUsers}
                    pageSizeOptions={[20, 30, 40]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
                <Dialog open={dialogOpen}>
                    <DialogContent>
                        <DialogContentText>{alert}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
    </main>
  )
}
