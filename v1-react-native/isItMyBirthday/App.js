/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, Modal, Platform, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: null,
      datePickerVisible: false,
      resultModalVisible: false,
    }
  }

  hideResultModal = () => {
    this.setState({
      resultModalVisible: false,
    })
  }

  showDatePicker = () => {
    this.setState({
      datePickerVisible: true,
    });
  }

  showResultModal = () => {
    this.setState({
      resultModalVisible: true,
    })
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      date,
      datePickerVisible: Platform.OS === 'ios' ? true : false,
    });
  }

  doesBirthdayMatch = () => {
    const currentDate = new Date();
    if (!this.state.date) {
      return false;
    }

    return currentDate.getMonth() === this.state.date.getMonth() && currentDate.getDate() === this.state.date.getDate();
  }

  render() {

    const body_text = this.state.date ? "Tap again to change" : "Press to enter your birthday";
    const date_text = this.state.date ? `Your brithday is: ${this.state.date.getMonth() + 1}/${this.state.date.getDate()}/${this.state.date.getFullYear()}`: ''

    const modal_header = this.doesBirthdayMatch() ? 'Happy Birthday!' : 'Happy NOT Birthday!';
    const modal_subheader = this.doesBirthdayMatch() ? 'You should celebrate, it\'s your birthday!' : 'Try again tommorow, because today is not your birthday.';

    return (
      <View style={ styles.main_view }>
        <View style={ styles.header_box }>
          <Text style={ styles.header_text }>Is it your birthday?</Text>
          <Text style={ styles.sub_header_text }>Lets find out!</Text>
        </View>
        <View style={ styles.content_box }>
          <View style={ styles.custom_button }>
            <Text style={ styles.custom_button_text } onPress={ this.showDatePicker }>{ body_text }</Text>
          </View>
          <Text style={ styles.date_text }>{ date_text }</Text>
        </View> 
        <View style={ styles.button_box }>
          { this.state.date && 
            <View style={ styles.custom_button }>
              <Text style={ styles.custom_button_text } onPress={ this.showResultModal }>Is it your birthday?!</Text>
            </View>
          }
        </View>
        { 
          this.state.datePickerVisible && 
          <DateTimePicker 
            value={ new Date() }
            mode='date'
            display='default'
            onChange={ this.setDate }
          />
        }
        <Modal
          animationType="slide"
          visible={ this.state.resultModalVisible }
          transparent={ false } 
        >
          <View style={ styles.main_view }>
            <View style={ styles.header_box }>
              <Text style={ styles.header_text }>{ modal_header }</Text>
                <Text style={ styles.sub_header_text }>{ modal_subheader }</Text>
            </View>
            <View style={ styles.button_box }>
              <View style={ styles.custom_button }>
                <Text style={ styles.custom_button_text } onPress={ this.hideResultModal }>Check another birthday</Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  main_view: {
    display: "flex",
    backgroundColor: '#444444',
    height: '100%',
    width: '100%',
  },
  header_box: {
    display: 'flex',
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: "2%",
  },
  header_text: {
    fontSize: 30,
    color: '#fffdd0',
  },
  sub_header_text: {
    fontSize: 23,
    color: '#eeecc0',
    textAlign: "center",
  },
  content_box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  custom_button: {
    backgroundColor: '#555555',
    borderColor: '#dddddd',
    borderWidth: 1,
    borderRadius: 50,
  },
  custom_button_text: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: '#d0ffd0',
    fontSize: 20,
  },
  date_text: {
    color: '#fffdd0',
    marginVertical: 10,
    fontSize: 20,
  },
  button_box: {
    marginVertical: 20,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },

});

export default App;
