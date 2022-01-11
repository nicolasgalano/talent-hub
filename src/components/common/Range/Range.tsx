import { FC } from "react";

// Dependence
import Slider, { createSliderWithTooltip } from "rc-slider";
import clsx from "clsx";

// Files
import 'rc-slider/assets/index.css';
import './Range.scss';

interface RangeProps {
  callback?: Function;
  className?: string;
  defaultValue?: number[];
}

const Range:FC<RangeProps> = ({className, callback, defaultValue = []}) => {

  const CustomRange = createSliderWithTooltip(Slider.Range); 

  const handleChange = (value: Array<number>) => {
    callback && callback(value);
  }

  const formatValue = (val: number) => {
    return val === 1 ? `${val} Year` : `${val} Years`;
  }

  return(
    <div className={clsx('range', className)}>
      <CustomRange
        min={0} 
        max={20} 
        defaultValue={defaultValue}
        tipFormatter={formatValue}
        tipProps={{
          placement: 'bottom',
          prefixCls: 'rc-slider-tooltip',
        }}
        onAfterChange={handleChange}
        marks={{ 0: '0 Years', 20: '+20 Years' }} />
    </div>
  );
}
export default Range;