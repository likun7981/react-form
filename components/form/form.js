import React, { Component, PropTypes } from 'react';

class EleReactForm extends Component {
  static displayName = 'EleReactForm';
  static propTypes = {
    children: PropTypes.node,
    rules: PropTypes.obeject
  };
  componentDidMount() {}
  fields = [];
  $$addFields = (field) => {
    this.fields.push(field);
  };
  $$getRules = name => this.props.rules[name];
  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return React.cloneElement(child);
      }
      if (child.type.displayName === 'EleReactFormItem') {
        return React.cloneElement(child, {
          $$joinForm: this.$$addFields,
          $$getFormRules: this.$$getRules
        });
      }
      return React.cloneElement(child);
    });
  };
  render() {
    const children = this.renderChildren();
    return (
      <form noValidate>
        {children}
      </form>
    );
  }
}

export default EleReactForm;
