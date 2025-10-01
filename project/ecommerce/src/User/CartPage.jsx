import { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import UserNavbar from './UserNavbar'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewcart/${user._id}`)
        setCartItems(res.data)
      } catch (err) {
        console.error('Error fetching cart:', err)
      }
    }
    fetchCart()
  }, [])

  const removeFromCart = async (id) => {
    try {
      await axios.delete("http://localhost:3000/remove/" + id)
      setCartItems(cartItems.filter(item => item._id !== id))
    } catch (err) {
      console.error('Error removing item:', err)
    }
  }

  const handleBuyNow = (product) => {
    navigate('/py', { state: { product: product } });
  }

  return (
    <div>
      <UserNavbar />
      <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        Your Cart
      </Typography>
      <Grid container spacing={4} sx={{ p: 2 }}>
        {cartItems.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            Your cart is empty.
          </Typography>
        ) : (
          cartItems.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4}>
              <Card>
                <img src={item.image}/>
                <CardContent>
                  <Typography gutterBottom variant="h6">{item.title}</Typography>
                  <Typography gutterBottom variant="h6" color="error">{item.price}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="error" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </Button>
                  <Button size="small" color="success" onClick={() => handleBuyNow(item)}>
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}

export default CartPage
