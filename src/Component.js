
import React, { Component } from 'react'

import {
  isObservable,
  objectMap,
} from './utils'

const ReactRxProps = (childElement) => {

  class ReactRxPropsClass extends Component {

    constructor (props) {
      super(props)
      this.state = objectMap(props, (key, value) => !isObservable(value))
    }

    componentWillMount () {
      this.subscribe(this.props)
    }

    componentWillReceiveProps (nextProps) {
      this.subscribe(nextProps)
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    setStateObserverValue (name, value) {
      const stateObject = {}
      stateObject[name] = value
      this.setState(stateObject)
    }

    addPropListener (name, prop$) {
      return prop$.subscribeOnNext((value) => {
        if (!(value === this.state[name])) this.setStateObserverValue(name, value)
      })
    }

    addSubscription (key, value) {
      if (isObservable(value)) this.subscriptions.push(this.addPropListener(key, value))
    }

    unsubscribe () {
      this.subscriptions.forEach(subscription => subscription.dispose())
      this.subscriptions = null
    }

    subscribe (props) {
      if (this.subscriptions) this.unsubscribe()
      this.subscriptions = []
      Object.keys(props).forEach(key => this.addSubscription(key, props[key]))
    }

    render () {
      return React.createElement(
        childElement,
        this.state
      )
    }
  }

  return ReactRxPropsClass
}

export default ReactRxProps
