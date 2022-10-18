import React from 'react';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MobileOutlined,
  GiftOutlined,
} from '@ant-design/icons';

export const UserEditingForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    form.resetFields();
  };

  return (
    <Form form={form} initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
        />
      </Form.Item>
      <Form.Item
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
          name='phone'
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input
            prefix={<PhoneOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Phone'
          />
        </Form.Item>
        <Form.Item
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
          rules={[
            { required: true, message: 'Please input your date of birth!' },
          ]}
        >
          <Input
            prefix={<GiftOutlined className='site-form-item-icon' />}
            placeholder='Date of birth'
          />
        </Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
