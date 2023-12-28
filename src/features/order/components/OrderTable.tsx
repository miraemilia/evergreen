import { Box, Collapse, IconButton, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Order } from "../types/Order"
import { useState } from "react";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link as RouterLink } from "react-router-dom"

type Props = {
    orders : Order[]
  }

  function Row(props: { order: Order }) {
    const { order } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {order.createdAt.toString()}
          </TableCell>
          <TableCell align="right">{order.user.name}</TableCell>
          <TableCell align="right">{order.orderStatus}</TableCell>
          <TableCell align="right">{order.orderDetails.reduce((a, i) => a + (i.product.price * i.quantity), 0).toFixed(2)} €</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="order details">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Price (per unit in €)</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderDetails.map((details) => (
                      <TableRow key={details.product.id}>
                        <TableCell component="th" scope="row">
                        <Link component={RouterLink} to={`/products/${details.product.id}`}>{details.product.title}</Link>
                        </TableCell>
                        <TableCell>{details.product.price}</TableCell>
                        <TableCell>{details.quantity}</TableCell>
                        <TableCell>
                          {(details.product.price * details.quantity).toFixed(2)} €
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  export const OrderTable = ( { orders } : Props ) => {
  
    return (
        <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
                <TableCell />
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Customer</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {orders.map((order) => (
                <Row key={order.id} order={order} />
                ))}
          </TableBody>
        </Table>
      </TableContainer>

    )
  }

