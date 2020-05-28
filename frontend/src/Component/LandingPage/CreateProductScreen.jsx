import React, { useState, useEffect } from 'react';
import { getAllproducts, deleteProdcut, saveProduct } from '../../Action/productListAction';

//Redux 
import { connect } from 'react-redux';

function CreateProductsScreen({ getAllproducts, saveProduct, deleteProdcut, myProduct: { loading }, All_Products: { products } }) {
    const [modalVisible, setModalVisible] = useState(false);

    const [formData, setFormData] = useState({
        id:'',
        name: '',
        price: '',
        image: '',
        brand: '',
        category: '',
        inStock: '',
        description: ''
    });


    const { id, name, price, brand, category, inStock, description } = formData;

    const openModal = (product) => {
        setModalVisible(true);
        formData.id = product._id;
        formData.name = product.name;
        formData.price = product.price;
        formData.brand = product.brand;
        formData.category = product.category;
        formData.brand = product.brand;

        setFormData({ ...formData });
    }

    const onFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    }

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const deleteHandler = (product) => {
        deleteProdcut(product._id);
    }

    const submitFormData = (e) => {
        e.preventDefault();
        saveProduct(formData);
        setModalVisible(false);
    }

    useEffect(() => {
        getAllproducts();
    },);

    return <div className="content content-margined">

        <div className="product-header">
            <h3>Products</h3>
            <button className="button primary" onClick={() => openModal({})}>Create Product</button>
        </div>
        {modalVisible && !loading &&
            <div className="form">
                <form onSubmit={(e) => submitFormData(e)} >
                    <ul className="form-container">
                        <li>
                            <h2>Create Product</h2>
                        </li>

                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="text" name="name" required value={name} id="name" onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="price">
                                Price
                            </label>
                            <input type="text" name="price" required value={price} id="price" onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
                            </label>
                            <input type="file" accept=".jpg, .png, .jpeg" required onChange={onFileChange} >
                            </input>
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Brand
                            </label>
                            <input type="text" name="brand" required value={brand} id="brand" onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="inStock">
                                CountInStock
                            </label>
                            <input type="text" name="inStock" required value={inStock} id="inStock" onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="name">
                                Category
                            </label>
                            <input type="text" name="category" required value={category} id="category" onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="description">
                                Description
                            </label>
                            <textarea name="description" required value={description} id="description" onChange={(e) => handleFormData(e)}></textarea>
                        </li>
                        <li>
                            <button type="submit" className="button primary">{!products._id || !loading ? "Create" : "Update"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
                        </li>
                    </ul>
                </form>
            </div>
        }


        {
            !modalVisible  &&
            <div className="product-list">

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (<tr key={product.id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                {/* <button className="button" onClick={() => openModal(product)} >Edit</button>
                                {' '} */}
                                <button className="button" onClick={() => deleteHandler(product)} >Delete</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>

            </div>
        }
    </div>
}

const mapStateToProps = (state) => {
    return {
        myProduct: state.CreateproductReducer,
        All_Products: state.AllproductListReducer
    }
}

export default connect(mapStateToProps, { getAllproducts, saveProduct, deleteProdcut})(CreateProductsScreen);