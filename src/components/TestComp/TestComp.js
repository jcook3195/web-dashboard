import createRecipeDoc from "../../firebase/crud";
import { useRef } from "react";

function TestComp() {
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    createRecipeDoc(dataRef.current.value);
    dataRef.current.value = "";
  };

  return (
    <div className="test-comp">
      <form onSubmit={submithandler}>
        <input type="text" ref={dataRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default TestComp;
