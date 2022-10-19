import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const dateFormat = 'DD.MM.YYYY';

import { IUser } from '../../models';

interface UserEditingFormProps {
  user: IUser;
  onSave: (values: any) => void;
}

export const UserEditingForm = ({ user, onSave }: UserEditingFormProps) => {
  const onFinish = (values: any) => {
    onSave(values);
  };

  return (
    <Form
      initialValues={{
        name: user.login.username,
        email: user.email,
        phone: user.phone,
        cell: user.cell,
        dob: moment(user.dob.date),
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        label='Name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
        />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          placeholder='Email'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input
            prefix={<PhoneOutlined className='site-form-item-icon' />}
            placeholder='Phone'
          />
        </Form.Item>
        <Form.Item
          label='Cell'
          name='cell'
          rules={[{ required: true, message: 'Please input your cell!' }]}
        >
          <Input
            prefix={<MobileOutlined className='site-form-item-icon' />}
            placeholder='Cell'
          />
        </Form.Item>
        <Form.Item
          name='dob'
          label='Date of birth'
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: 'Please select your date of birth!',
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
