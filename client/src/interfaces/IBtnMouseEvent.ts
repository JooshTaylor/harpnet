export default interface IBtnMouseEvent
  extends React.MouseEvent<HTMLButtonElement> {
  target: IBtnMouseEventTarget
}

interface IBtnMouseEventTarget extends EventTarget {
  name: string
}
