import React, { Component } from 'react';
import styles from './SubComponent.module.scss';

class _SubComponent extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.title}>About page</h1>
        <img className={styles.reactLogo} src="/images/react-logo.svg" alt="" />
        <div>  sdgh</div>
        <span>sdgsg</span>
        bwhahahha
      </div>
    );
  }
}

export const SubComponent = _SubComponent;
