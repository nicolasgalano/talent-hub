import { FC } from "react";

// Dependence
import Slider, { createSliderWithTooltip, Handle, Range as RangeRC, SliderTooltip } from "rc-slider";
import clsx from "clsx";

// Files
import 'rc-slider/assets/index.css';
import './Range.scss';

interface RangeProps {
  callback?: Function;
  className?: string;
}

const Range:FC<RangeProps> = ({className, callback}) => {

  const CustomRange = createSliderWithTooltip(Slider.Range); 

  const handleChange = (value: Array<number>) => {
    callback && callback(value);
  }

  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} Years`}
        visible={dragging}
        placement="bottom"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return(
    <div className={clsx('range', className)}>
      <RangeRC
        min={0} 
        max={20} 
        defaultValue={[0, 10]}
        handle={handle}
        onAfterChange={handleChange}
        marks={{ 0: '0 Years', 20: '+20 Years' }} />
    </div>
  );
}
export default Range;