import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import Card from "./Card";
import styles from "./Product.module.css";
import ViewList from "./ViewList";

import ModeContext from "../context/ModeContext";
import ProductContext from "../context/ProductContext";
import EditProduct from "./EditProduct";
import Toggle from "./Toggle";

function Product() {
  const ctx = useContext(ProductContext);
  const modeCtx = useContext(ModeContext);
  const [list, setList] = useState([]);
  const [sumTotal, setSumTotal] = useState(0);

  const [itemToEdit, setItemToEdit] = useState(null);
  /*
    CREATE: Add a new product into the list
  */
  const handlerAddProduct = () => {
    const newItem = {
      id: uuid(),
      name: ctx.name,
      quantity: ctx.count,
      price: ctx.price,
      discount: ctx.discount,
      total: (ctx.count * ctx.price * (100 - ctx.discount)) / 100,
    };
    const newList = [...list, newItem];
    setList(newList);

    const sum = sumTotal + newItem.total;
    setSumTotal(sum);
  };

  /*
    DELETE a product from the list according to the given ID
  */
  const handlerDeleteProduct = (id) => {
    // Create a new item list with everything, except the item with matching ID
    const newList = list.filter((item) => item.id !== id);
    setList(newList);

    //Update new total
    let newTotal = 0;
    newList.forEach((item) => {
      newTotal += (item.quantity * item.price * (100 - item.discount)) / 100;
    });
    setSumTotal(newTotal);
  };

  const handleEditItem = (id) => {
    const itemToEditList = list.filter((item) => item.id === id);

    if (itemToEditList && itemToEditList.length > 0) {
      setItemToEdit(itemToEditList[0]);
    }
  };

  const handleOnNameChange = (value) => {
    setItemToEdit((itemToEdit) => {
      return {
        ...itemToEdit,
        name: value,
      };
    });
  };

  const handleOnQuantityChange = (value) => {
    setItemToEdit((itemToEdit) => {
      return {
        ...itemToEdit,
        quantity: value,
      };
    });
  };

  const handleOnPriceChange = (value) => {
    setItemToEdit((itemToEdit) => {
      return {
        ...itemToEdit,
        price: value,
      };
    });
  };

  const handleOnDiscountChange = (value) => {
    setItemToEdit((itemToEdit) => {
      return {
        ...itemToEdit,
        discount: value,
      };
    });
  };

  const handleOnCancel = () => {
    setItemToEdit(null);
  }
  
  const handleOnSubmit = () => {
    const updateList = list.map((item) => {
      if (item.id === itemToEdit.id) {
        return {
          ...itemToEdit,
          total:
            (itemToEdit.quantity *
              itemToEdit.price *
              (100 - itemToEdit.discount)) /
            100,
        };
      } else {
        return item;
      }
    });

    setList(updateList);
        //Update new total
        let newTotal = 0;
        updateList.forEach((item) => {
          newTotal += (item.quantity * item.price * (100 - item.discount)) / 100;
        });
        setSumTotal(newTotal);
    setItemToEdit(null);
  };

  //---------------------------------------------------------------------------

  return (
    <div className={`${styles.container} ${modeCtx.isDark && styles.dark}`}>
      <Toggle />
      <Card handlerAddProduct={handlerAddProduct} />
      <ViewList
        list={list}
        sum={sumTotal}
        handlerDeleteItem={handlerDeleteProduct}
        handleEditItem={handleEditItem}
      />
      {itemToEdit && (
        <EditProduct
          itemToEdit={itemToEdit}
          handleOnNameChange={handleOnNameChange}
          handleOnQuantityChange={handleOnQuantityChange}
          handleOnPriceChange={handleOnPriceChange}
          handleOnDiscountChange={handleOnDiscountChange}
          handleOnSubmit={handleOnSubmit}
          handleOnCancel={handleOnCancel}
        />
      )}
    </div>
  );
}

export default Product;
