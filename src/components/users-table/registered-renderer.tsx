import React from 'react';
import { useAppDispatch } from './../../store';
import { deleteUser } from './../../store/users/actions';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './users-table.less';

import dayjs from 'dayjs';

export interface RegisteredRendererProps {
  date: string;
  id: string;
}

export const RegisteredRenderer = ({ date, id }: RegisteredRendererProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className='registered'>
      {dayjs(date).format('D MMMM YYYY ')}
      <Button
        shape='circle'
        icon={<DeleteOutlined />}
        onClick={() => dispatch(deleteUser(id))}
      />
    </div>
  );
};
