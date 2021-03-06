import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import GaugeChart from "react-gauge-chart";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSnowflake,
  faSun,
  faFan,
  faTint
} from "@fortawesome/free-solid-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faAirFreshener,
  faSync,
  faRocket
} from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";

const { StateRequest, StateReply, Void } = require("./klima_pb.js");
const { AirConditionerClient } = require("./klima_grpc_web_pb.js");
//import './App.css';

class ModeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.modeChanged(val);
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <ToggleButtonGroup
          type="radio"
          name="mode"
          value={value}
          onChange={this.handleChange}
          className="bg-secondary w-100"
        >
          <ToggleButton value={0}>
            <FontAwesomeIcon icon={faSnowflake} />
            <br />
            COOL
          </ToggleButton>
          <ToggleButton value={1}>
            <FontAwesomeIcon icon={faSun} />
            <br />
            HEAT
          </ToggleButton>
          <ToggleButton value={2}>
            <FontAwesomeIcon icon={faFan} />
            <br />
            FAN
          </ToggleButton>
          <ToggleButton value={3}>
            <FontAwesomeIcon icon={faTint} />
            <br />
            DRY
          </ToggleButton>
        </ToggleButtonGroup>
        <p className="text-white bg-secondary rounded-bottom w-100 text-center">
          Mode
        </p>
      </div>
    );
  }
}

class TemperatureController extends React.Component {
  constructor(props) {
    super(props);
    const temp = props.temperature;
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
  }

  handleIncrease() {
    this.props.incrTemperature();
  }

  handleDecrease() {
    this.props.decrTemperature();
  }

  render() {
    const levels = this.props.maxTemperature - this.props.minTemperature;
    const minTemp = this.props.minTemperature;
    const percent =
      (this.props.temperature - this.props.minTemperature) / levels;
    const temp = this.props.temperature;
    console.log(percent);
    return (
      <Container className="bg-secondary rounded">
        <Row className="border border-primary rounded-top bg-light">
          <Col xs={{ span: 8, offset: 2 }} className="bg-light">
            <GaugeChart
              id="temp-gauge"
              nrOfLevels={levels}
              percent={percent}
              hideText={true}
              colors={["rgb(0,0,255)", "rgb(255,0,0)"]}
              cornerRadius={2}
              animDelay={0}
              className={"bg-light"}
            />
          </Col>
        </Row>
        <Row className="align-items-center bg-primary">
          <Col xs={{ offset: 1, span: 3 }} className="text-center">
            <Button
              variant="secondary"
              className="d-inline my-1"
              onClick={this.handleDecrease}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Col>
          <Col xs={4}>
            <p className="text-white text-center h5">{temp} ºC</p>
          </Col>
          <Col xs={3} className="text-center">
            <Button
              variant="secondary"
              className="d-inline my-1"
              onClick={this.handleIncrease}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
        <p className="text-white bg-secondary rounded-bottom w-100 text-center">
          Temperature
        </p>
      </Container>
    );
  }
}

class FanSpeedSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.speedChanged(val);
  }

  render() {
    const value = this.props.value;
    return (
      <div className="rounded">
        <ToggleButtonGroup
          type="radio"
          name="speed"
          value={value}
          onChange={this.handleChange}
          className="bg-secondary rounded-top w-100"
        >
          <ToggleButton value={0}>LOW</ToggleButton>
          <ToggleButton value={1}>MID</ToggleButton>
          <ToggleButton value={2}>HIGH</ToggleButton>
          <ToggleButton value={3}>AUTO</ToggleButton>
        </ToggleButtonGroup>
        <p className="text-white bg-secondary rounded-bottom w-100 text-center">
          Fan speed
        </p>
      </div>
    );
  }
}

class OptionsToggler extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.optionsChanged(val);
  }

  render() {
    const options = this.props.options;
    return (
      <div className="rounded">
        <ToggleButtonGroup
          type="checkbox"
          value={options}
          onChange={this.handleChange}
          className="bg-secondary rounded-top w-100"
        >
          <ToggleButton value={1}>
            <FontAwesomeIcon icon={faAirFreshener} />
            <br />
            Ionize
          </ToggleButton>
          <ToggleButton value={2}>
            <FontAwesomeIcon icon={faSync} />
            <br />
            Swing
          </ToggleButton>
          <ToggleButton value={3}>
            <FontAwesomeIcon icon={faRocket} />
            <br />
            Turbo
          </ToggleButton>
        </ToggleButtonGroup>
        <p className="text-white bg-secondary rounded-bottom w-100 text-center">
          Options
        </p>
      </div>
    );
  }
}

class PowerToggler extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(val) {
    this.props.powerChanged(val.length > 0);
  }

  render() {
    const power = this.props.power;
    const options = power ? [1] : [];
    return (
      <div className="rounded">
        <ToggleButtonGroup
          type="checkbox"
          value={options}
          onChange={this.handleChange}
          className="bg-secondary rounded-top w-100"
        >
          <ToggleButton value={1} variant={power ? "danger" : "success"}>
            <FontAwesomeIcon icon={faPowerOff} />
            <br />
            {power ? "Turn off" : "Turn on"}
          </ToggleButton>
        </ToggleButtonGroup>
        <p className="text-white bg-secondary rounded-bottom w-100 text-center">
          Power
        </p>
      </div>
    );
  }
}

