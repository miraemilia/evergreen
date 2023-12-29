import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchAllOrders, updateOrderStatus } from "../reducers/ordersReducer"
import { OrderTable } from "../components/OrderTable"
import { NotAuthorized } from "../../../shared/pages/NotAuthorized"
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material"
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid"
import { OrderRow } from "../types/OrderRow"
import { OrderUpdate, OrderUpdateParams } from "../types/OrderUpdateParams"


export const AdminOrders = () => {

    const dispatch = useAppDispatch()

    const {orders, totalOrders} = useAppSelector(state => state.ordersReducer)
    const profile = useAppSelector(state => state.credentialsReducer.profile)


    const [alert, setAlert] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [selection, setSelection] = useState<GridRowSelectionModel>([])
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 20})

    useEffect(() => {
        dispatch(fetchAllOrders({limit: paginationModel.pageSize, offset: (paginationModel.page)*paginationModel.pageSize}))
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
            field: 'createdAt',
            headerName: 'Created at',
        },
        {
            field: 'customer',
            headerName: 'Customer name',
        },
        {
            field: 'status',
            headerName: 'Order status',
            editable: true
        },
        {
            field: 'total',
            headerName: 'Total',
        }
    ]
    const rows : OrderRow[] = orders.map<OrderRow>(o => ({
        id: o.id,
        createdAt: o.createdAt.toString(),
        customer: o.user.name,
        status: o.orderStatus,
        total: o.orderDetails.reduce((a, i) => a + (i.product.price * i.quantity), 0).toFixed(2)
    }))

    const handleRowUpdate = (updatedRow : OrderRow, originalRow: OrderRow) => {
        if (updatedRow === originalRow) {
            return originalRow
        }
        const update : OrderUpdate = {
            orderStatus: updatedRow.status
        }
        const updateParams : OrderUpdateParams = {
            id: updatedRow.id,
            update: update
        }
        dispatch(updateOrderStatus(updateParams))
        return updatedRow
    }

    const handleUpdateError = () => {
        setAlert('Order update failed')
        setDialogOpen(true)
    }

    return (
        <main>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>Manage orders</Typography>
            <Box width='100%'>
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
                    rowCount = {totalOrders}
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
