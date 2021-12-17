# React 7

### 7.2
- initial : 초기스타일
- animate : 최종스타일

### 7.3
- Veriants
  - 코드를 깔끔하게 해줌
  - 많은 애니메이션을 하나로 연결
  - 애니메이션의 Stage(무대) ex) initial, finish, hidden
  - 자식에게 0.5, 0.7, 0.9 딜레이를 줄 경우 : 부모에게 `delayChildren: 0.5, staggerChildren: 0.2`

### 7.5
  - Gestures : 마우스hover애니
  - whileHover, whileTap(클릭), drag, whileDrag, dragConstrai(제약:이동범위)

### 7.6
  - 자식box의 이동범위를 BiggerBox로 제한하는 경우
    - `const biggerBoxRef = useRef<HTMLDivElement>(null)
    <BiggerBox ref={biggerBoxRef}>
    <Box />
    </BiggerBox>`
     
    - 드래그 후 가운데로 돌아오기
      dragElastic={0~1} : 탄성없음 / 1의경우 이동범위 박스로 제한
      dragSnapToOrigin

### 7.7
- MotionValue 
  - 애니메이션 내 수치를 찾을때
  - `const x = useMotionValue(0);
  useEffect(() => { x.onChange(() => console.log(x.get())); }, [x]);
  <Box style={{ x }} drag="x" dragSnapToOrigin />`

### 7.8
useTransfrom
  - 애니메이션 내 수치변환
  - `const potato =useTransform(x, [-800, 0 800], [2, 1, 0.1]);`

### 7.9
- rotateZ : 회전 애니메이션
- linear-gradient을 통한 배경변경
- userViewportScroll : 스크롤을 통한 값 받기
  - `const { scrollY, scrollYProgress } = userViewportScroll();
  useEffect(() => { scrollY.onChange() => { console.log(scrollY.get(), scrollYProgress.get()); });
  }, [scrollYProgress, scrollY]);

### 7.10
  - fill : 내부 색, stroke : 가장가리 선, strokeWidth : 선의 굵기
    - `<motion.path
    initial={{ fill "rgba(255, 255, 255, 0)" }} 
    animate={{ fill : "rgba(255, 255, 255, 1)", }} //0과1은 opacity
    transition={{ duration : 5}} //걸리는시간
    stroke="white"
    strokeWidth="2"
    d="어썸폰트값" >
  </motion.path>`

  - pathLength : 우리위치까지의 path길이(선과 함께 점차 나타나는 애니메이션 구현)
    - `<motion.path
    initial={{ fill "rgba(255, 255, 255, 0)", pathLength: 0}} 
    animate={{ fill : "rgba(255, 255, 255, 0)", pathLength : 1}}
    transition={{ duration : 5}}
    stroke="white"
    strokeWidth="2"
    d="어썸폰트값" >
  </motion.path>`

  - tranistion : 각효과에 animate효과를 따로 주는 경우(path는 5, fill은 딜레이:3 걸리는시간:1)
    - `<motion.path
    variants={svg}
    initial="start"
    animate="end"
    transition={{
     default: { duration: 5 }, //default : 모든 속성에 적용(아래에 적용한 fill 제외)
     fill: { duration: 1, delay: 3 },
    }}
    d="M224 373.12c">
</motion.path>`

### 7.11
AnimatePresence
  - ReactJs App에서 사라지는 component를 animate함
  - 항상 visible 상태여야 한다??
  - `      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          /> ) : null}
      </AnimatePresence>`

### 7.13
custom
  - variants에 데이터를 보낼 수 있게 해주는 property
  - variants가 function이여야 함
  - exitBeforeEnter : exit가 끝나고 다음 애니가 실행

### 7.14
- layout이라는 prop : css가 변화하면 자동으로 animation을 줌
- layoutId : 다른 component를 연결 `<Circle layoutId="circle" />`

### 7.15
Overlay
- `<AnimatePresence>
        {clicked ? (
          <Overlay
            initial={{backgroundColor : "rgba(0, 0, 0, 0)" }}
            animate={{backgroundColor : "rgba(0, 0, 0, 0.5)" }}
            exit={{backgroundColor : "rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId="hello" style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
       </AnimatePresence>`
- `const Overlay = styled(motion.div)
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      `
