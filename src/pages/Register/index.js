import React from "react";
import { Col, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import "./index.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log("all values ", values);
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <h1 className="register-title">SHEYWALLET - REGISTER</h1>
        <h1 onClick={() => navigate("/login")}>Already a member? Log in</h1>
        <hr />

        <Form className="register-form" layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item label="First Name" name="firstName">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Last Name" name="lastName">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Mobile" name="phoneNumber">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Identification Type" name="identificationType">
                <select className="register-input">
                  <option value="NATIONAL ID">National ID</option>
                  <option value="PASSPORT">Passport</option>
                  <option value="DRIVING LICENSE">Driving License</option>
                  <option value="SOCIAL CARD">Social Security Card (SSN)</option>
                </select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Identification Number" name="identificationNumber">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Address" name="address">
                <input className="register-input" type="text" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Password" name="password">
                <input className="register-input" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Confirm Password" name="confirmPassword">
                <input className="register-input" type="password" />
              </Form.Item>
            </Col>
          </Row>

          <div>
            <button className="register-btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
