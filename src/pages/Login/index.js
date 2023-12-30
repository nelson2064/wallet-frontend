// Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, message, Row } from "antd";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import './index.css'
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import './index.css'; // Import the global styles

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());

      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className=" login-bg body-animation flex items-center justify-center h-screen">
      <div className="login-card w-400 p-2" style={{ marginTop: "100px", textAlign: "center" }}>
        <div className="flex items-center justify-between">
          <h1 className="login-title">SHEYWALLET - LOGIN</h1>
        </div>
        <hr />
        <Form className="login-form" layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <input className="login-input" type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input className="login-input" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <button className="login-btn w-100" type="submit">
            Login
          </button>
          <h1
            className="login-register-link mt-2"
            onClick={() => navigate("/register")}
          >
            Not a member, Click Here To Register
          </h1>
        </Form>
      </div>
    </div>
  );
}

export default Login;
