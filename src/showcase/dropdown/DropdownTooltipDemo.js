import React, { Component } from 'react';
import { Dropdown } from '../../components/dropdown/Dropdown';

import './styles.css';

export default class DropdownTooltipDemo extends Component {

    constructor() {
        super();
        this.state = {
            media: ''
        };

        this.mediaList = [
            {
                id: 1,
                label: 'Stamps',
                value: 'netStamps',
                state: 'enabled',
                tooltip: '<strong>NetStamps Labels</strong><br>Use NetStamps labels when all you need is postage. They work just like regular '
                + 'stamps with no date or address restrictions and can be used when sending First-Class '
                + 'Mail postcards, envelopes, and large envelopes to any U.S. or international destination.',
                icon: 'icon_ns',
                className: 'testClass'
            },
            {
                id: 2,
                label: 'Shipping Label - 8 x 11 Paper',
                value: 'shippingLabel812x11',
                state: 'enabled',
                tooltip: '<strong>8 &frac12;&rdquo; x 11&rdquo; Paper</strong><br>Use any letter-size sheet of plain paper to print up to two 4&rdquo; x 6&rdquo; '
                    + 'shipping labels, including addresses, tracking barcode, and customs form.'
                    + '<br><br>Can be used to ship Large Envelopes, Packages, USPS Flat Rate Envelopes or Boxes, or '
                    + 'USPS Regional Rate Boxes to any U.S. or international destination.',
                icon: 'icon_shipping_label'
            },
            {
                id: 3,
                label: 'Roll - 4 x 6 Shipping Label',
                value: 'roll418x614',
                state: 'enabled',
                tooltip: '<strong>4 &#8539;&rdquo; x 6 &#188;&rdquo; Shipping Label Roll</strong><br>Use these 4&#8539;&rdquo; x 6&frac14;&rdquo; thermal label rolls to print addresses, '
                + 'tracking barcode, and customs form.<br><br>Can be used to ship Large Envelopes, '
                + 'Packages, USPS Flat Rate Envelopes or Boxes, or USPS Regional Rate Boxes to any '
                + 'U.S. or international destination.<br><br>Compatible Printers:<br>Dymo 4XL, '
                + 'most Zebra/Eltron models and Samsung Bixolon SRP 770II.',
                icon: 'icon_roll'
            },
            {
                id: -1,
                label: 'Manage Print On Options...',
                value: 'manageOptions',
                state: 'enabled',
                tooltip: 'Manage which options should be shown in the Print On List'
            }
        ];

        this.shipFromContacts =  [{
            id: 1,
            label: 'Test User - EL SEGUNDO, CA',
            value: 'ship1',
            tooltip: '<strong>Ship From Address:</strong><div>Sdc</div><div>1990 e grand ave</div><div>el segundo, ca, 90245</div><br/><strong>Return Address:</strong><div>Sdc</div><div>1990 e grand ave</div><div>el segundo, ca, 90245</div>'
        },
        {
            id: 2,
            label: 'John Doe - torrance, CA',
            value: 'ship2',
            tooltip: '<strong>Ship From Address:</strong><div>Sdc</div><div>1990 e grand ave</div><div>el segundo, ca, 90245</div><br/><strong>Return Address:</strong><div>Sdc</div><div>1990 e grand ave</div><div>torrance, ca, 90245</div>'
        },
        {
            id: 3,
            label: 'Manage Shipping Addresses...',
            value: 'ship2',
            tooltip: 'Add, edit or delete Mailing addresses.'
        }
        ];

        this.onMediaChange = this.onMediaChange.bind(this);
    }

    onMediaChange(e) {
        this.setState({ media: e.value });
    }

    itemTemplate(option) {
        if (!option.value) {
            return option.label;
        }
        else {
            return (
                <span className={option.icon}>{option.label}</span>
            );
        }
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <div className="content-section implementation">
                    Print On:&nbsp;<Dropdown value={this.state.media} options={this.mediaList} onChange={this.onMediaChange} itemTemplate={this.itemTemplate} placeholder="Select a Media" style={{ width: '20em' }} /> // dropdown items with tooltip
                </div>
                <br/>
                <div className="content-section implementation">
                    Mail From:&nbsp;<Dropdown value={this.state.shipFrom} options={this.shipFromContacts} style={{ width: '20em' }} /> // dropdown items with image and tooltip
                </div>
            </div>
        );
    }
}
