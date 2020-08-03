import React from 'react';
import { Form, Checkbox, Input, InputNumber, Button, Col, Row,  Alert } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { withFormik, ErrorMessage, FieldArray, Field } from 'formik';
import validationSchema from './validationSchema.js';
import { userService } from "../../services/userService";

import 'antd/dist/antd.css';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
  },
};

const RegistrationForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    status,
  } = props;

  return (
      <Row style={{ marginTop: 50 }}>
        <Col span={4} />
        <Col span={16}>
          {(status && status.isUserAdded)
              ? <div className="form-message"><Alert message="Пользователь добавлен" type="success" /></div>
              : null
          }

          <Form
              onFinish={handleSubmit}
              {...formItemLayout}
          >
            <Form.Item
                help={touched.name && errors.name ? errors.name : null}
                validateStatus={touched.name && errors.name ? "error" : "success"}
                label="Имя"
                name="name"
                hasFeedback={touched.name && values.name !== ''}
            >
              <Input
                  name="name"
                  placeholder="Имя"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
                help={touched.password && errors.password ? errors.password : null}
                validateStatus={touched.password && errors.password ? "error" : "success"}
                label="Пароль"
                name="password"
                hasFeedback={touched.password && values.password !== ''}
            >
              <Input.Password
                  type="password"
                  value={values.password}
                  placeholder="Пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
                help={touched.repeatPassword && errors.repeatPassword ? errors.repeatPassword : null}
                validateStatus={touched.repeatPassword && errors.repeatPassword ? "error" : "success"}
                label="Повторите пароль"
                name="repeatPassword"
                hasFeedback={touched.repeatPassword && values.repeatPassword !== ''}
            >
              <Input.Password
                  placeholder="Повторите пароль"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
                help={
                  touched.email && errors.email
                    ? errors.email
                    : ((status && !status.isUserAdded)
                        ? "Пользователь с таким email уже существует"
                        : null
                      )
                }
                validateStatus={
                  touched.email && errors.email
                      ? "error"
                      : ((status && !status.isUserAdded)
                          ? "error"
                          : "success"
                      )
                }

                label="E-mail"
                name="email"
                hasFeedback={touched.email && values.email !== ''}
            >
              <Input
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
                help={touched.website && errors.website ? errors.website : null}
                validateStatus={touched.website && errors.website ? "error" : "success"}
                label="Вебсайт"
                name="website"
                hasFeedback={touched.website && values.website !== ''}
            >
              <Input
                  placeholder="website.com"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
                help={touched.age && errors.age ? errors.age : null}
                validateStatus={touched.age && errors.age ? "error" : "success"}
                label="Возраст"
                name="age"
            >
              <InputNumber
                  min={0}
                  max={100}
                  type="number"
                  value={values.age}
                  onChange={value => setFieldValue('age', value)}
                  onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item {...formItemLayout}
                       label="Навыки:"
            >
            <FieldArray name="skills">
              {({ push, remove }) => (
                  <React.Fragment>
                    {values.skills &&
                    values.skills.length > 0 &&
                    values.skills.map((skill, index) => (
                        <div className="form-skill-field">
                            <Field name={`skills[${index}].skill`} >
                              {({ field }) => (
                                  <Input
                                      {...field}
                                      className="form-skill-input"
                                      name={`skills[${index}].skill`}
                                      type="text"
                                      placeholder="навык"
                                  />
                              )}
                            </Field>
                            <MinusCircleOutlined
                                className="form-skill-icon-minus"
                                onClick={() => remove(index)}
                            />
                          <ErrorMessage
                              name={`skills[${index}].skill`}
                              render={(msg) => <div className="field-error">{msg}</div>}
                          />
                        </div>
                    ))}
                    <Button type="dashed" {...formItemLayoutWithOutLabel}
                        onClick={() => push({ skill: '' })}
                        className="secondary addSkill-btn"
                    >
                      <PlusOutlined /> Добавить навык
                    </Button>
                  </React.Fragment>
              )}
            </FieldArray>
            </Form.Item>
            <Form.Item
                {...tailFormItemLayout}
                help={touched.acceptTerms && values.acceptTerms === false ? errors.acceptTerms : null}
                validateStatus={values.acceptTerms === false ? "error" : "success"}
                name="acceptTerms"
            >
              <Checkbox
                  value={values.acceptTerms}
                  onChange={handleChange}
              >Принять условия</Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={4} />
      </Row>
  )
};

const RegFormView = withFormik({
  validationSchema,
  mapPropsToValues: () => ({
    name: '',
    password: '',
    repeatPassword: '',
    email: '',
    website: '',
    age: '',
    skills: '',
    acceptTerms: false,
  }),

  handleSubmit: async (values, { setErrors, setSubmitting, setStatus }) => {
    setStatus('');

    Object.keys(values).forEach(
        (key) => (!values[key] || values[key] === '') && delete values[key]
    );

    delete values['acceptTerms'];

    await userService.createUser('/sign-up/', values)
        .then(response => {
          setStatus('');
          const status = (response.isAdded)
              ? {isUserAdded: true}
              : {isUserAdded: false};
          setStatus(status);
          setSubmitting(false);
          }, (error) => {
          setErrors(error);
          console.log('error:', error);
        });
    },
})(RegistrationForm);

export default RegFormView;
