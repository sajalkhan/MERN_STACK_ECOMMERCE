import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { getProductDetails } from '../../Action/productListAction';
import Spinner from '../Layout/Spinner';

const ProductScreen = ({ getProductDetails, productDetails: { product, loading }, match, history }) => {

    const [Qty, setQty] = useState(1);

    useEffect(() => {
        getProductDetails(match.params.id)
    }, [getProductDetails, match.params.id]);

    const handleAddtoCart = () => {
        history.push("/cart/" + match.params.id + "?qty=" + Qty);
    }

    return (
        <div>
            <div className="back-to-result">
                <Link to='/'>Back To Result</Link>
            </div>

            {
                product === null || !loading ? <Spinner /> :
                    <div className="details">
                        <div className="details-img">
                            <img src={process.env.PUBLIC_URL + '/images/' + product.image} alt="product" />
                        </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    Price: <b>${product.price}</b>
                                </li>
                                <li>
                                    {product.rating} stars ({product.review} Reviews)
                                        </li>
                                <li>
                                    Description: {product.description}
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: ${product.price}
                                </li>
                                <li>
                                    Status: {product.inStock>0? "In Stock": "Unavailable"}
                                </li>
                                <li>
                                    Qty:
                                        <select value={Qty} onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(product.inStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </select>
                                </li>
                                <li>
                                    {product.inStock > 0 && <button onClick={handleAddtoCart} className="button">Add To Cart</button>}
                                </li>
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productDetails: state.ProductDetailsReducer
    }
}
export default connect(mapStateToProps, { getProductDetails })(ProductScreen);