import { useEffect, useState } from 'react'
import { isEven } from '../../api/parity'

const Counter = ({
  counterId,
  deleteCounter,
  counters,
  setCounters,
  setCountersSum,
}) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (counters.find((item) => item.counterId === counterId)) {
      let index = counters.findIndex((item) => item.counterId === counterId)
      counters[index] = {
        counterId,
        counterValue: value,
        counterIsEven: isEven(value),
      }
    }
    setCounters(counters)
    setCountersSum(counters.reduce((prev, cur) => prev + +cur.counterValue, 0))
  }, [value, counters, counterId, setCounters, setCountersSum])

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const increase = () => {
    setValue((prevState) => +prevState + 1)
    console.log(counters)
  }

  const decrease = () => {
    setValue((prevState) => {
      return prevState === 0 ? +prevState : +prevState - 1
    })
  }

  const reset = () => {
    setValue(0)
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
