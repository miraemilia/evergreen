import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Link, Typography } from "@mui/material"

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteProduct, fetchAllProducts, updateProduct } from "../reducers/productsReducer";
import { ProductRow } from "../types/ProductRow";
import { ProductUpdate, UpdateParams } from "../types/ProductUpdate";
import { NotAuthorized } from "../../../shared/pages/NotAuthorized";
import { OrderRow } from "../../order/types/OrderRow";

export const AdminProducts = () => {

    const dispatch = useAppDispatch()

    const profile = useAppSelector(state => state.credentialsReducer.profile)
    const { adminProducts, adminTotalProducts, error } = useAppSelector(state => state.productsReducer)

    const [alert, setAlert] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selection, setSelection] = useState<GridRowSelectionModel>([])
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 20})

    useEffect(() => {
        dispatch(fetchAllProducts({limit: paginationModel.pageSize, offset: (paginationModel.page)*paginationModel.pageSize}))
    }, [paginationModel])
  
    if (!profile || (profile && profile.role !== 'Admin')) {
        return (
            <NotAuthorized />
        )
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID'        },
        {
            field: 'title',
            headerName: 'Title',
            editable: true,
            renderCell: (params : any) => (
                <Link component={RouterLink} to={`/admin/products/${params.value.id}`}>{params.value.title}</Link>
              )
        },
        {
            field: 'latinName',
            headerName: 'Latin name',
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
        },
        {
            field: 'inventory',
            headerName: 'Inventory',
            type: 'number'
        }
    ]
    const rows : ProductRow[] = adminProducts.map<ProductRow>(p => ({
        id : p.id,
        title: {title: p.title, id: p.id},
        latinName: p.latinName,
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
            title: updatedRow.title.title,
            latinName: updatedRow.latinName,
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
            const id = s.toString()
            dispatch(deleteProduct(id))
        })
    }

    return (
        <main>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>Manage products</Typography>
            {error && <Alert severity='error'>Could not retrieve product data</Alert>}
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
                    paginationMode="server"
                    rowCount = {adminTotalProducts}
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
