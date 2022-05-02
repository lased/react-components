import { CSSProperties, FC, MouseEvent, ReactNode } from 'react';

import DropdownList from './DropdownList';

import './Dropdown.css';

export interface IDropdownList {
  value: ReactNode | string;
  list?: IDropdownList[];
  onClick?: (event: MouseEvent) => void;
}
interface IDropdownProps {
  children: ReactNode | string;
  list: IDropdownList[];
}

const Dropdown: FC<IDropdownProps> = ({ children, list }) => {
  return (
    <div className='dropdown'>
      {children}
      <DropdownList list={list} />
    </div>
  );
};

export default Dropdown;