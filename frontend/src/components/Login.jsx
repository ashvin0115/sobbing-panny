import React, { useState } from 'react';
import { Form, Input, Layout, Card, Row, Col, Avatar, Button } from 'antd';
import '../App.css';

const { Content } = Layout;

const Login = () => {
  const [username, setUsername] = useState(0);
  return (
    <Layout style={{ paddingTop: 100, minHeight: '100vh' }}>
      <Content>
        <Row justify="center" type="flex">
          <Col>
            <Card className="login--card">
              <Avatar size={64} icon="user" />
              <Form
                style={{ marginTop: 32 }}
                onSubmit={e => {
                  // Query '{"user": this.state.username}'
                  e.preventDefault();
                  console.log("??");
                  fetch("https://cors-anywhere.herokuapp.com/https://sobbing-rabbits.herokuapp.com/login",
                  {
                    method: 'post',
                    headers:{
                      "X-Requested-With": "XMLHttpRequest"
                    },
                    body: {'user': username}
                  })
                  .then(function(result){
                    console.log("!!!");
                    console.log(result);
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('authtoken', result);
                    window.location.reload();
                  })
                  .catch((error) => console.log(error));
                }}
              >
                <Form.Item >
                  <Input placeholder="Login" onChange={(e) => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Password" type="password"/>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
