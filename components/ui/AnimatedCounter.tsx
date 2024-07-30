'use client';

import CountUp from 'react-countup'


const AnimatedCounter = ({amount} : {amount: number}) => {
  return (
    <div>
      <CountUp 
        end={amount}
        decimal=","
        prefix="$"
        decimals={2}
        duration={0.5}
       />
    </div>
  )
}

export default AnimatedCounter
