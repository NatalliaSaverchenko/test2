import { useState } from 'react'
import { isEven } from '../../api/parity'

const Counter = ({
  counterId,
  counterValue,
  counterIsEven,
  deleteCounter,
  counters,
  setCounters,
}) => {
  const [value, setValue] = useState(0)
  console.log(counters)
  const onChange = (e) => {
    setValue(e.target.value)

    let index = counters.findIndex((item) => item.counterId === counterId)
    counters[index] = {
      counterId: counterId,
      counterValue: e.target.value,
      counterIsEven: isEven(e.target.value),
    }
    return counters
  }

  const increase = (id) => {
    if (counters.find((item) => item.counterId === id)) {
      setValue((prevState) => prevState + 1)
      let index = counters.findIndex((item) => item.counterId === id)
      counters[index] = {
        counterId,
        counterValue: value,
        counterIsEven: isEven(value),
      }
      return counters
    }
  }

  const decrease = (id) => {
    if (counters.find((item) => item.counterId === id)) {
      setValue((prevState) => {
        return prevState === 0 ? prevState : prevState - 1
      })
    }
  }

  const reset = (id) => {
    if (counters.find((item) => item.counterId === id)) {
      setValue(0)
    }
  }

  return (
    <div className="counterContainer">
      <div className="counterInput">
        <input onChange={onChange} value={value}></input>
        <label>{`Введено ${
          isEven(value) ? `чётное` : `нечётное`
        } число`}</label>
      </div>
      <div className="counterPannel">
        <button className="decrease" onClick={() => decrease(counterId)}>
          -
        </button>
        <button className="reset" onClick={() => reset(counterId)}>
          Reset
        </button>
        <button className="increase" onClick={() => increase(counterId)}>
          +
        </button>
      </div>
      <button onClick={deleteCounter}>Delete counter</button>
    </div>
  )
}
export default Counter
