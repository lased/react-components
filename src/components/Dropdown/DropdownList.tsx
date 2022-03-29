import { FC } from 'react';
import { IDropdownList } from './Dropdown';

import './DropdownList.css';

interface IDropdownListProps {
  list: IDropdownList[];
}

const isArray = (value: any) => Array.isArray(value);

const DropdownList: FC<IDropdownListProps> = ({ list }) => {
  return <ul className='dropdown__list'>
    {list.map((item, index) => (
      <li key={index} className='dropdown__item' onClick={item.onClick}>
        {item.value}
        {item.list && isArray(item.list) && <DropdownList list={item.list} />}
      </li>
    ))}
  </ul>;
};

export default DropdownList;