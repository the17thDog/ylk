import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, message, } from 'antd'
import { useNavigate } from "react-router-dom"
import { LockOutlined, UserOutlined, IdcardOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { requireRule, passwordRule } from '@/utils/rules';
import { requestLogin, requestGetUserInfo, requestChangePassword } from '@/apis/users'
import { setUser } from '@/store/user'
import Header from '@/components/Header';

import styles from './index.module.less'

const Mode = {
  Login: 'login',
  ResetPassword: 'reset'
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [mode, setMode] = useState(Mode.Login)

  const isLogin = mode === Mode.Login

  useEffect(() => {
    form.resetFields()
  }, [mode])

  const handleLogin = async () => {
    await form.validateFields()
    const formData = form.getFieldsValue()

    await requestLogin(formData)
    const userRes = await requestGetUserInfo()

    dispatch(setUser(userRes.data))
    message.success('登陆成功')

    setTimeout(() => {
      navigate('/#/')
      window.username = formData.username
    }, 1500)
  }

  const handleSubmit = async () => {
    await form.validateFields()
    const formData = form.getFieldsValue()

    delete formData.rePassword

    await requestChangePassword(formData)

    message.success('更新密码成功')

    setMode(Mode.Login)
  }

  const onSearch = (v) => {
    if (!v) return
    console.log('v :', v);
    localStorage.setItem('url', v)

    message.success('设置成功')
  }

  return (
    <div className={styles.login_wrapper}>
      <Header hideInfo bgColor="#fff" />

      <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Input.Search placeholder="input server host" onSearch={onSearch} style={{ width: 200 }} />

        <Button type='primary' style={{ marginLeft: 10 }} onClick={() => { location.reload() }}>刷新</Button>
      </div>

      <Card
        title={isLogin ? '欢迎使用语料库' : '重置密码'}
        className={styles.cont_wrapper}
        bordered={false}
      >
        <Form
          form={form}
        >
          {mode === Mode.Login &&
            <>
              <Form.Item
                name="username"
                style={{ margin: '20px 0 36px 0' }}
                rules={[requireRule('账号不能为空')]}
              >
                <Input
                  size='large'
                  prefix={<UserOutlined className={styles.item_icon} />}
                  placeholder="请输入工号/学号"
                  maxLength={11}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[requireRule('密码不能为空')]}
              >
                <Input.Password
                  size='large'
                  prefix={<LockOutlined className={styles.item_icon} />}
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size='large'
                  style={{ marginTop: 14 }}
                  block
                  onClick={handleLogin}
                >登录</Button>
              </Form.Item>

              <Button
                type="link"
                style={{ float: 'right', color: '#bbb' }}
                onClick={() => setMode(Mode.ResetPassword)}
              >忘记密码</Button>
            </>
          }

          {mode === Mode.ResetPassword &&
            <>
              <Form.Item
                name="username"
                rules={[requireRule('账号不能为空')]}
              >
                <Input
                  size='large'
                  prefix={<UserOutlined className={styles.item_icon} />}
                  maxLength={11}
                  showCount
                  placeholder="请输入工号/学号"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[passwordRule()]}
              >
                <Input
                  size='large'
                  prefix={<LockOutlined className={styles.item_icon} />}
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item
                name="rePassword"
                rules={[
                  requireRule('确认密码不能为空'),
                  {
                    validator(_, value) {
                      if (value === '') {
                        return Promise.resolve()
                      }

                      const pwd = form.getFieldValue('password')

                      return value === pwd ? Promise.resolve() : Promise.reject()
                    },
                    message: '密码输入不一致'
                  }
                ]}
              >
                <Input
                  size='large'
                  prefix={<LockOutlined className={styles.item_icon} />}
                  placeholder="请确认密码"
                />
              </Form.Item>

              <Form.Item
                name="code"
                rules={[
                  requireRule('验证码不能为空')
                ]}
              >
                <Input
                  size='large'
                  prefix={<IdcardOutlined className={styles.item_icon} />}
                  maxLength={4}
                  showCount
                  placeholder="请输入身份证后四位"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  size='large'
                  style={{ marginTop: 14 }}
                  block
                  onClick={handleSubmit}
                >提交</Button>
              </Form.Item>

              <Button
                type="link"
                style={{ float: 'right', color: '#bbb' }}
                onClick={() => setMode(Mode.Login)}
              >返回登录</Button>
            </>
          }
        </Form>
      </Card>
    </div>
  )
}

export default Login
