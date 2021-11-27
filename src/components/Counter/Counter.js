import { isEven } from '../../api/parity'
import './Counter.css'
const Counter = ({ counter, deleteCounter, changeCounter }) => {
  const { counterId, counterValue } = counter

  const onChange = (e) => {
    const { counterId } = counter
    const value = Number(e.target.value)
    const diff = value - Number(counterValue)
    changeCounter(counterId, value, diff)
  }

  const increase = () => {
    const { counterId, counterValue } = counter
    const counterValueNumber = Number(counterValue)
    const updatedValue = counterValueNumber + 1
    const diff = 1
    changeCounter(counterId, updatedValue, diff)
  }

  const decrease = () => {
    const { counterId, counterValue } = counter
    const counterValueNumber = Number(counterValue)
    const updatedValue =
      counterValueNumber === 0 ? counterValueNumber : counterValueNumber - 1
    const diff = counterValueNumber === 0 ? 0 : -1
    changeCounter(counterId, updatedValue, diff)
  }

  const reset = () => {
    const updatedValue = 0
    const diff = -counterValue
    changeCounter(counterId, updatedValue, diff)
  }

  return (
    <div className="counterContainer">
      <div className="counterInput">
        <input onChange={onChange} value={counterValue}></input>
        <label>{`Введено ${
          isEven(counterValue) ? `чётное` : `нечётное`
        } число`}</label>
      </div>
      <div className="counterPannel">
        <button className="decrease" onClick={decrease}>
          -
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
        <button className="increase" onClick={increase}>
          +
        </button>
      </div>
      <div className="delete">
        <button onClick={() => deleteCounter(counterId)}>Delete counter</button>
      </div>
    </div>
  )
}
export default Counter
