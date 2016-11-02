import React, { Component, PropTypes } from 'react';
import AsyncValidator from 'async-validator';

class EleReactFormItem extends Component {
  static displayName = 'EleReactFormItem';
  static propTypes = {
    $$joinForm: PropTypes.func,
    $$getFormRules: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.string,
    rules: PropTypes.object
  };
  constructor(props) {
    super(props);
    const { $$joinForm } = props;
    if ($$joinForm) {
      $$joinForm(this);
    }
    this.state = {
      isValidating: false,
      error: ''
    };
  }
  setFieldValue = (v) => {
    this.fieldValue = v;
  };
  getRules = (trigger) => {
    const { rules, name, $$getFormRules } = this.props;
    let formRules;
    if (!rules || (rules && !rules.length)) {
      if ($$getFormRules) {
        if (!name) throw new Error('you around with form , but can not find name for this');
        formRules = $$getFormRules(name);
      }
    }
    return [].concat(rules || formRules || []).filter(
      rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
    );
  };
  validHandle = (trigger, cb) => {
    const $this = this;
    const rules = this.getRules(trigger);
    if (!rules || rules.length === 0) {
      return;
    }
    const { name } = this.props;
    this.setState({ isValidating: true });
    const descriptor = {};
    descriptor[name] = rules;
    const validator = new AsyncValidator(descriptor);
    const data = {};
    data[name] = this.fieldValue;
    validator.validate(data, { firstFields: true }, (errors) => {
      $this.setState({ error: errors ? errors[0].message : '' });
      if (cb && typeof cb === 'function') cb();
      $this.setState({ validating: false });
    });
  };
  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }
      return React.cloneElement(child, {
        $$sendValueToParent: this.setFieldValue,
        $$validHandle: this.validHandle
      });
    });
  };
  render() {
    const children = this.renderChildren();
    return (
      <div>我是formItem{children}</div>
    );
  }
}

export default EleReactFormItem;
