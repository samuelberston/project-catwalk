import React from 'react';
import { mount } from 'enzyme';
import Question from './Question';
import AnswerList from './AnswerList';
import AnswerForm from './AnswerForm';

it('should exist', () => {
  const wrapper = mount(<Question test productName="test" />);
  expect(wrapper.exists()).toBe(true);
});

it('should render answers if there are any', () => {
  const wrapper = mount(<Question test productName="test" />);
  const instance = wrapper.instance();
  expect(instance.state.answers.length).toBeGreaterThan(0);
  const answers = wrapper.find(AnswerList);
  expect(answers.exists()).toBe(true);
});

it('should have a button to add more answers', () => {
  const wrapper = mount(<Question test productName="test" />);
  const addAnswer = wrapper.find('.addAnswerButton');
  expect(addAnswer.exists()).toBe(true);
});

it('should render answer form when clicking add answer button', () => {
  const wrapper = mount(<Question test productName="test" />);
  const instance = wrapper.instance();
  const addAnswerButton = wrapper.find('.addAnswerButton');
  expect(addAnswerButton.exists()).toBe(true);
  expect(instance.state.addAnswerClicked).toBe(false);
  addAnswerButton.simulate('click');
  expect(instance.state.addAnswerClicked).toBe(true);
});

it('should close the modal when clicking exit button', () => {
  const wrapper = mount(<Question test productName="test" />);
  const instance = wrapper.instance();
  const addAnswerButton = wrapper.find('.addAnswerButton');
  expect(addAnswerButton.exists()).toBe(true);
  addAnswerButton.simulate('click');
  const addAnswerForm = wrapper.find(AnswerForm);
  const exitButton = addAnswerForm.find('.exitButton');
  exitButton.simulate('click');
  expect(instance.state.addAnswerClicked).toBe(false);
});

it('should increase the helpfulness count after clicking helpful button', () => {
  const wrapper = mount(<Question test productName="test" />);
  const instance = wrapper.instance();
  expect(instance.state.increased).toBe(false);
  const oldHelpfulness = instance.state.questionHelpfulness;
  const helpfulButton = wrapper.find('.questionHelpfulButton');
  helpfulButton.simulate('click');
  expect(instance.state.questionHelpfulness - oldHelpfulness).toBe(1);
  expect(instance.state.increased).toBe(true);
});

it('should disable the helpful button after clicking', () => {
  const wrapper = mount(<Question test productName="test" />);
  const instance = wrapper.instance();
  expect(instance.state.increased).toBe(false);
  const oldHelpfulness = instance.state.questionHelpfulness;
  let helpfulButton = wrapper.find('.questionHelpfulButton');
  helpfulButton.simulate('click');
  expect(instance.state.questionHelpfulness - oldHelpfulness).toBe(1);
  expect(instance.state.increased).toBe(true);
  helpfulButton = wrapper.find('.questionHelpfulButton');
  expect(helpfulButton.props().disabled).toBe(true);
});

it('should not render any answers before fetching', () => {
  const wrapper = mount(<Question productName="test" />);
  const answers = wrapper.find(AnswerList);
  expect(answers.exists()).toBe(false);
});
