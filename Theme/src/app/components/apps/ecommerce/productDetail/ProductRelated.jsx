'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@/store/apps/eCommerce/EcommerceSlice';
import Link from 'next/link';
import BlankCard from '../../../shared/BlankCard';
import Image from 'next/image';

const ProductRelated = () => {
  const dispatch = useDispatch();

  // Get Product
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterRelatedProduct = (products) => {
    if (products) return products.filter((t) => t.related);

    return products;
  };

  // Get Products
  const Relatedproducts = useSelector((state) =>
    filterRelatedProduct(state.ecommerceReducer.products),
  );

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    (<Box>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          mt: 5
        }}>
        Related Products
      </Typography>
      <Grid container spacing={3}>
        {Relatedproducts.map((product) => (
          <Grid
            key={product.title}
            size={{
              xs: 12,
              lg: 3,
              sm: 4
            }}
            sx={{
              display: "flex",
              alignItems: "stretch"
            }}>
            {/* ------------------------------------------- */}
            {/* Product Card */}
            {/* ------------------------------------------- */}
            <BlankCard sx={{ p: 0 }} className="hoverCard">
              <Typography component={Link} href={`/apps/ecommerce/detail/${product.id}`}>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width="100%"
                    height={270}
                  ></Skeleton>
                ) : (
                  <Image
                    src={product.photo}
                    alt="img"
                    width={250}
                    height={268}
                    style={{ width: '100%' }}
                  />
                )}
              </Typography>
              <CardContent sx={{ p: 3, pt: 2 }}>
                <Typography sx={{
                  fontWeight: 600
                }}>{product.title}</Typography>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1
                  }}>
                  <Stack direction="row" sx={{
                    alignItems: "center"
                  }}>
                    <Typography variant="h5">${product.price}</Typography>
                    <Typography
                      color={'GrayText'}
                      sx={{
                        ml: 1,
                        textDecoration: 'line-through'
                      }}>
                      ${product.salesPrice}
                    </Typography>
                  </Stack>
                  <Rating name="read-only" size="small" value={product.rating} readOnly />
                </Stack>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </Box>)
  );
};

export default ProductRelated;
