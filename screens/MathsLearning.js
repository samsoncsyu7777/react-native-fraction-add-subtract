import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import theme from "../Theme";
import {
  withTheme,
} from 'react-native-paper';
import {
  HeadingSelect,
} from "../components/MathsLearningComponents";
import {
  FractionAdditionSubtraction,
} from "./FractionAdditionSubtraction";
import pic1 from "../assets/egypt1.jpg";
import pic2 from "../assets/jairusDaughter2.jpg";
import pic3 from "../assets/love2.jpg";
import prayerImage from "../assets/prayer5.jpg";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(2);//0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(0);//0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(2);
  const [learningToolIndex, setLearningToolIndex] = useState(1);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);

  const numberOfBibleVersions = 2;
  const numberOfTopics = 3;
  const numberOfLearningTools = 2;
  const numberOfScriptureVerses = 3;
  const scriptureImages = [pic1, pic2, pic3];
  const languages = ["繁體中文", "简体中文", "English", "Française"];
  const bibleVersions = ["天主教", "基督教", "天主教", "基督教", "Catholic", "Christian", "Catholique", "Chrétienne"];
  const bibleVersionsQuestion = ["經文版本", "经文版本", "Scripture version", "Version biblique"];
  const topics = [
    "分數加法", "分數減法", "分數加減混合",
    "分数加法", "分数减法", "分数加减混合",
    "Addition of Fractions", "Subtraction of Fractions", "Mixed Addition and Subtraction of Fractions",
    "Addition de fractions", "Soustraction de fractions", "Addition et soustraction mixtes de fractions"
  ];
  const topicsQuestion = ["主題", "主题", "Topic", "Sujet"];
  const learningTools = [
    "真分數計算", "帶分數計算", "真分數計算", "帶分數計算", "真分數計算", "帶分數計算",    
    "真分数计算", "带分数计算", "真分数计算", "带分数计算", "真分数计算", "带分数计算",
    "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", 
    "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction", "Proper fraction", "Mixed fraction"
  ];
  const learningToolsQuestion = [
    "分數類型", "分数类型", "Fraction Type", "Type de Fraction"
  ];
  const scriptureVerses = [//Gen 41:34, Mark5:35-36, Luke6:35
    //traditional chinese
    "「陛下應設法在地方上派定督辦，在七個豐年內，徵收埃及國所出產的五分之一；」創41:34",
    "他還說話的時候，有人從會堂長家裡來，說：「你的女兒死了，你還來煩勞師傅做什麼？」耶穌聽見所說的話，就給會堂長說：「不要怕，祇管信。」谷5:35-36",
    "但是，你們當愛你們的仇人，善待他們；借出，不要再有所希望：如此，你們的賞報必定豐厚，且要成為至高者的子女，因為他對待忘恩的和惡人，是仁慈的。路6:35",
    "「請法老這樣做，委派官員治理這地，在七個豐年的期間，徵收埃及地出產的五分之一。」創41:34",
    "耶穌還在說話的時候，有人從會堂主管的家裏來，說：「你的女兒死了，何必還勞駕老師呢？」耶穌不理會他們所說的話，就對會堂主管說：「不要怕，只要信！」可5:35-36",
    "你們倒要愛仇敵，要善待他們，並要借給人不指望償還，你們的賞賜就很多了，你們必作至高者的兒子，因為他恩待那忘恩的和作惡的。路6:35",
    //simplified chinese
    "「陛下应设法在地方上派定督办，在七个丰年内，征收埃及国所出产的五分之一；」创41:34",
    "他还说话的时候，有人从会堂长家里来，说：「你的女儿死了，你还来烦劳师傅做什么？」耶稣听见所说的话，就给会堂长说：「不要怕，只管信。」谷5:35-36",
    "但是，你们当爱你们的仇人，善待他们；借出，不要再有所希望：如此，你们的赏报必定丰厚，且要成为至高者的子女，因为他对待忘恩的和恶人，是仁慈的。路6:35",
    "「请法老这样做，委派官员治理这地，在七个丰年的期间，征收埃及地出产的五分之一。」创41:34",
    "耶稣还在说话的时候，有人从会堂主管的家里来，说：「你的女儿死了，何必还劳驾老师呢？」耶稣不理会他们所说的话，就对会堂主管说：「不要怕，只要信！」可5:35-36",
    "你们倒要爱仇敌，要善待他们，并要借给人不指望偿还，你们的赏赐就很多了，你们必作至高者的儿子，因为他恩待那忘恩的和作恶的。路6:35 ",
    //english
    "'Pharaoh should take action and appoint supervisors for the country, and impose a tax of one-fifth on Egypt during the seven years of plenty.'Genesis41:34",
    "While he was still speaking some people arrived from the house of the president of the synagogue to say, 'Your daughter is dead; why put the Master to any further trouble?' But Jesus overheard what they said and he said to the president of the synagogue, 'Do not be afraid; only have faith.'Mark5:35-36",
    "Instead, love your enemies and do good to them, and lend without any hope of return. You will have a great reward, and you will be children of the Most High, for he himself is kind to the ungrateful and the wicked.Luke6:35",
    "'Let Pharaoh do this, and let him put overseers over the land of Egypt to put in store a fifth part of the produce of the land in the good years.'Genesis41:34",
    "And while he was still talking, they came from the ruler of the Synagogue's house, saying, Your daughter is dead: why are you still troubling the Master? But Jesus, giving no attention to their words, said to the ruler of the Synagogue, Have no fear, only have faith.Mark5:35-36",
    "But be loving to those who are against you and do them good, and give them your money, not giving up hope, and your reward will be great and you will be the sons of the Most High: for he is kind to evil men, and to those who have hard hearts.Luke6:35",
    //french
    "'Que Pharaon établisse en outre des intendants sur le pays, pour lever un cinquième des récoltes du pays d'Égypte pendant les sept années d'abondance.'Genèse41:34",
    "Il parlait encore, lorsqu'on vient de la maison du chef de synagogue dire : ' Ta fille est morte, pourquoi importuner davantage le Maître? ' Mais Jésus, ayant surpris la parole qui venait d'être prononcée, dit au chef de synagogue : ' Ne crains pas, crois seulement. 'Marc5:35-36",
    "Mais aimez vos ennemis, faites du bien et prêtez sans rien espérer en retour; et votre récompense sera grande, et vous serez les fils du Très-Haut, lui qui est bon pour les ingrats et les méchants.Luc6:35",
    "« Que le pharaon établisse des commissaires sur le pays pour prélever un cinquième des récoltes de l'Egypte pendant les sept années d'abondance. »Genèse41:34",
    "Il parlait encore quand des gens arrivèrent de chez le chef de la synagogue et lui dirent : « Ta fille est morte. Pourquoi déranger encore le maître ? » Dès qu’il entendit cette parole, Jésus dit au chef de la synagogue : « N’aie pas peur, crois seulement. »Marc5:35-36",
    "Mais aimez vos ennemis, faites du bien et prêtez sans rien espérer en retour. Votre récompense sera grande et vous serez fils du Très-Haut, car il est bon pour les ingrats et pour les méchants.Luc6:35"
  ];
  const prayers = [
    "主耶穌，求祢給我一顆願意奉獻的心，讓我更能全心、全意愛天上的父親！",
    "主耶稣，求祢给我一颗愿意奉献的心，让我更能全心、全意爱天上的父亲！",
    "Lord Jesus, please give me a heart that is willing to give, so that I can love my Father in heaven with all my heart and with all my soul!",
    "Seigneur Jésus, s'il te plaît, donne-moi un cœur prêt à donner, afin que je puisse aimer mon Père céleste de tout mon cœur et de toute mon âme!"
  ];
  const noticificationText = [
    "開啟通知，計算過程會顯示提示。",
    "开启通知，计算过程会显示提示。",
    "Turn on the notification, prompts will be displayed during the calculation.",
    "Activez la notification, des invites seront affichées pendant le calcul."
  ];
  const applicationHint = [
    "使用方法：先按空格，再輸入數字或運算符號。",
    "使用方法：先按空格，再输入数字或运算符号。",
    "How to use: Press the space first, then enter a number or an operator.",
    "Comment utiliser: appuyez d'abord sur l'espace, puis entrez un nombre ou un opérateur."
  ];

  useEffect(() => {
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  return (
    <View style={styles.mathsLearningContainer} >
      <LinearGradient
        colors={['#E8FFE8', '#A0FF80']}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.headingContainer}>
            <HeadingSelect
              selectLabel="Language"
              selectIndex={languageIndex}
              setItemIndex={setLanguageIndex}
              itemsArray={languages}
            />
            <HeadingSelect
              selectLabel={bibleVersionsQuestion[languageIndex]}
              selectIndex={bibleVersionIndex}
              setItemIndex={setBibleVersionIndex}
              itemsArray={bibleVersions.slice(languageIndex * numberOfBibleVersions, languageIndex * numberOfBibleVersions + numberOfBibleVersions)}
            />
            <HeadingSelect
              selectLabel={topicsQuestion[languageIndex]}
              selectIndex={topicIndex}
              setItemIndex={setTopicIndex}
              itemsArray={topics.slice(languageIndex * numberOfTopics, languageIndex * numberOfTopics + numberOfTopics)}
            />
            <HeadingSelect
              selectLabel={learningToolsQuestion[languageIndex]}
              selectIndex={learningToolIndex}
              setItemIndex={setLearningToolIndex}
              itemsArray={learningTools.slice((languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools, (languageIndex * numberOfTopics + topicIndex + 1) * numberOfLearningTools)}
            />
          </View>
          <View style={styles.scriptureVerseRow} >
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={['purple', 'magenta', 'red', 'orange', 'yellow', 'orange', 'red', 'magenta', 'purple']}
              style={[styles.scriptureVerseBorder, styles.scriptureBorderWidth]}
            >
              <View style={[styles.scriptureVerseBorder, styles.scriptureBgColor]}>
                <Image style={styles.scriptureImage} source={scriptureImages[scriptureVerseIndex]} resizeMode="contain" />
                <Text style={styles.scriptureVerse}>{scriptureVerses[(languageIndex * numberOfBibleVersions + bibleVersionIndex) * numberOfScriptureVerses + scriptureVerseIndex]}</Text>
              </View>
            </LinearGradient>
          </View>
          <FractionAdditionSubtraction
            languageIndex={languageIndex}
            topic={topics[languageIndex * numberOfTopics + topicIndex]}
            learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            topicIndex={topicIndex}
            learningToolIndex={learningToolIndex}
          />
          <View style={[styles.prayerRow, styles.topMargin]}>
            <Image style={styles.prayerImage} source={prayerImage} resizeMode="contain" />
            <Text style={styles.prayerText}>{prayers[languageIndex]}</Text>
          </View>
          <View style={styles.prayerRow}>
            <Text style={styles.commonText}>{applicationHint[languageIndex]}</Text>
          </View>
          <View style={styles.prayerRow}>
            <Text style={styles.commonText}>{noticificationText[languageIndex]}</Text>
          </View>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>samsoncsyuapple@gmail.com</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
/*

          <View style={{ width: 130, borderWidth: 5, borderColor: '#774400', borderRadius: 25}}>
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={['magenta', 'pink', 'pink', 'magenta']}
              style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}
            >
              <Text style={{ fontSize: 18 , color: "#774400", fontWeight: 700}}>Fraction</Text>
              <Text style={{ fontSize: 18 , color: "#774400", fontWeight: 700}}>Addition</Text>
              <Text style={{ fontSize: 18 , color: "#774400", fontWeight: 700}}>Subtraction</Text>
            </LinearGradient>
          </View>
*/

export default withTheme(MathsLearning);

const styles = StyleSheet.create({
  mathsLearningContainer: {
    margin: wp2dp('0.3%'),
    minHeight: hp2dp('97%'),
  },
  linearGradient: {
    margin: wp2dp('0.3%'),
    minHeight: hp2dp('97%'),
  },
  headingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scriptureVerseRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scriptureBorderWidth: {
    width: wp2dp('100%') < breakpoint ? wp2dp('97%') : wp2dp('82%'),
  },
  scriptureVerseBorder: {
    flexDirection: "row",
    alignItems: "center",
    width: wp2dp('100%') < breakpoint ? wp2dp('95%') : wp2dp('80%'),
    margin: wp2dp('1%'),
  },
  scriptureBgColor: {
    backgroundColor: theme.colors.myWhite,
  },
  scriptureImage: {
    height: wp2dp('100%') < breakpoint ? wp2dp('16%') : wp2dp('8%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('16%') : wp2dp('8%'),
    padding: wp2dp('0.5%'),
  },
  scriptureVerse: {
    width: wp2dp('100%') < breakpoint ? wp2dp('78%') : wp2dp('70%'),
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    color: theme.colors.myGreen,
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  prayerImage: {
    height: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('8%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('26%') : wp2dp('17%'),
    padding: wp2dp('0.5%'),
  },
  prayerText: {
    width: wp2dp('100%') < breakpoint ? wp2dp('70%') : wp2dp('65%'),
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    color: theme.colors.myGreen,
  },
  topMargin: {
    marginTop: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
  },
  emailText: {
    width: wp2dp('92%'),
    textAlign: "right",
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('3%') : wp2dp('1.5%'),
    color: theme.colors.myBrown,
    marginBottom: wp2dp('100%') < breakpoint ? wp2dp('15%') : wp2dp('0%'),
  },
  commonText: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('2.8%') : wp2dp('1.4%'),
    textAlign: "center",
  },
});
