import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";
import { Category } from "../types/Category";
import { CategoryUpdate, CategoryUpdateParams } from "../types/CategoryUpdate";
import { updateCategory } from "../reducers/categoriesReducer";

export const AdminCategories = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const categories = useAppSelector(state => state.categoriesReducer.categories)

    const [alert, setAlert] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selection, setSelection] = useState<GridRowSelectionModel>([])
  
    if (!profile || (profile && profile.role !== 'admin')) {
        return (
            <NotAuthorized />
        )
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'name',
            headerName: 'Name',
            editable: true
        },
        {
            field: 'image',
            headerName: 'Image',
            editable: true
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
            //dispatch(deleteCategory(s))
        })
    }

    return (
        <main>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>Manage categories</Typography>
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
