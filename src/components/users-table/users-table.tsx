import React, { useState, useCallback, useRef, useEffect } from 'react';
import ResizeObserver from 'rc-resize-observer';
import { Image, Table, TableColumnsType, Modal, Form } from 'antd';
import { IUser } from '../../models';
import { IUsersTableProps } from './types';
import { useAppDispatch } from './../../store';

import { RegisteredRenderer } from './registered-renderer';
import { UserEditingForm } from './user-editing-form';
import { setUser } from './../../store/users/actions';

import moment from 'moment';

import './users-table.less';

export const UsersTable = React.memo(({ loading, users }: IUsersTableProps) => {
  const [state, setState] = useState({
    isModalOpen: false,
    currentUser: undefined,
  });
  const [height, setTableHeight] = useState(undefined);

  const dispatch = useAppDispatch();

  const openModal = useCallback((user: IUser) => {
    setState({ isModalOpen: true, currentUser: user });
  }, []);

  const ref = useRef();

  useEffect(() => {
    ref.current = state.currentUser;
  }, [state.currentUser]);

  const onSave = useCallback((values: any) => {
    setState({ isModalOpen: false, currentUser: ref.current });

    if (ref.current) {
      const newUser: any = structuredClone(ref.current);
      newUser.login.username = values.name;
      newUser.email = values.email;
      newUser.phone = values.phone;
      newUser.phone = values.phone;
      newUser.cell = values.cell;
      newUser.dob.date = moment(values.dob).format();
      dispatch(setUser(newUser));
    }
  }, []);

  const heighDelta = 39; // 39 - высота заголовка таблицы

  return (
    <ResizeObserver
      onResize={({ height: componentHeight }) =>
        setTableHeight(Math.max(0, componentHeight - heighDelta))
      }
    >
      <div className='users-table'>
        <Table
          size='small'
          loading={loading}
          dataSource={users}
          columns={columns}
          scroll={{ y: height }}
          pagination={false}
          rowKey={keySelector}
          onRow={(user) => ({ onDoubleClick: () => openModal(user) })}
        />
        <Modal
          title='Edit user'
          centered
          footer={null}
          visible={state.isModalOpen}
          onOk={() => setState({ ...state, isModalOpen: false })}
          onCancel={() => setState({ ...state, isModalOpen: false })}
          destroyOnClose
        >
          <UserEditingForm user={state.currentUser} onSave={onSave} />
        </Modal>
      </div>
    </ResizeObserver>
  );
});

const keySelector = (user: IUser) => user.login.uuid;

const columns: TableColumnsType<IUser> = [
  {
    dataIndex: 'picture',
    width: 64,
    render: ({ thumbnail, large }) => (
      <Image src={thumbnail} preview={{ src: large }} alt='photo' />
    ),
  },
  {
    title: 'Имя пользователя',
    dataIndex: ['login', 'username'],
  },
  {
    title: 'Полное имя',
    dataIndex: 'name',
    render: ({ title, first, last }) => `${title} ${first} ${last}`,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Телефон',
    dataIndex: 'cell',
  },
  {
    title: 'Возраст',
    dataIndex: ['dob', 'age'],
  },
  {
    title: 'Дата регистрации',
    dataIndex: ['registered', 'date'],
    render: (date: string, { login }) => (
      <RegisteredRenderer date={date} id={login.uuid} />
    ),
  },
];
