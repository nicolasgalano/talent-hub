
// Dependence
import { Handle, Range as RangeRC, SliderTooltip } from "rc-slider";

// Files
import 'rc-slider/assets/index.css';

import './Range.scss';

const Range = () => {

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
    <div className="range">
      <RangeRC
        min={0} 
        max={20} 
        defaultValue={[0, 10]}
        handle={handle}
        marks={{ 0: '0 Years', 20: '+20 Years' }} />
    </div>
  );
}
export default Range;