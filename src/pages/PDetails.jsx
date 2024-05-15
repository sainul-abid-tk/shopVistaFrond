import React, { useEffect, useState } from 'react';
import { getProductAPI } from '../Services/allAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function PDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reProductId = searchParams.get('RpId');
  const navigate = useNavigate();
  const { id } = useParams();
  const [reProductAmt, setReProductAmt] = useState("");
  const [pDetails, setPdetails] = useState();
  const [ratingValue, setRatingValue] = useState('');
  const [loading,setLoading]=useState(false)
  const getProductDetails = async () => {
    try {
      const result = await getProductAPI(id);
      if (result.status === 200) {
        setPdetails(result.data);
        setRatingValue(result.data.rating);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReproductDetails = async () => {
    try {
      const  result = await getProductAPI(reProductId);
      if (result.status === 200) {
        setLoading(false)
        const pDetails = result.data;
        setReProductAmt(
          Math.floor(pDetails?.price - (pDetails?.price * pDetails?.discountPercentage) / 100)
        );
      }
      return result
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      getProductDetails()
      if(reProductId){
        setLoading(true)
        getReproductDetails()
      }
  }, [id, reProductId]);
console.log(reProductAmt);
  console.log(getReproductDetails());
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress size={60} color="warning" />
      </Backdrop>
      <div className="min-h-screen grid grid-cols-2 space-x-4 max-md:grid-cols-1 max-md:space-y-3 mt-5">
      <div className="h-full flex justify-center items-center">
        <img
          width={600}
          style={{ maxHeight: '500px' }}
          className="border rounded-md shadow-lg"
          src={pDetails?.thumbnail}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center space-y-5">
        <p className="font-extrabold text-2xl">{pDetails?.title}</p>
        <Rating precision={0.5} value={ratingValue} readOnly />
        <p className="font-bold text-xl text-green-500">
          ${Math.floor(pDetails?.price - (pDetails?.price * pDetails?.discountPercentage) / 100)}{' '}
          <span className="line-through text-yellow-300">${pDetails?.price}</span>
        </p>
        {reProductAmt && (
          <p className="text-xl text-violet-600 font-bold">
            AfterReplacement:
            <span className="text-red-500">
              ${Math.floor(pDetails?.price - (pDetails?.price * pDetails?.discountPercentage) / 100 - reProductAmt)}
            </span>
          </p>
        )}
        <p className="text-xl">Stock: {pDetails?.stock}</p>
        <p className="text-xl">Brand: {pDetails?.brand}</p>
        <p className="text-xl underline font-bold">Description</p>
        <p className="text-lg">{pDetails?.description}</p>
        <Button
          onClick={() => {
            navigate(reProductAmt ? `/shipping/${id}?RpId=${reProductId}` : `/shipping/${id}`);
          }}
          startIcon={<AddShoppingCartIcon />}
          variant="contained"
          className="text-xl font-bold w-52"
        >
          Order Now
        </Button>
      </div>
    </div>
    </>
    
  );
}

export default PDetails;
