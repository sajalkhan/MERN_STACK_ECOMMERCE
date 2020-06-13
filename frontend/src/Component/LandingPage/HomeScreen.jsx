import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../Layout/Spinner.jsx';

//Redux
import { connect } from 'react-redux';
import { getAllproducts } from '../../Action/productListAction';

const HomeScreen = ({ getAllproducts, All_Products: {products, loading }}) => {

    useEffect(() => {
        getAllproducts();
    }, [getAllproducts]);
    
    return (
        <ul className="products">
            {
               products === null || !loading ? <Spinner /> :
               products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <Link to={'/products/' + product._id} >
                                    <img className="product-img" src={process.env.PUBLIC_URL+'/images/'+product.image} alt="product" />
                                </Link>
                                <div className="product-name">
                                    <Link to={'/products/' + product._id}>{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price">${product.price}</div>
                                <div className="product-rating">{product.rating} stars ({product.review} Reviews) </div>
                            </div>
                        </li>
                    ))
            }

        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        All_Products: state.AllproductListReducer
    }
}
export default connect(mapStateToProps, { getAllproducts })(HomeScreen);