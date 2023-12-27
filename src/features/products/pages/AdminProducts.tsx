import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchAllProducts, updateProduct } from "../reducers/productsReducer";
import { ProductRow } from "../types/ProductRow";
import { ProductUpdate, UpdateParams } from "../types/ProductUpdate";
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";

export const AdminProducts = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [])

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const products = useAppSelector(state => state.productsReducer.products)

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
            headerName: 'ID'//,
            //type: 'string'
        },
        {
            field: 'title',
            headerName: 'Title',
            editable: true
        },
        {
            field: 'category',
            headerName: 'Category',
        },
        {
            field: 'description',
            headerName: 'Description',
            editable: true
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            editable: true
        }
    ]
    const rows : ProductRow[] = products.map<ProductRow>(p => ({
        id : p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category.name,
        inventory: p.inventory
    }))

    const handleRowUpdate = (updatedRow : ProductRow, originalRow: ProductRow) => {
        if (updatedRow === originalRow) {
            return originalRow
        }
        const update : ProductUpdate = {
            title: updatedRow.title,
            price: updatedRow.price,
            description: updatedRow.description
        }
        const updateParams : UpdateParams = {
            id: updatedRow.id,
            update: update
        }
        dispatch(updateProduct(updateParams))
        return updatedRow
    }

    const handleUpdateError = () => {
        setAlert('Product update failed')
        setDialogOpen(true)
    }

    const handleDeleteSelected = () => {
        selection.forEach(s => {
            //dispatch(deleteProduct(s))
        })
    }

    return (
        <main>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>Manage products</Typography>
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
