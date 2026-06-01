import { useRef, useState } from "react";

function Study2(props) {
  // 1. 비밀 주머니(useRef) 대신, 확성기(useState)에 초기값 "test"를 넣습니다.
  const [change, setChange] = useState("test"); 
  
  // (이 실습에서는 이제 useRef가 필요 없습니다)
  // const input = useRef("test"); 

  function add() {
    // 2. 버튼을 누르면 스위치(setChange)를 켜서 값을 "iu"로 바꿉니다.
    setChange("iu"); 
  }

  return (
    <>
      <hr/>
      <h2>Study2</h2>
      <h3>{props.count}</h3>
      <button onClick={add}>CLICK</button>
      
      {/* 3. 화면에는 비밀 주머니(input.current) 대신 State(change)를 보여줍니다. */}
      <h4>INPUT : {change}</h4> 
    </>
  );
}

export default Study2;
