import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import { FractionFormula } from "../components/FractionFormulaComponents";
import { getPrimeNumbers } from "../functions/PrimeNumbersFunctions";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

//×÷👍👍🏻
export const FractionAdditionSubtraction = ({ languageIndex, topic, learningTool, topicIndex, learningToolIndex }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [fractionLinesArray, setFractionLinesArray] = useState([[["", 0, 0, 0, 0, 0], ["", 0, 0, 0, 0, 0]]]);
  const [fractionPositionIndex, setFractionPositionIndex] = useState(0);
  const [fractionPartIndex, setFractionPartIndex] = useState(3);
  const [okButtonStage, setOkButtonStage] = useState(0);
  const [calculationStage, setCalculationStage] = useState(0);
  const [calculatedLcm, setCalculatedLcm] = useState(1);
  const timeDelay = 200;
  const primeNumbers = getPrimeNumbers();

  const okButtonText = [
    "輸入", "約簡", "完成",
    "输入", "约简", "完成",
    "Enter", "Reduce?", "Completed",
    "Entrer", "Réduire?", "Terminé"
  ];

  const topics = [
    "",
    "",
    "",
    ""
  ];

  const wellDone = [
    "你做得到﹗你完成了這題分數計算﹗",
    "你做得到﹗你完成了这题分数计算﹗",
    "You can do it! You have completed this fraction calculation!",
    "Tu peux le faire! Vous avez terminé ce calcul de fraction!"
  ];

  const noOperator = [
    "這兒少了運算符號。",
    "这儿少了运算符号。",
    "Operators are missing here.",
    "Les opérateurs manquent ici."
  ];

  const atLeastOneFraction = [
    "這兒需有最少一個分數。",
    "这儿需有最少一个分数。",
    "At least one fraction is required here.",
    "Au moins une fraction est requise ici."
  ];

  const negativeResult = [
    "這算式的答案是負數。",
    "这算式的答案是负数。",
    "The answer to this formula is negative.",
    "La réponse à cette formule est négative."
  ];

  const noNumber = [
    "運算符號的前後需輸入分數或整數。",
    "运算符号的前后需输入分数或整数。",
    "There should be a whole number or an integer before and after an operator.",
    "Il doit y avoir un nombre entier ou un entier avant et après un opérateur."
  ];

  const fractionHasBoth = [
    "一個分數需同時有分子和分母。",
    "一个分数需同时有分子和分母。",
    "A fraction should both a numerator and a denominator.",
    "Une fraction doit à la fois un numérateur et un dénominateur."
  ];

  const noImproper = [
    "這兒有假分數，請輸入帶分數。",
    "这儿有假分数，请输入带分数。",
    "There is an improper fraction, please enter a mixed number instead.",
    "Il y a une fraction incorrecte, veuillez saisir un nombre mixte à la place."
  ];

  const oneFractionOnly = [
    "計算後，應只得一個分數。",
    "计算后，应只得一个分数。",
    "You should only get one fraction after calculation.",
    "Vous ne devriez obtenir qu'une fraction après le calcul."
  ];

  const incorrectWhole = [
    "整數不正確，這應是分子除以分母得到的整數商。",
    "整数不正确，这应是分子除以分母得到的整数商。",
    "The whole number is incorrect. This should be the integer quotient obtained by dividing the numerator by the denominator.",
    "Le nombre entier est incorrect. Cela devrait être le quotient entier obtenu en divisant le numérateur par le dénominateur."
  ];

  const wholeNoFraction = [
    "這是整數，沒有分數部份。",
    "这是整数，没有分数部份。",
    "This is a whole number, it has no fractional part.",
    "C'est un nombre entier, il n'a pas de partie fractionnaire."
  ];

  const sameDenominator = [
    "分母應保持不變。",
    "分母应保持不变。",
    "The denominator should remain unchanged.",
    "Le dénominateur doit rester inchangé."
  ];

  const numeratorFromImproper = [
    "分子不正確，這應是分子除以分母得到的餘數。",
    "分子不正确，这应是分子除以分母得到的余数。",
    "The numerator is incorrect. This should be the remainder obtained by dividing the numerator by the denominator.",
    "Le numérateur est incorrect. Il doit s'agir du reste obtenu en divisant le numérateur par le dénominateur."
  ];

  const sameNumberOfFractions = [
    "這算式應與上一行算式有相同數量的分數。",
    "这算式应与上一行算式有相同数量的分数。",
    "This calculation should have the same number of fractions as the previous calculation.",
    "Ce calcul doit avoir le même nombre de fractions que le calcul précédent."
  ];

  const sameOperators = [
    "運算符號需保持不變。",
    "运算符号需保持不变。",
    "All operators should remain unchanged here.",
    "Tous les opérateurs devraient rester inchangés ici."
  ];

  const sameWholeNumbers = [
    "這兒整數部份應保持不變。",
    "这儿整数部份应保持不变。",
    "The integer part should remain unchanged here.",
    "La partie entière doit rester inchangée ici."
  ];

  const newDenominatorBeCM = [
    "新分母應是上一行分母的公倍數。",
    "新分母应是上一行分母的公倍数。",
    "The new denominators should be the common multiple of the denominators of previous line.",
    "Les nouveaux dénominateurs devraient être le multiple commun des dénominateurs de la ligne précédente."
  ];

  const sameDenominatorHint = [
    "這兒所有分數需有相同的分母。",
    "这儿所有分数需有相同的分母。",
    "All the fractions here should have the same denominators.",
    "Toutes les fractions ici devraient avoir les mêmes dénominateurs."
  ];

  const multiplyWithSameInteger = [
    "擴分時，分子和分母應乘以相同的整數。",
    "扩分时，分子和分母应乘以相同的整数。",
    "When expanding, the numerator and denominator should be multiplied by the same integer.",
    "Lors de l'expansion, le numérateur et le dénominateur doivent être multipliés par le même entier."
  ];

  const CMToLCMHint = [
    "這個新分母是上一行分母的公倍數，但這不是最小公倍數。",
    "这个新分母是上一行分母的公倍数，但这不是最小公倍数。",
    "This new denominator is the common multiple of the denominators of the previous line, but not the Least Common Multiple.",
    "Ce nouveau dénominateur est le multiple commun des dénominateurs de la ligne précédente, mais pas le multiple le moins commun."
  ];

  const denominatorInvolvedBeLCM = [
    "從整數退位的數的分母應是所有分母的L.C.M.。",
    "从整数退位的数的分母应是所有分母的L.C.M.。",
    "The denominator of the number abdicated from an integer should be the L.C.M. of all denominators.",
    "Le dénominateur du nombre abdiqué d'un entier doit être le L.C.M. de tous les dénominateurs."
  ];

  const wholeNotInvolvedKeepSame = [
    "不進行退位的整數應保持不變。",
    "不进行退位的整数应保持不变。",
    "The integer without abdication should remain unchanged.",
    "L'entier sans abdication doit rester inchangé."
  ];

  const fractionNotInvolvedKeepSame = [
    "不進行退位的分數應保持不變。",
    "不进行退位的分数应保持不变。",
    "The fraction without abdication should remain unchanged.",
    "La fraction sans abdication devrait rester inchangée."
  ];

  const abdicatedNumerator = [
    "新分子應是  原來分子+(整數退位×分母)。",
    "新分子应是原来分子+（整体退位×分母）。",
    "The new numerator should be the original numerator + (whole number abdicated × denominator).",
    "Le nouveau numérateur doit être le numérateur d'origine + (nombre entier abdiqué × dénominateur)."
  ];

  const abdicateTooMuch = [
    "不需要從整數退位這麼多。",
    "不需要从整数退位这么多。",
    "There is no need to abdicate so much from the integer.",
    "Il n'est pas nécessaire d'abdiquer autant de l'entier."
  ];

  const abdicateTooLittle = [
    "這兒需要從整數退位更多。",
    "这儿需要从整数退位更多。",
    "There needs to be more abdicated from the whole number.",
    "Il doit y avoir plus d'abdication du nombre entier."
  ];

  const wholeWithoutFraction = [
    "這計算結果是一個整數，没有小數部份。",
    "这计算结果是一个整数，没有小数部份。",
    "This result is a whole number without a fraction part.",
    "Ce résultat est un nombre entier sans partie fractionnaire."
  ];

  const numeratorAvoidNegative = [
    "重新排列分子的計算，以避免在計算過程中得到負數。",
    "重新排列分子的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the numerators to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des numérateurs pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ];

  const incorrectNumerator = [
    "分子不正確，請按照運算符來計算新分子。",
    "分子不正确，请按照运算符来计算新分子。",
    "Incorrect numerator. Please follow the operators to calculate the new numerator.",
    "Numérateur incorrect. Veuillez suivre les opérateurs pour calculer le nouveau numérateur."
  ];

  const wholeAvoidNegative = [
    "重新排列整數的計算，以避免在計算過程中得到負數。",
    "重新排列整数的计算，以避免在计算过程中得到负数。",
    "Rearrange the calculation of the whole numbers to avoid getting negative numbers during the calculation.",
    "Réorganisez le calcul des nombres entiers pour éviter d'obtenir des nombres négatifs pendant le calcul."
  ];

  const incorrectCalculatedWhole = [
    "整數不正確，請按照運算符來計算新整數。",
    "整数不正确，请按照运算符来计算新整数。",
    "Incorrect whole number. Please follow the operators to calculate the new whole number.",
    "Nombre entier incorrect. Veuillez suivre les opérateurs pour calculer le nouveau nombre entier."
  ];

  const beAFactorOfNumerator = [
    "在約簡的過程中，新分子應是原本分子的因數。",
    "在约简的过程中，新分子应是原本分子的因数。",
    "The new numerator should be a factor of the original numerator in the process of reduction.",
    "Le nouveau numérateur doit être un facteur du numérateur d'origine dans le processus de réduction."
  ];

  const beAFactorOfDenominator = [
    "在約簡的過程中，新分母應是原本分母的因數。",
    "在约简的过程中，新分母应是原本分母的因数。",
    "The new denominator should be a factor of the original denominator in the process of reduction.",
    "Le nouveau dénominateur devrait être un facteur du dénominateur d'origine dans le processus de réduction."
  ];

  const sameFactorInReduction = [
    "約簡不正確，分子和分母需以相同的因數進行約簡。",
    "约简不正确，分子和分母需以相同的因数进行约简。",
    "The reduction is incorrect. The numerator and denominator must be reduced by the same factor.",
    "La réduction est incorrecte. Le numérateur et le dénominateur doivent être réduits du même facteur."
  ];

  const furtherReduceFactorLeft = [
    "這算式還能以",
    "这算式还能以",
    "This calculation can be further reduced by ",
    "Ce calcul peut être encore réduit par "
  ];

  const furtherReduceFactorRight = [
    "進行約簡",
    "进行约简",
    ".",
    "."
  ];

  useEffect(() => {
    resetDefault();
  }, [learningToolIndex]);

  useEffect(() => {
    resetDefault();
  }, [topicIndex])

  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  function resetDefault() {
    setSeverity("error");
    setFractionLinesArray([[["", 0, 0, 0, 0, 0], ["", 0, 0, 0, 0, 0]]]);
    setFormulaFocusedIndex(0);
    setCompleted(false);
    setOkButtonStage(0);
    setCalculationStage(0);
  }

  const resetClick = (e) => {
    if (completed) {
      resetDefault();
    } else if (okButtonStage > 0) {
      if (calculationStage == 3) {
        var checkValue = false
        if (fractionLinesArray[formulaFocusedIndex][0][4] > 0) {
          checkValue = true
        }
        checkSimplifyValue(formulaFocusedIndex, checkValue);
      } else {
        // addLine();
      }
    }
  };

  function addLine() {
    setPartValue(0, -1, -1, true, false, false);
    setFormulaFocusedIndex(formulaFocusedIndex + 1);
    setOkButtonStage(0);
  }

  
  function fractionOrIntegerCheck(index) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      //check with operators
      if (i > 0 && fractionLinesArray[index][i][0] == "") {
        setErrorMessage(noOperator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      //check with numbers
      if (fractionLinesArray[index][i][1] == "" && fractionLinesArray[index][i][3] == "" & fractionLinesArray[index][i][4] == "") {
        setErrorMessage(noNumber[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      //check fraction has both
      if ((fractionLinesArray[index][i][3] == "" && fractionLinesArray[index][i][4] != "")
        || (fractionLinesArray[index][i][3] != "" && fractionLinesArray[index][i][4] == "")) {
        setErrorMessage(fractionHasBoth[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  function singleNumberCheck(index) {
    if (fractionLinesArray[index].length == 2) {
      if (index == 0) {
        setErrorMessage(noOperator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    return true;
  }

  function positiveResultCheck(index) {
    var result = 0.0;
    var sumOfDenominators = 0;
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      result += (fractionLinesArray[index][i][1] + fractionLinesArray[index][i][3] / fractionLinesArray[index][i][4]) * (fractionLinesArray[index][i][0] == "-" ? -1 : 1);
      sumOfDenominators += fractionLinesArray[index][i][4];
      //check no improper
      if (fractionLinesArray[index][i][3] >= fractionLinesArray[index][i][4] && fractionLinesArray[index][i][4] > 0) {
        setErrorMessage(noImproper[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    //check at least one fraction
    if (sumOfDenominators == 0) {
      setErrorMessage(atLeastOneFraction[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    //check result is negative
    if (result < 0) {
      setErrorMessage(negativeResult[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    } else {
      return true;
    }
  }

  function noVariousDenominatorCheck(index, checkValueNeeded) {
    if (!checkValueNeeded) { //check having different only
      var firstDenominator = 0;
      var i;
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
        if (fractionLinesArray[index][i][4] > 0) {
          if (firstDenominator == 0) {
            firstDenominator = fractionLinesArray[index][i][4]
          } else {
            if (firstDenominator != fractionLinesArray[index][i][4]) {
              return false;
            }
          }
        }
      }
      setCalculatedLcm(firstDenominator);
      setCalculationStage(1);
      noNegativeNumeratorResultCheck(index, false);
      return true;
    } else { //check denominators become lcm
      var denominatorMultiples = [];
      var lcm = 0;
      var i;
      if (fractionLinesArray[index].length != fractionLinesArray[index - 1].length) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        if (fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]) {
          setErrorMessage(sameOperators[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1]) {
          setErrorMessage(sameWholeNumbers[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (fractionLinesArray[index - 1][i][4] > 0) {
          if (fractionLinesArray[index][i][4] % fractionLinesArray[index - 1][i][4] != 0 || fractionLinesArray[index][i][4] == 0) {
            setErrorMessage(newDenominatorBeCM[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          if (lcm == 0) {
            lcm = fractionLinesArray[index][i][4];
          } else {
            if (fractionLinesArray[index][i][4] != lcm) {
              setErrorMessage(sameDenominatorHint[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
              return false;
            }
          }
          var denominatorMultiple = fractionLinesArray[index][i][4] / fractionLinesArray[index - 1][i][4];
          denominatorMultiples.push(denominatorMultiple);
          if (fractionLinesArray[index][i][3] / fractionLinesArray[index - 1][i][3] != denominatorMultiple) {
            setErrorMessage(multiplyWithSameInteger[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          //whole number only
        } else {
          if (fractionLinesArray[index][i][3] > 0 || fractionLinesArray[index][i][4] > 0) {
            setErrorMessage(sameWholeNumbers[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      for (i = 0; i < primeNumbers.length; i++) {
        var isFactor = true;
        var j;
        for (j = 0; j < denominatorMultiples.length; j++) {
          if (primeNumbers[i] > denominatorMultiples[j]) {
            j = denominatorMultiples.length;
            i = primeNumbers.length;
          }
          if (denominatorMultiples[j] % primeNumbers[i] != 0) {
            isFactor = false;
            j = denominatorMultiples.length;
          }
        }
        if (isFactor) {
          setErrorMessage(CMToLCMHint[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
      }
      setCalculatedLcm(lcm);
      setCalculationStage(1);
      addLine();
      noNegativeNumeratorResultCheck(index, false);
      return true;
    }
  }

  function noNegativeNumeratorResultCheck(index, checkValueNeeded) {
    var numeratorResult = 0;
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      numeratorResult += fractionLinesArray[index][i][3] * (fractionLinesArray[index][i][0] == "-" ? -1 : 1);
    }
    if (!checkValueNeeded) {
      if (numeratorResult >= 0) {
        setCalculationStage(2);
        return true;
      } else {
        return false;
      }
      //check value
    } else {
      if (fractionLinesArray[index].length != fractionLinesArray[index - 1].length) {
        setErrorMessage(sameNumberOfFractions[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
        if (fractionLinesArray[index][i][0] != fractionLinesArray[index - 1][i][0]) {
          setErrorMessage(sameOperators[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (fractionLinesArray[index - 1][i][0] != "-" && fractionLinesArray[index - 1][i][1] > 0) {
          var wholeDiff = fractionLinesArray[index - 1][i][1] - fractionLinesArray[index][i][1];
          //denominator should be the lcm
          if (wholeDiff > 0 || fractionLinesArray[index - 1][i][4] > 0) {
            if (fractionLinesArray[index][i][4] != calculatedLcm) {
              setErrorMessage(denominatorInvolvedBeLCM[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
              return false;
            }
          } else {
            if (fractionLinesArray[index][i][4] != 0) {
              setErrorMessage(wholeNotInvolvedKeepSame[languageIndex]);
              setTimeout(() => {
                setOpenAlert(true);
              }, timeDelay);
              return false;
            }
          }
          if (fractionLinesArray[index][i][3] != fractionLinesArray[index - 1][i][3] + wholeDiff * calculatedLcm) {
            setErrorMessage(abdicatedNumerator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          if (fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1]
            || fractionLinesArray[index][i][3] != fractionLinesArray[index - 1][i][3]
            || fractionLinesArray[index][i][4] != fractionLinesArray[index - 1][i][4]) {
            setErrorMessage(fractionNotInvolvedKeepSame[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      if (numeratorResult >= calculatedLcm) {
        setErrorMessage(abdicateTooMuch[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      if (numeratorResult < 0) {
        setErrorMessage(abdicateTooLittle[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      setCalculationStage(2);
      addLine();
      return true;
    }
  }

  function addToOneFractionCheck(index) {
    if (fractionLinesArray[index].length > 2) {
      setErrorMessage(oneFractionOnly[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    var numeratorResult = 0;
    var wholeResult = 0;
    var negativeInNumeratorProcess = false;
    var negativeInWholeProcess = false;
    var i;
    for (i = 0; i < fractionLinesArray[index - 1].length - 1; i++) {
      numeratorResult += fractionLinesArray[index - 1][i][3] * (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1);
      if (numeratorResult < 0) {
        negativeInNumeratorProcess = true;
      }
      wholeResult += fractionLinesArray[index - 1][i][1] * (fractionLinesArray[index - 1][i][0] == "-" ? -1 : 1);
      if (wholeResult < 0) {
        negativeInWholeProcess = true;
      }
    }
    if (numeratorResult > 0) {
      if (fractionLinesArray[index][0][4] != calculatedLcm) {
        setErrorMessage(sameDenominator[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    } else {
      if (fractionLinesArray[index][0][4] != 0) {
        setErrorMessage(wholeWithoutFraction[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
    }
    if (fractionLinesArray[index][0][3] != numeratorResult) {
      if (negativeInNumeratorProcess) {
        setErrorMessage(numeratorAvoidNegative[languageIndex]);
      } else {
        setErrorMessage(incorrectNumerator[languageIndex]);
      }
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    if (fractionLinesArray[index][0][1] != wholeResult) {
      if (negativeInWholeProcess) {
        setErrorMessage(wholeAvoidNegative[languageIndex]);
      } else {
        setErrorMessage(incorrectCalculatedWhole[languageIndex]);
      }
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return false;
    }
    setCalculationStage(3);
    setOkButtonStage(1);
    return true;
  }

  function noImproperFractionCheck(index, checkValueNeeded) {
    var i;
    for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
      if (fractionLinesArray[index][i][3] >= fractionLinesArray[index][i][4] && fractionLinesArray[index][i][4] > 0) {
        if (!checkValueNeeded && index > 0) {
          addLine();
          return false;
        } else {
          setErrorMessage(noImproper[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
      }
    }
    if (index == 0) {
      return true;
    } else if (checkValueNeeded) {
      if (fractionLinesArray[index].length > 2) {
        setErrorMessage(oneFractionOnly[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < 1; i++) {
        var integerPart = fractionLinesArray[index][i][3];
        if (integerPart == "") {
          integerPart = 0;
        }
        if (fractionLinesArray[index][i][1] != fractionLinesArray[index - 1][i][1] + parseInt(fractionLinesArray[index - 1][i][3] / fractionLinesArray[index - 1][i][4])) {
          setErrorMessage(incorrectWhole[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        }
        if (fractionLinesArray[index - 1][i][4] == 1) {
          if (fractionLinesArray[index][i][3] > 0 || fractionLinesArray[index][i][4] > 0) {
            setErrorMessage(wholeNoFraction[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          if (fractionLinesArray[index][i][4] != fractionLinesArray[index - 1][i][4]) {
            setErrorMessage(sameDenominator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
          if (fractionLinesArray[index][i][3] != fractionLinesArray[index - 1][i][3] % fractionLinesArray[index - 1][i][4]) {
            setErrorMessage(numeratorFromImproper[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        }
      }
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return true;
    } else {
      setErrorMessage("👍🏻" + wellDone[languageIndex]);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
      setCompleted(true);
      setSeverity("success");
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return true;
    }
  }

  function enterCheck() {
    if (!fractionOrIntegerCheck(formulaFocusedIndex)) { return };
    if (formulaFocusedIndex == 0) {
      if (!singleNumberCheck(formulaFocusedIndex)) { return };
      if (!positiveResultCheck(formulaFocusedIndex)) { return };
      addLine();
      if (!noVariousDenominatorCheck(formulaFocusedIndex, false)) { return };
    } else {
      switch (calculationStage) {
        case 0:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noVariousDenominatorCheck(formulaFocusedIndex, true);
          }
          break;
        case 1:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noNegativeNumeratorResultCheck(formulaFocusedIndex, true);
          }
          break;
        case 2:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            addToOneFractionCheck(formulaFocusedIndex);
          }
          break;
        case 3:
          break;
        case 4:
          if (fractionOrIntegerCheck(formulaFocusedIndex)) {
            noImproperFractionCheck(formulaFocusedIndex, true);
          }
          break;
      }
    }
  }

  function checkSimplifyValue(index, checkValue) {
    if (checkValue) {
      var newNumerator = 1;
      var newDenominator = 1;
      var numeratorDeduceFactor = 1;
      var denominatorDeduceFactor = 1;
      var i;
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
        if (fractionLinesArray[index][i][2] > 0) {
          if (fractionLinesArray[index][i][3] % fractionLinesArray[index][i][2] == 0) {
            newNumerator *= fractionLinesArray[index][i][2];
            numeratorDeduceFactor *= fractionLinesArray[index][i][3] / fractionLinesArray[index][i][2];
          } else {
            setErrorMessage(beAFactorOfNumerator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          newNumerator *= fractionLinesArray[index][i][3];
        }
        if (fractionLinesArray[index][i][5] > 0) {
          if (fractionLinesArray[index][i][4] % fractionLinesArray[index][i][5] == 0) {
            newDenominator *= fractionLinesArray[index][i][5];
            denominatorDeduceFactor *= fractionLinesArray[index][i][4] / fractionLinesArray[index][i][5];
          } else {
            setErrorMessage(beAFactorOfDenominator[languageIndex]);
            setTimeout(() => {
              setOpenAlert(true);
            }, timeDelay);
            return false;
          }
        } else {
          newDenominator *= fractionLinesArray[index][i][4];
        }
      }
      if (numeratorDeduceFactor != denominatorDeduceFactor) {
        setErrorMessage(sameFactorInReduction[languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
        return false;
      }
      for (i = 0; i < primeNumbers.length; i++) {
        if (newNumerator % primeNumbers[i] == 0 && newDenominator % primeNumbers[i] == 0) {
          setErrorMessage(furtherReduceFactorLeft[languageIndex] + primeNumbers[i] + furtherReduceFactorRight[languageIndex]);
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
          return false;
        } else {
          if (primeNumbers[i] ** 2 > newNumerator && primeNumbers[i] ** 2 > newDenominator) {
            i = primeNumbers.length;
          }
        }
      }
      for (i = 0; i < fractionLinesArray[index].length - 1; i++) {
        if (fractionLinesArray[index][i][2] > 0) {
          setPartValue(fractionLinesArray[index][i][2], i, 3, false, false, false);
        }
        if (fractionLinesArray[index][i][5] > 0) {
          setPartValue(fractionLinesArray[index][i][5], i, 4, false, false, false);
        }
      }
    }
    setCalculationStage(4);
    setOkButtonStage(0);
    noImproperFractionCheck(index, false);
    return true;

  }

  const okClick = (e) => {
    switch (okButtonStage) {
      case 0:
        enterCheck();
        break;
      case 1:
        setFractionPartIndex(2);
        setOkButtonStage(2);
        break;
      case 2:
        var checkValue = false
        if (fractionLinesArray[formulaFocusedIndex][0][4] > 0) {
          checkValue = true
        }
        checkSimplifyValue(formulaFocusedIndex, checkValue);
        break;
    }
  };

  const handleKeypadClick = (e, key) => {
    var pushLine = false;
    var pushPosition = false;
    if (formulaFocusedIndex == fractionLinesArray.length - 1) {
      if ((["+", "-"].includes(key) && fractionPartIndex == 0 && fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][fractionPartIndex] == "")
        || (!["+", "-"].includes(key) && fractionPartIndex != 0 && (fractionLinesArray[formulaFocusedIndex][fractionPositionIndex][fractionPartIndex] != "" || key != "0"))
        || key == "<") {
        if (["+", "-"].includes(key) && fractionPositionIndex == fractionLinesArray[formulaFocusedIndex].length - 1) {
          pushPosition = true;
        }
        var tmpFractionLinesArray = [...fractionLinesArray];
        var prevValue = tmpFractionLinesArray[formulaFocusedIndex][fractionPositionIndex][fractionPartIndex];
        if (key == "<") {
          if (fractionPartIndex == 0) {
            prevValue = "";
          } else {
            if (prevValue != "") {
              prevValue = parseInt(prevValue / 10);
              if (prevValue == 0) {
              }
            }
          }
        } else {
          prevValue += key;
        }
        if (fractionPartIndex != 0) {//
          prevValue = parseInt(prevValue);//
        }
        setPartValue(prevValue, fractionPositionIndex, fractionPartIndex, pushLine, pushPosition, false);
      }
    }
  }

  function setPartValue(value, positionIndex, partIndex, pushLine, pushPosition, popPosition) {
    var nullPosition = false;
    setFractionLinesArray(prevLines => {
      var tmpPrevLines = prevLines.map((line, lIndex) => {
        if (lIndex == formulaFocusedIndex) {
          var tmpLine = line.map((position, pIndex) => {
            if (pIndex == positionIndex) {
              var changedPosition = position.map((part, index) => {
                if (index == partIndex) {
                  return value;
                } else {
                  return part;
                }
              })
              if (pIndex == fractionLinesArray[formulaFocusedIndex].length - 2 && pIndex > 0) {
                if (changedPosition[0] == "" && !(changedPosition[1] > 0) && !(changedPosition[3] > 0) && !(changedPosition[4] > 0)) {
                  nullPosition = true;
                }
              }
              return changedPosition
            } else {
              return position;
            }
          })
          if (pushPosition) {
            tmpLine.push(["", 0, 0, 0, 0, 0]);
          }
          if (popPosition || nullPosition) {
            tmpLine.pop();
          }
          return tmpLine;

        } else {
          return line;
        }
      })
      if (pushLine) {
        tmpPrevLines.push([["", 0, 0, 0, 0, 0], ["", 0, 0, 0, 0, 0]]);
      }
      return tmpPrevLines
    });
  }

  const handlePartClick = (e, positionIndex, partIndex) => {
    //in reduction, only small boxes can be focused
    if ((okButtonStage == 2 && (partIndex == 2 || partIndex == 5)) || okButtonStage != 2) {
      setFractionPositionIndex(positionIndex);
      setFractionPartIndex(partIndex);
    }
  }

  return (
    <MyFrame topic={topics[languageIndex] + topic} learningTool={learningTool}>
      <View style={styles.centerRow}>
        <View style={styles.formulaColumn}>
          {
            fractionLinesArray.map((formula, index) => {
              return <View key={index} style={[styles.verticalCenterRow, styles.commonPadding]}>
                <Text
                  style={[styles.formulaLine, { opacity: index == 0 ? 0 : 1 }]}
                >=</Text>
                <View
                  style={[styles.formulaLine, styles.formulaBox, {
                    borderWidth: (index == formulaFocusedIndex) ? 3 : 1,
                    borderColor: (index == formulaFocusedIndex) ? theme.colors.myMagenta : theme.colors.blue
                  }]}
                >
                  <FractionFormula
                    formula={formula}
                    handlePartClick={handlePartClick}
                    isFocusedLine={(formulaFocusedIndex == index)}
                    positionIndex={fractionPositionIndex}
                    partIndex={fractionPartIndex}
                    learningToolIndex={learningToolIndex}
                    showSmallInput={(okButtonStage == 2) && (index == formulaFocusedIndex)}
                    calculationStage={calculationStage}
                    lineIndex={index}
                  />
                </View>
                <View>
                  {
                    index == formulaFocusedIndex &&
                    <TouchableOpacity
                      style={styles.okButton}
                      onPress={okClick}
                    >
                      <Text style={styles.okButtonText}>
                        {okButtonText[languageIndex * 3 + okButtonStage]}
                      </Text>
                    </TouchableOpacity>
                  }
                  {
                    index == fractionLinesArray.length - 1
                    && (okButtonStage == 1 || completed)
                    &&
                    <TouchableOpacity
                      style={styles.okButton}
                      onPress={resetClick}
                    >
                      <MaterialIcons name="forward" color={'white'} size={parseInt(wp2dp('100%') < breakpoint ? wp2dp('5%') : wp2dp('2%'))} />
                    </TouchableOpacity>
                  }
                </View>
              </View>
            })
          }
        </View>
      </View>
      <MyKeypad
        handleClick={handleKeypadClick}
        topicIndex={topicIndex}
        formulaFocusedIndex={formulaFocusedIndex}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
    </MyFrame>
  );
}
