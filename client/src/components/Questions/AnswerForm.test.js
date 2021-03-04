import React from 'react';
import { mount } from 'enzyme';
import AnswerForm from './AnswerForm';

it('should exist', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  expect(wrapper.exists()).toBe(true);
});

it('should have an answer field, a nickname field, an email field, photo fields, and a submit button', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  const answerField = wrapper.find('.answerField');
  expect(answerField.exists()).toBe(true);
  const nicknameField = wrapper.find('.answerNickname');
  expect(nicknameField.exists()).toBe(true);
  const emailField = wrapper.find('.answerEmail');
  expect(emailField.exists()).toBe(true);
  const photos = wrapper.find('.uploadPhoto');
  expect(photos.exists()).toBe(true);
  const submitAnswer = wrapper.find('.submitAnswer');
  expect(submitAnswer.exists()).toBe(true);
});

it('should change answer, nickname, and email state when typing into respective fields', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  const instance = wrapper.instance();
  const answerField = wrapper.find('.answerField');
  const nicknameField = wrapper.find('.answerNickname');
  const emailField = wrapper.find('.answerEmail');
  answerField.simulate('change', { target: { value: 'Yes' } });
  expect(instance.state.answerBody).toBe('Yes');
  nicknameField.simulate('change', { target: { value: 'Nick' } });
  expect(instance.state.nickname).toBe('Nick');
  emailField.simulate('change', { target: { value: 'example@example.com' } });
  expect(instance.state.email).toBe('example@example.com');
});

it('should have isValidEmail return true on a valid email', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  const instance = wrapper.instance();
  const emailField = wrapper.find('.answerEmail');
  emailField.simulate('change', { target: { value: 'example@example.com' } });
  expect(instance.isValidEmail()).toBe(true);
});

it('should have isValidEmail return false on an invalid email', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  const instance = wrapper.instance();
  const emailField = wrapper.find('.answerEmail');
  emailField.simulate('change', { target: { value: 'badEmail' } });
  expect(instance.isValidEmail()).toBe(false);
});

it('should show an error message if answer body is empty', () => {
  const wrapper = mount(<AnswerForm exitAnswerForm={() => true} questionBody="test" />);
  const instance = wrapper.instance();
  const nicknameField = wrapper.find('.answerNickname');
  const emailField = wrapper.find('.answerEmail');
  nicknameField.simulate('change', { target: { value: 'Nick' } });
  emailField.simulate('change', { target: { value: 'example@example.com' } });
  const submitButton = wrapper.find('.submitAnswer');
  submitButton.simulate('click');
  expect(instance.state.submitError).toBe(true);
  expect(instance.state.errorMessages[0]).toContain('Answer');
});
