import React, {useEffect, useState }  from 'react';
const getLocalData=()=>{
  const lists=localStorage.getItem("myTodoList");
  if(lists)
  return JSON.parse(lists);
  else return [];
}

const Todo = () => {
  const [inputdata, setInputData]=useState("");
  const [ items,setItems] = useState(getLocalData());
  const addItem =()=>{
    if(!inputdata)
     alert('plz fill the data');
     else
     { const myNewInputData={
      id:new Date().getTime().toString(),
      name:inputdata,
     }
      setItems([...items,myNewInputData]);
     setInputData("");}
  };
  const deleteItem=(ide)=>{

    const updatedItems=items.filter((curlem)=>{
      return curlem.id !== ide;
    });
    setItems(updatedItems);
  };
   const editItem=(idel)=>{
    setInputData(idel.name);
    const upItem=items.filter((curlem)=>{
      if(curlem.id===idel.id)
      return inputdata;
      else return curlem;
    });
    setItems(upItem);
   };
   const removeAll=()=>{
setItems([]);
   }
   useEffect(()=>{
    localStorage.setItem("myTodoList",JSON.stringify(items));
   },[items]);
  return (
    <>
       <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todoimg.jpeg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
           
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
           
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
