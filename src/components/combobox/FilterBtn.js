import "./FilterBtn.css";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

// const options = ["All", "Adventure", "Action", "Indie"];
const FilterBtn = () => {
  const options = ["All", "Adventure", "Action", "Indie"];
  let widget = (
    <Combobox
      data={options}
      dataKey="id"
      textField="name"
      defaultValue={"All"}
    />
  );

  return widget;
};

export default FilterBtn;
