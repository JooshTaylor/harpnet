export default interface IFormSubmitEvent
  extends React.FormEvent<HTMLFormElement> {
  target: IFormSubmitEventTarget
}

interface IFormSubmitEventTarget extends EventTarget {
  name: string
}
