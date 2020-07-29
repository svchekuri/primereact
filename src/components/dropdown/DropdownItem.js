import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {tip} from "../tooltip/Tooltip";

export class DropdownItem extends Component {

    static defaultProps = {
        option: null,
        label: null,
        template: null,
        selected: false,
        disabled: false,
        onClick: null
    };

    static propTypes = {
        option: PropTypes.any,
        label: PropTypes.any,
        template: PropTypes.func,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        if (this.props.option.tooltip) {
            this.renderTooltip();
        }
    }

    renderTooltip() {
        this.tooltip = tip({
            target: this.container,
            content: this.props.option.tooltip,
            options: { position: "bottom" }, // Todo this option should be configurable using this.props.option.tooltipOptions
            className: this.props.option.className
        });
    }

    onClick(event) {
        if(this.props.onClick) {
            this.props.onClick({
                originalEvent: event,
                option: this.props.option
            })
        }
    }

    render() {
        let className = classNames(this.props.option.className, 'p-dropdown-item', {
            'p-highlight': this.props.selected,
            'p-disabled': this.props.disabled,
            'p-dropdown-item-empty': (!this.props.label || this.props.label.length === 0)
        });
        let content = this.props.template ? this.props.template(this.props.option) : this.props.label;

        return (
            <li ref={el => (this.container = el)} className={className} onClick={this.onClick} aria-label={this.props.label} key={this.props.label} role="option" aria-selected={this.props.selected}>
                {content}
            </li>
        );
    }
}

