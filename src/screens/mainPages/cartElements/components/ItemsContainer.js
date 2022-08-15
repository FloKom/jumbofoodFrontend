import React, {Component} from 'react';
import {View} from 'react-native';
import Item from './Item';

class ItemsContainer extends Component {
  render() {
    return (
      <View style={styles.containterStyle}>
        <Item data={this.props.data} setData={this.props.setData} setTotal={this.props.setTotal}/>
      </View>
    );
  }
}

const styles = {
  containterStyle: {
    flex: 3,
  },
};

export default ItemsContainer;
