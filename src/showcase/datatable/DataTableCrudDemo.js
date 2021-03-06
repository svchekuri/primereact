import React, { Component } from 'react';
import {DataTable} from '../../components/datatable/DataTable';
import {Column} from '../../components/column/Column';
import {CarService} from '../service/CarService';
import {DataTableSubmenu} from '../../showcase/datatable/DataTableSubmenu';
import {TabView,TabPanel} from '../../components/tabview/TabView';
import AppContentContext from '../../AppContentContext';
import {Button} from "../../components/button/Button";
import {Dialog} from "../../components/dialog/Dialog";
import {InputText} from "../../components/inputtext/InputText";
import { LiveEditor } from '../liveeditor/LiveEditor';

export class DataTableCrudDemo extends Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            selectedCar: null,
            car: null,
            displayDialog: false
        };
        this.carservice = new CarService();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    onSave() {
        let cars = [...this.state.cars];
        if(this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({cars:cars, selectedCar:null, car: null, displayDialog:false});
    }

    onDelete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val,i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false});
    }

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({car: car});
    }

    onCarSelect(e){
        this.newCar = false;
        this.setState({
            displayDialog:true,
            car: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newCar = true;
        this.setState({
            car: {vin:'', year: '', brand: '', color: ''},
            displayDialog: true
        });
    }

    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars </div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button label="Delete" icon="pi pi-times" onClick={this.onDelete}/>
                <Button label="Save" icon="pi pi-check" onClick={this.onSave}/>
            </div>;

        return (
            <div>
                <DataTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable</h1>
                        <p>This samples demonstrates a CRUD implementation using various PrimeReact components.</p>

                        <AppContentContext.Consumer>
                            { context => <button onClick={() => context.onChangelogBtnClick("dataTable")} className="layout-changelog-button">{context.changelogText}</button> }
                        </AppContentContext.Consumer>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataTable value={this.state.cars} paginator={true} rows={15}  header={header} footer={footer}
                               selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect}>
                        <Column field="vin" header="Vin" sortable={true} />
                        <Column field="year" header="Year" sortable={true} />
                        <Column field="brand" header="Brand" sortable={true} />
                        <Column field="color" header="Color" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} style={{width: '300px'}} header="Car Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}
                        blockScroll={false}>
                        {
                            this.state.car &&

                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Vin</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="vin" onChange={(e) => {this.updateProperty('vin', e.target.value)}} value={this.state.car.vin}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Year</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="year" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Brand</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Color</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="color" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={this.state.car.color}/>
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>

                <DataTableCrudDoc/>

            </div>
        );
    }
}

export class DataTableCrudDoc extends Component {

