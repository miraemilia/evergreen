import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { fetchAllOrders } from "../reducers/ordersReducer"
import { OrderTable } from "../components/OrderTable"
import { NotAuthorized } from "../../../shared/pages/NotAuthorized"
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material"


export const AdminOrders = () => {

    const dispatch = useAppDispatch()

    const orders = useAppSelector(state => state.ordersReducer.orders)
    const profile = useAppSelector(state => state.credentialsReducer.profile)


    useEffect(() => {
        dispatch(fetchAllOrders())
    }, [])

    if (!profile || (profile && profile.role !== 'Admin')) {
        return (
            <NotAuthorized />
        )
    }

    return (
        <>
            <Button component={RouterLink} to='/admin'>Back to Admin Dashboard</Button>
            <Typography variant='h2'>View orders</Typography>
            <Box padding={4}>
                <OrderTable orders = {orders}></OrderTable>
            </Box>
        </>
    )
}