import styles from "./ViewList.module.css";

import { useContext } from "react";
import ModeContext from "../context/ModeContext";
import Input from "./Input";

const EditProduct = ({
  itemToEdit,
  handleOnNameChange,
  handleOnQuantityChange,
  handleOnPriceChange,
  handleOnDiscountChange,
  handleOnSubmit,
  handleOnCancel,
}) => {
  const modeCtx = useContext(ModeContext);

  return (
    <div>
      <table className={`${styles.table} ${!modeCtx.isLight && styles.dark}`}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Disc %</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={itemToEdit.id}>
            <td>
              <Input value={itemToEdit.name} onChange={handleOnNameChange} />
            </td>
            <td>
              <Input
                value={itemToEdit.quantity}
                onChange={handleOnQuantityChange}
              />
            </td>
            <td>
              <Input value={itemToEdit.price} onChange={handleOnPriceChange} />
            </td>
            <td>
              <Input
                value={itemToEdit.discount}
                onChange={handleOnDiscountChange}
              />
            </td>
            <td>
              <button onClick={handleOnSubmit}>Submit</button>
              <button onClick={handleOnCancel}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditProduct;
