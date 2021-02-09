import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;
const styles = StyleSheet.create({
  myInputText: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('3%'),
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  overflow: {
    maxWidth: wp2dp('70%'),
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  fractionColumn: {
    alignItems: 'center',
  },
  integerInput: {
    width: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('8%') : wp2dp('4%'),
    minWidth: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    borderRadius: wp2dp('100%') < breakpoint ? wp2dp('1.5%') : wp2dp('1%'),
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: wp2dp('100%') < breakpoint ? wp2dp('0.3%') : wp2dp('0.15%'),
  },
  commonInput: {
    width: wp2dp('100%') < breakpoint ? wp2dp('8%') : wp2dp('5.5%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('3%'),
    minWidth: wp2dp('100%') < breakpoint ? wp2dp('8%') : wp2dp('5.5%'),
    borderRadius: wp2dp('100%') < breakpoint ? wp2dp('1.5%') : wp2dp('1%'),

  },
  smallInput: {
    width: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    minWidth: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    borderRadius: wp2dp('100%') < breakpoint ? wp2dp('1.5%') : wp2dp('1%'),
  },
  operatorInput: {
    borderRadius: wp2dp('100%') < breakpoint ? wp2dp('8%') : wp2dp('6%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('6%') : wp2dp('4%'),
    minWidth: wp2dp('100%') < breakpoint ? wp2dp('2%') : wp2dp('1%'),
    marginRight: wp2dp('100%') < breakpoint ? wp2dp('0.4%') : wp2dp('0.3%'),
  },
  fractionLineBox: {
    width: wp2dp('100%') < breakpoint ? wp2dp('10%') : wp2dp('6%'),
    height: wp2dp('100%') < breakpoint ? wp2dp('0.02%') : wp2dp('0.01%'),
    padding: wp2dp('0%'),
    margin: wp2dp('100%') < breakpoint ? wp2dp('0.4%') : wp2dp('0.3%'),
    minWidth: wp2dp('100%') < breakpoint ? wp2dp('8%') : wp2dp('6%'),
  },
  inputText: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('3%') : wp2dp('2%'),
    letterSpacing: 0,
  },
});

export const FractionFormula = ({ handlePartClick, formula, learningToolIndex, positionIndex, partIndex, showSmallInput, isFocusedLine, calculationStage, lineIndex }) => {

  return (
    <View style={[styles.leftRow, styles.overflow]}>
      <ScrollView horizontal={true}>
        <View style={styles.leftRow}>
          {
            formula.map((fraction, index) => {
              return <View key={index} style={styles.leftRow}>
                {
                  index != 0 && <TouchableOpacity
                    style={[styles.operatorInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 0) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                    onPress={e => { handlePartClick(e, index, 0) }}
                  >
                    <Text style={styles.inputText}>
                      {fraction[0]}
                    </Text>
                  </TouchableOpacity>
                }
                {
                  (learningToolIndex == 1 || (calculationStage > 1 && lineIndex > 0)) && <TouchableOpacity
                    style={[styles.integerInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 1) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                    onPress={e => { handlePartClick(e, index, 1) }}
                  >
                    <Text style={styles.inputText}>
                      {fraction[1] == 0 ? "" : fraction[1]}
                    </Text>
                  </TouchableOpacity>
                }
                <View style={styles.fractionColumn}>
                  {
                    showSmallInput && <TouchableOpacity
                      style={[styles.smallInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 2) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                      onPress={e => { handlePartClick(e, index, 2) }}
                    >
                      <Text style={styles.inputText}>
                        {fraction[2] == 0 ? "" : fraction[2]}
                      </Text>
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    style={[styles.commonInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 3) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                    onPress={e => { handlePartClick(e, index, 3) }}
                  >
                    <Text style={styles.inputText}>
                      {fraction[3] == 0 ? "" : fraction[3]}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={[styles.fractionLineBox, { borderBottomWidth: 3 }]}
                  />
                  <TouchableOpacity
                    style={[styles.commonInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 4) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                    onPress={e => { handlePartClick(e, index, 4) }}
                  >
                    <Text style={styles.inputText}>
                      {fraction[4] == 0 ? "" : fraction[4]}
                    </Text>
                  </TouchableOpacity>
                  {
                    showSmallInput && <TouchableOpacity
                      style={[styles.smallInput, styles.textCenter, (isFocusedLine && positionIndex == index && partIndex == 5) ? { backgroundColor: theme.colors.myPink, color: theme.colors.myRed } : { backgroundColor: theme.colors.myWhite, color: theme.colors.myBlue }]}
                      onPress={e => { handlePartClick(e, index, 5) }}
                    >
                      <Text style={styles.inputText}>
                        {fraction[5] == 0 ? "" : fraction[5]}
                      </Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

