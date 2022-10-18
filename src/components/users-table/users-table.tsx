import React, { useState, useCallback } from 'react';
import ResizeObserver from 'rc-resize-observer';
import { Image, Table, TableColumnsType, Modal, Form } from 'antd';
import { IUser } from '../../models';
import { IUsersTableProps } from './types';
import { RegisteredRenderer } from './registered-renderer';
import { UserEditingForm } from './user-editing-form';

import './users-table.less';

export const UsersTable = ({ loading, users }: IUsersTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [height, setTableHeight] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const openModal = useCallback((user: IUser) => {
    setIsModalOpen(true);
    setCurrentUser(user);
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
          visible={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          destroyOnClose
        >
          <UserEditingForm user={currentUser} />
        </Modal>
      </div>
    </ResizeObserver>
  );
};

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
