import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    
  }
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 50px;
  width: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

export default function App() {
  // const [clicked, setClicked] = useState(false);
  // const toggle = () => setClicked((prev) => !prev);
  // const [id, setId] = useState<null | string>(null); 오류원인
  const [id, setId] = useState(null);
  const [switching, setSwitching] = useState(false);
  const onSwitch = () => {
    setSwitching((prev) => !prev);
  }
  return(
  // <Wrapper onClick={toggle}>
  <Wrapper>
    <Grid>
      {/* <Box layoutId="hello" />
      <Box />
      <Box />
      <Box /> */}
      {["1", "2", "3", "4"].map((n) => (
          <Box
            whileHover={{ scale:1.1 }} 
            onClick={() => setId(n)} key={n} layoutId={n}   
          >
          { switching && n === "2" ?
            <Circle layoutId="circle" style={{ borderRadius: 50 }} />
          : null}
          { !switching && n === "3" ?
            <Circle layoutId="circle" style={{ borderRadius: 50 }} />
          : null}
          </Box>
        ))}
    </Grid>
    
    <button style={{margin: "30px" }} onClick={onSwitch}> Switch</button>
    
    <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box 
              layoutId={id} style={{ width: 400, height: 200 }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
  </Wrapper>
  );
}

