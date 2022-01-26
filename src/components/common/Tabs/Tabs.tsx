import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

// UI Decentraland
import { Tabs as TabsDecentraland } from 'decentraland-ui/dist/components/Tabs/Tabs';
import { Button } from 'decentraland-ui/dist/components/Button/Button'

// Files
import './Tabs.scss';
import { plus } from '../../../assets/icons';

export type TabsData = {
  title: string;
  to: string;
}

export type TabsInfo = {
  options: Array<TabsData>;
  cta: TabsData;
}

interface TabsProps {
  dataTabs: TabsInfo;
}

const Tabs:FC<TabsProps> = ({dataTabs}) => {
  let {path} = useRouteMatch();
  path = path.toLowerCase();

  return(
    <TabsDecentraland>
      <div className="tab-content">
        <div className="tabs">
          {
            dataTabs.options.map((data) => (
              <Link to={data.to} key={`tab-${data.title}`}>
                <TabsDecentraland.Tab
                  active={ path === data.to }>
                  {data.title}
                </TabsDecentraland.Tab>
              </Link>
            ))
          }
        </div>
        {
          dataTabs.cta &&
            <Link className={'action '+((path === '/professionals')?'professionals':'')} to={dataTabs.cta.to}>
              <Button basic>
                <img src={plus} alt="icon plus" />
                { dataTabs.cta.title }
              </Button>
            </Link>
        }
      </div>
    </TabsDecentraland>
  );
}
export default Tabs;