class Remote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      speed: 1,
      minTemperature: 18,
      maxTemperature: 30,
      temperature: 22,
      options: [1, 2],
      power: true
    };
    this.modeChanged = this.modeChanged.bind(this);
    this.speedChanged = this.speedChanged.bind(this);
    this.incrTemp = this.incrTemp.bind(this);
    this.decrTemp = this.decrTemp.bind(this);
    this.optionsChanged = this.optionsChanged.bind(this);
    this.powerChanged = this.powerChanged.bind(this);
    this.requestFromComponentState = this.requestFromComponentState.bind(this);
    this.tryChangeState = this.tryChangeState.bind(this);
    this.reflectResponse = this.reflectResponse.bind(this);
  }

  componentDidMount(){
      var request = new Void();
      this.props.client.getState(request, {}, (err, response)=>{
          if(response){
              this.reflectResponse(response);
          }
      });
  }

  requestFromComponentState(){
      var request = new StateRequest();

      request.setTemperature(this.state.temperature);
      request.setMode(this.state.mode);
      request.setSpeed(this.state.speed);
      request.setIonizer(this.state.options.indexOf(1) >= 0);
      request.setSwing(this.state.options.indexOf(2) >= 0);
      request.setTurbo(this.state.options.indexOf(3) >= 0);
      console.log(this.state.options.indexOf(3) > 0, this.state.options.indexOf(1) > 0);
      request.setPower(this.state.power);
      console.log(this.state.power);
      console.log(request);
      // this.props.client.setState(request, {}, (err, response) => console.log(err));
      return request;

  }

  reflectResponse(response){
      var options = [];
      if(response.getIonizer())
          options.push(1);
      if(response.getSwing())
          options.push(2);
      if(response.getTurbo())
          options.push(3);
      console.log(response);

      this.setState({mode: response.getMode()});
      this.setState({temperature: response.getTemperature()});
      this.setState({minTemperature: response.getMintemperature()});
      this.setState({maxTemperature: response.getMaxtemperature()});
      this.setState({power: response.getPower()});
      this.setState({speed: response.getSpeed()});
      this.setState({options: options});
  }

  tryChangeState(request){
      this.props.client.setState(request, {}, (err, response) => {
          if(err){
              console.log(err);
          } else {
              this.reflectResponse(response);
          }
      });
  }

  modeChanged(val) {
      var request = this.requestFromComponentState();
      request.setMode(val);
      this.tryChangeState(request);
    // this.setState({ mode: val });
  }

  speedChanged(val) {
      var request = this.requestFromComponentState();
      request.setSpeed(val);
      this.tryChangeState(request);
    // this.setState({ speed: val });
  }

  incrTemp() {
    const temp = this.state.temperature;
    const maxTemp = this.state.maxTemperature;
      var request = this.requestFromComponentState();
      request.setTemperature(Math.min(temp + 1, maxTemp));
      this.tryChangeState(request);
    // this.setState({ temperature: Math.min(temp + 1, maxTemp) });
  }

  decrTemp() {
    const temp = this.state.temperature;
    const minTemp = this.state.minTemperature;
      var request = this.requestFromComponentState();
      request.setTemperature(Math.max(temp - 1, minTemp));
      this.tryChangeState(request);
    // this.setState({ temperature: Math.max(temp - 1, minTemp) });
  }

  optionsChanged(options) {
      var request = this.requestFromComponentState();
      request.setIonizer(options.indexOf(1) >= 0);
      request.setSwing(options.indexOf(2) >= 0);
      request.setTurbo(options.indexOf(3) >= 0);
      this.tryChangeState(request);
    // this.setState({ options: options });
  }

  powerChanged(value) {
      var request = this.requestFromComponentState();
      request.setPower(value);
      this.tryChangeState(request);
    // this.setState({ power: value });
  }

  render() {
    const modeValue = this.state.mode;
    const speedValue = this.state.speed;
    const temp = this.state.temperature;
    const minTemp = this.state.minTemperature;
    const maxTemp = this.state.maxTemperature;
    const options = this.state.options;
    const power = this.state.power;
    return (
      <div>
        <ModeSelector modeChanged={this.modeChanged} value={modeValue} />
        <TemperatureController
          minTemperature={minTemp}
          maxTemperature={maxTemp}
          temperature={temp}
          incrTemperature={this.incrTemp}
          decrTemperature={this.decrTemp}
        />
        <FanSpeedSelector speedChanged={this.speedChanged} value={speedValue} />
        <OptionsToggler
          options={options}
          optionsChanged={this.optionsChanged}
        />
        <PowerToggler power={power} powerChanged={this.powerChanged} />
      </div>
    );
  }
}

function App() {
  var client = new AirConditionerClient('http://localhost:8080');
  return <Remote client={client} />;
}

export default App;