    constructor(props) {
        super(props);

        this.sources = {
            'class': {
                tabName: 'Class Source',
                content: `
import React, { Component } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CarService} from '../service/CarService';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

export class DataTableCrudDemo extends Component {

    constructor() {
        super();
        this.state = {
            cars: [],
            selectedCar: null,
            car: null,
            displayDialog: false
        };
        this.carservice = new CarService();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.addNew = this.addNew.bind(this);
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    onSave() {
        let cars = [...this.state.cars];
        if(this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({cars:cars, selectedCar:null, car: null, displayDialog:false});
    }

    delete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val,i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false});
    }

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({car: car});
    }

    onCarSelect(e){
        this.newCar = false;
        this.setState({
            displayDialog:true,
            car: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newCar = true;
        this.setState({
            car: {vin:'', year: '', brand: '', color: ''},
            displayDialog: true
        });
    }

    render() {
        let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars </div>;

        let footer = <div className="p-clearfix" style={{width:'100%'}}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                <Button label="Delete" icon="pi pi-times" onClick={this.onDelete}/>
                <Button label="Save" icon="pi pi-check" onClick={this.onSave}/>
            </div>;

        return (
            <div>
                <DataTable value={this.state.cars} paginator={true} rows={15}  header={header} footer={footer}
                            selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({selectedCar: e.value})}
                            onRowSelect={this.onCarSelect}>
                    <Column field="vin" header="Vin" sortable={true} />
                    <Column field="year" header="Year" sortable={true} />
                    <Column field="brand" header="Brand" sortable={true} />
                    <Column field="color" header="Color" sortable={true} />
                </DataTable>

                <Dialog visible={this.state.displayDialog} style={{width: '300px'}} header="Car Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}
                    blockScroll={false}>
                    {
                        this.state.car &&

                        <div className="p-grid p-fluid">
                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Vin</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="vin" onChange={(e) => {this.updateProperty('vin', e.target.value)}} value={this.state.car.vin}/>
                            </div>

                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Year</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="year" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
                            </div>

                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Brand</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
                            </div>

                            <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Color</label></div>
                            <div className="p-col-8" style={{padding:'.5em'}}>
                                <InputText id="color" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={this.state.car.color}/>
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}
                `
            },
            'hooks': {
                tabName: 'Hooks Source',
                content: `
import React, { useState, useEffect } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CarService} from '../service/CarService';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

const DataTableCrudDemo = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [car, setCar] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const carservice = new CarService();
    let newCar = false;

    useEffect(() => {
        carservice.getCarsSmall().then(data => setCars(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSave = () => {
        let _cars = [...cars];
        if (newCar)
            _cars.push(car);
        else
            _cars[findSelectedCarIndex()] = car;

        setCars(cars);
        setSelectedCar(null);
        setCar(null);
        setDisplayDialog(false);
    };

    const onDelete = () => {
        let index = findSelectedCarIndex();

        setCars(cars.filter((val,i) => i !== index));
        setSelectedCar(null);
        setCar(null);
        setDisplayDialog(false);
    };

    const findSelectedCarIndex = () => {
        return cars.indexOf(selectedCar);
    };

    const updateProperty = (property, value) => {
        car[property] = value;
        setCar(car);
    }

    const onCarSelect = (e) => {
        newCar = false;

        setCar(Object.assign({}, e.data));
        setDisplayDialog(true);
    };

    const addNew = () => {
        newCar = true;

        setCar({vin:'', year: '', brand: '', color: ''});
        setDisplayDialog(true);
    };

    const header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars </div>;

    const footer = <div className="p-clearfix" style={{width:'100%'}}>
        <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={addNew}/>
    </div>;

    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={onDelete}/>
            <Button label="Save" icon="pi pi-check" onClick={onSave}/>
        </div>;

    return (
        <div>
            <DataTable value={cars} paginator={true} rows={15}  header={header} footer={footer}
                        selectionMode="single" selection={selectedCar} onSelectionChange={e => setSelectedCar(e.value)}
                        onRowSelect={onCarSelect}>
                <Column field="vin" header="Vin" sortable={true} />
                <Column field="year" header="Year" sortable={true} />
                <Column field="brand" header="Brand" sortable={true} />
                <Column field="color" header="Color" sortable={true} />
            </DataTable>

            <Dialog visible={displayDialog} style={{width: '300px'}} header="Car Details" modal={true} footer={dialogFooter} onHide={() => setDisplayDialog(false)}
                blockScroll={false}>
                {
                    car &&

                    <div className="p-grid p-fluid">
                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Vin</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="vin" onChange={(e) => {updateProperty('vin', e.target.value)}} value={car.vin}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Year</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="year" onChange={(e) => {updateProperty('year', e.target.value)}} value={car.year}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Brand</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="brand" onChange={(e) => {updateProperty('brand', e.target.value)}} value={car.brand}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Color</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="color" onChange={(e) => {updateProperty('color', e.target.value)}} value={car.color}/>
                        </div>
                    </div>
                }
            </Dialog>
        </div>
    );
}
                `
            },
            'ts': {
                tabName: 'TS Source',
                content: `
import React, { useState, useEffect } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {CarService} from '../service/CarService';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

const DataTableCrudDemo = () => {
    const [cars, setCars] = useState<any>([]);
    const [selectedCar, setSelectedCar] = useState<any>(null);
    const [car, setCar] = useState<any>(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const carservice = new CarService();
    let newCar = false;

    useEffect(() => {
        carservice.getCarsSmall().then(data => setCars(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSave = () => {
        let _cars: any = [...cars];
        if (newCar)
            _cars.push(car);
        else
            _cars[findSelectedCarIndex()] = car;

        setCars(cars);
        setSelectedCar(null);
        setCar(null);
        setDisplayDialog(false);
    };

    const onDelete = () => {
        let index = findSelectedCarIndex();

        setCars(cars.filter((val: any, i: number) => i !== index));
        setSelectedCar(null);
        setCar(null);
        setDisplayDialog(false);
    };

    const findSelectedCarIndex = () => {
        return cars.indexOf(selectedCar);
    };

    const updateProperty = (property: any, value: any) => {
        car[property] = value;
        setCar(car);
    }

    const onCarSelect = (e: any) => {
        newCar = false;

        setCar(Object.assign({}, e.data));
        setDisplayDialog(true);
    };

    const addNew = () => {
        newCar = true;

        setCar({vin:'', year: '', brand: '', color: ''});
        setDisplayDialog(true);
    };

    const header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars </div>;

    const footer = <div className="p-clearfix" style={{width:'100%'}}>
        <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={addNew}/>
    </div>;

    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={onDelete}/>
            <Button label="Save" icon="pi pi-check" onClick={onSave}/>
        </div>;

    return (
        <div>
            <DataTable value={cars} paginator={true} rows={15}  header={header} footer={footer}
                        selectionMode="single" selection={selectedCar} onSelectionChange={e => setSelectedCar(e.value)}
                        onRowSelect={onCarSelect}>
                <Column field="vin" header="Vin" sortable={true} />
                <Column field="year" header="Year" sortable={true} />
                <Column field="brand" header="Brand" sortable={true} />
                <Column field="color" header="Color" sortable={true} />
            </DataTable>

            <Dialog visible={displayDialog} style={{width: '300px'}} header="Car Details" modal={true} footer={dialogFooter} onHide={() => setDisplayDialog(false)}
                blockScroll={false}>
                {
                    car &&

                    <div className="p-grid p-fluid">
                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Vin</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="vin" onChange={(e) => {updateProperty('vin', (e.target as HTMLInputElement).value)}} value={car.vin}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Year</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="year" onChange={(e) => {updateProperty('year', (e.target as HTMLInputElement).value)}} value={car.year}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Brand</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="brand" onChange={(e) => {updateProperty('brand', (e.target as HTMLInputElement).value)}} value={car.brand}/>
                        </div>

                        <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Color</label></div>
                        <div className="p-col-8" style={{padding:'.5em'}}>
                            <InputText id="color" onChange={(e) => {updateProperty('color', (e.target as HTMLInputElement).value)}} value={car.color}/>
                        </div>
                    </div>
                }
            </Dialog>
        </div>
    );
}

                `
            }
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className="content-section documentation">
                <TabView>
                    {
                        this.sources && Object.entries(this.sources).map(([key, value], index) => {
                            return (
                                <TabPanel key={`source_${index}`} header={value.tabName} contentClassName="source-content">
                                    <LiveEditor name="DataTableCrudDemo" sources={[key, value]} service="CarService" data="cars-small" />
                                </TabPanel>
                            );
                        })
                    }
                </TabView>
            </div>
        )
    }
}
