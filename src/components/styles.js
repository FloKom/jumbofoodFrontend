/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { StyleSheet, View, Text, Pressable, Modal, Alert } from 'react-native';
// import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
// import Constants from 'expo-constants';

// const StatusBarHeight = Constants.StatusBarHeight;
//colors
export const Colors = {
  primary: '#f7ffff',
  secondary: '#34BE82',
  tertiary: '#EAF6F9',
  darkLight: '#9CA3AF',
};

const { primary, secondary, tertiary, darkLight } = Colors;

//Signup and login screens begin
export const StyledContainer = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${primary};
  ${props =>
    props.styledcontainerbecomesupplier === true &&
    `
    
`}
`;
export const InnerContainer = styled.View`
     flex: 1;
     width: 100%
     align-items: center;
`;

export const PageLogo = styled.Image`
  width: 180px;
  margin-top: 60px;
  margin-left: 20px;
  height: 65px;
`;

export const PageLogoSpe = styled.Image`
  width: 100px;
  margin-top: 45px;
  margin-right: 240px;
  height: 35px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: black;
  padding: 30px;

  ${props =>
    props.home &&
    `
    font-size: 35px;
    
`}
${props =>
  props.stack &&
  `
  margin-bottom: -7px;
  font-size: 25px;
  padding: 0px;
  margin-top: 0px;
`}
`;

export const SubTitle = styled.Text`
    font-size: 30px;
    margin-bottom: 25px;
    letter-spacing: 1px
    text-align: center;
    font-weight: bold;
    color: ${secondary}
    padding: 10px;
    margin-top: 30px;

    ${props =>
    props.home &&
    `
    font-weight: normal;
    margin-bottom: 5px;
    font-size: 20px;
    padding: 0px;
    margin-top: 0px;
`}
${props =>
    props.becomesupplier === true &&
    `
margin-bottom: 20px;
padding: 25px;
margin-top: 0px;
color: black;
text-align: left;
`}

${props =>
    props.mainpagesub === true &&
    `
margin-bottom: -30px;
padding: 0px;
margin-top: 20px;
font-size: 20px;
color: black;
margin-right: auto;
font-weight: bold;
letter-spacing: 0px
`}
${props =>
    props.mainpagesubspe === true &&
    `

font-size: 20px;
color: black;
font-weight: bold;
letter-spacing: 0px
`}
`;

export const StyledFormArea = styled.View`
  width: 97%;
  ${props =>
    props.becomesupplierformarea === true &&
    `
    width: 100%;
  `}
`;
export const StyledTextInput = styled.TextInput`
  background-color: #eaf6f9;
  padding: 15px;
  padding-left: 59px;
  padding-right: 55px;
  border-radius: 20px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${darkLight};
  ${props =>
    props.maintextinput === true &&
    `
    width: 100%;
    height: 40px;
    padding: 0px;
    padding-left: 25px;
    padding-right: 45px;
    margin-vertical: 0px;
  `}
  ${props =>
    props.textfield === true &&
    `
    padding: 0px;
    width: 100%;
    height: auto;
    min-height: 60px;
    padding: 0px;
    padding-left: 55px;
    padding-right: 35px;
    margin-vertical: 0px;
  `}
`;

export const StyledInputLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-left: 5px;
  text-align: left;
  color: ${secondary};
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 39px;
  position: absolute;
  z-index: 1;
  ${props =>
    props.call === true &&
    `
    left: 10px;
    top: 13px;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center
   `}
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 45px;
  position: absolute;
  z-index: 1;
  ${props =>
    props.edit === true &&
    `
    right: 115px;
    top: 75px;
    background-color: #EAF6F9;
    border-radius: 50px;
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center
   `}
   ${props =>
    props.add === true &&
    `
    flexDirection:row    
   `}
  ${props =>
    props.delete === true &&
    `
    right: -10px;
    top:0px;

    border-radius: 50px;
    width: 65px;
    height: 30px;
    justify-content: center;
    align-items: center
   `}
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${secondary};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-vertical: 15px;
  height: 60px;
  ${props =>
    props.logout === true &&
    `
        background-color: red;
        flex-direction: row;
        justify-content: center;
   `}
   ${props =>
    props.becomesupplierbutton === true &&
    `
    width: 70%;
    margin: auto;
    margin-bottom: 5px;
    margin-top: 20px;
   `}
   ${props =>
    props.submitproductbutton === true &&
    `
    width: auto;
    margin: auto;
    margin-bottom: 35px;
    margin-top: 40px;
   `}
   ${props =>
    props.selectimg === true &&
    `
    width: 70%;
    height: 50;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
`}
   ${props =>
    props.datespe === true &&
    `
    margin-vertical: 0px;
    height: 68;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
`}
   ${props =>
    props.contactmanager === true &&
    `
    padding-left:50px;
    
`}
`;

export const ButtonText = styled.Text`
   font-size: 20px;
   font-weight: bold;
   color: ${tertiary}
   letter-spacing: 0.5px;

   ${props =>
    props.buttontextspe === true &&
    `
    font-size: 16px;
`}

`;

export const MsgBox = styled.Text`
   font-size: 13px;
   font-weight: bold;
   color: ${darkLight}
   text-align: center;

`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  margin-vertical: 20px;
  background-color: #dcdcdc;
`;
export const LineSpe = styled.View`
  height: 1px;
  width: 100%;
  margin-vertical: 10px;
  background-color: #dcdcdc;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  ${props =>
    props.extraviewbecomesupplier === true &&
    `
    flex-direction: column;
`}
`;

export const ExtraText = styled.Text`
  justify-content: center;
  color: ${darkLight};
  align-items: center;
  padding: 7px;
  font-size: 15px;
  ${props =>
    props.extratextbecomesupplier === true &&
    `
    text-align: center;
`}
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  font-size: 16px;
  color: ${secondary};
`;
//Signup and login screens end



//main page screens
export const CardContainer = styled.ScrollView`
     flex: 1;
     flex-direction: column;
     margin-top: 20px;
     margin-left: -5px;

`;
export const CategoryButton = styled.TouchableOpacity`
     margin: 10px;
     width: 200px;
     height: 120px;
     justify-content: center;
     align-items: center;
     ${props =>
      props.Categoryspe === true &&
      `
      width: 350px;

  `}
`;
export const SquareCategoryButton = styled.TouchableOpacity`
     margin: 10px;
     width: 125px;
     height: 120px;
`;
//main page screens end


//Settings.js screen
export const HomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
  border-width: 2px;
`;

export const HomeImage = styled.Image`
  min-width: 100%;
  height: 50%;
`;
//Settings.js screen end





export const StyledModal= ({message, route, setModalVisible, modalVisible, navigation})=>{
  return (
  <View style={styles.centeredView}>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            setModalVisible(!modalVisible)
            if(route!=null){
              navigation.navigate(route);
            }
          }}
        >
          <Text style={styles.textStyle}>OK</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
</View>
)}

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#00000999"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: secondary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export const Mainstyles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
  },
  img1:{
      justifyContent:'center',
      alignItems:'center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 25,
  },
  title2: {
      color: 'white',
      fontSize: 16,
      padding: 20,
      fontWeight: 'bold',
    },
    header:{
      width:'100%',
      flex: 1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'space-between',
      marginBottom: -65,
      marginTop: -25,
    },
});
