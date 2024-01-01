import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";
import { Category } from "../types/Category";
import { CategoryUpdate, CategoryUpdateParams } from "../types/CategoryUpdate";
import { deleteCategory, updateCategory } from "../reducers/categoriesReducer";

export const AdminCategories = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const {categories, error} = useAppSelector(state => state.categoriesReducer)

    const [alert, setAlert] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selection, setSelection] = useState<GridRowSelectionModel>([])
  
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
            headerName: 'Name',
            editable: true,
            sortable: false 
        },
        {
            field: 'imageUrl',
            headerName: 'Image url',
            editable: true,
            sortable: false 
        }
    ]
    const rows : Category[] = categories.map<Category>(p => ({
        id : p.id,
        name: p.name,
        imageUrl: p.imageUrl
    }))

    const handleRowUpdate = (updatedRow : Category, originalRow: Category) => {
        if (updatedRow === originalRow) {
            return originalRow
        }
        const update : CategoryUpdate = {
            name: updatedRow.name,
            imageUrl: updatedRow.imageUrl
        }
        const updateParams : CategoryUpdateParams = {
            id: updatedRow.id,
            update: update
        }
        dispatch(updateCategory(updateParams))
        return updatedRow
    }

    const handleUpdateError = () => {
        setAlert('Category update failed')
        setDialogOpen(true)
    }

    const handleDeleteSelected = () => {
        selection.forEach(s => {
            dispatch(deleteCategory(s.toString()))
        })
    }

    return (
        <main>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>Manage categories</Typography>
            {error && <Alert severity='error'>Could not retrieve category data</Alert>}
            <Box width='100%'>
                <Button onClick={handleDeleteSelected} disabled>Delete</Button>
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
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 20,
                        },
                    },
                    }}
                    pageSizeOptions={[10, 20, 50]}
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
