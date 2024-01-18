import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ClubDetail = ({ route, navigation }) => {
  const { selectedCategory } = route.params;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isJoined, setIsJoined] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleJoin = () => {
    setIsJoined((prev) => !prev);

    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 1500);
  };

  const navigateToReviewPage = () => {
    navigation.navigate('ReviewPage');
  };


  const renderJoinButton = () => {
    const buttonStyle = isJoined ? styles.cancelButton : styles.joinButton;
    const buttonText = isJoined ? '참여 취소' : '참여하기';

    return (
      <TouchableOpacity style={buttonStyle} onPress={toggleJoin}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  const image = {
    share: require('../../assets/images/share.png'),
    more: require('../../assets/images/more.png'),
    profile: require('../../assets/images/bori.png'),
    profileEx: require('../../assets/images/eclipse.png'),
    korean: require('../../assets/images/korean.png'),
    foreigner: require('../../assets/images/foreigner.png'),
    location: require('../../assets/images/location.png'),
  };

  const clubDescription =
    '우리 모임은 재미있는 활동과 교류를 통해 다양한 사람들을 만나는 공간입니다. 우리 모임은 재미있는 활동과 교류를 통해 다양한 사람들을 만나는 공간입니다. 우리 모임은 재미있는 활동과 교류를 통해 다양한 사람들을 만나는 공간입니다. 우리 모임은 재미있는 활동과 교류를 통해 다양한 사람들을 만나는 공간입니다.';
  const clubLocation = '상세 주소 예시';

  const clubData = {
    date: 'March 2',
    periodDate: 'Feb 28',
    location: 'Sinchon',
    languages: ['English', '한국어'],
    description: '우리 같이 재미있는 고급 영어 회화 배워봐요!',
    cost: '15,000원',
    gender: '누구나',
    image: require('../../assets/images/clubDetailImage.png'),
  };

  const renderSection = (title, text) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.roundedBox}>
        <Text style={styles.sectionText}>{text}</Text>
      </View>
    </View>
  );

  const renderQaItem = (nickname, text, dateTime) => (
    <View style={styles.qaItem}>
      <Image source={image.profileEx} style={styles.qaProfileImage} />
      <View style={styles.qaContent}>
        <Text style={styles.qaNickname}>{nickname}</Text>
        <Text style={styles.qaText}>{text}</Text>
        <Text style={styles.qaDateTime}>{dateTime}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#303030" />
          <Image source={image.share} style={styles.share} />
          <Image source={image.more} style={styles.more} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContent}>
        <Image source={clubData.image} style={styles.clubImage} />
      </View>
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{clubData.description}</Text>
        </View>

        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={25}
            color="#58C047"
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likeCount}</Text>

        <Text style={styles.sectionTitle}>카테고리</Text>
        <Text style={styles.sectionText}>{selectedCategory}</Text>

        <View style={styles.sectionContainer}>
          {renderSection('모임 날짜', clubData.date)}
          {renderSection('모임 마감', clubData.periodDate)}
          {renderSection('인당 예상비용', clubData.cost)}
          {renderSection('성별', clubData.gender)}
          {renderSection('장소', clubData.location)}
        </View>

        <View style={styles.hostContainer}>
          <Text style={styles.hostTitle}>호스트 정보</Text>
          <Text style={styles.hostText}>참가 인원</Text>
          <View style={styles.profileContainer}>
            <Image source={image.profile} style={styles.profileImage} />
            <Text style={styles.profileText}>보리캔따개</Text>
            <View style={styles.participantContainer}>
              <View style={styles.participantItem}>
                <Image source={image.korean} style={styles.participantImage} />
                <Text style={styles.participantText}>2</Text>
              </View>
              <View style={styles.participantItem}>
                <Image
                  source={image.foreigner}
                  style={styles.participantImage}
                />
                <Text style={styles.participantText}>1</Text>
              </View>
              <View style={styles.limitItem}>
                <Text style={styles.limitText}>모집 인원</Text>
                <Text style={styles.participantText}>5</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.clubInfoContainer}>
          <Text style={styles.clubInfoTitle}>모임 소개</Text>
          <Text style={styles.clubInfoText}>{clubDescription}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.clubInfoTitle}>장소</Text>
          <Text style={styles.clubLocationText}>{clubLocation}</Text>
          <Image source={image.location} style={styles.locationImage} />
        </View>

        <View style={styles.qaContainer}>
          <Text style={styles.clubInfoTitle}>Q&A</Text>
          {renderQaItem(
            '닉네임',
            '안녕하세요, 구체적인 일정 알 수 있을까요?',
            '2024.01.16 14:30'
          )}
          {renderQaItem(
            '닉네임',
            '안녕하세요, 구체적인 일정 알 수 있을까요?',
            '2024.01.15 18:45'
          )}
          <TouchableOpacity onPress={() => /* Navigate to full Q&A list */ null}>
            <Text style={styles.seeAllButton}>Q&A 모두 보기 ></Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.clubInfoTitle}>후기</Text>
          {renderQaItem(
            '닉네임',
            '다양한 외국인 친구들과 영어로 대화할 수 있어서 너무 좋았어요 ! 다음에 또 참가하고싶습니다♥ 방장님도 너무 친절하시고 어쩌고 넘 ...',
            '2024.01.15 18:45'
          )}
           <TouchableOpacity onPress={navigateToReviewPage}>
            <Text style={styles.seeAllButton}>후기 모두 보기 ></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.joinContainer}>
        {renderJoinButton()}
      </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}><Text style={styles.green}>참여 신청</Text>이 완료되었습니다!</Text>

          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  clubImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  share: {
    marginLeft: 340,
    marginTop: -25,
  },
  more: {
    marginLeft: 380,
    marginTop: -25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
  },
  imageContent: {
    top: 50,
  },
  content: {
    padding: 10,
  },
  titleText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#303030',
    marginTop: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  section: {
    width: '48%',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  roundedBox: {
    backgroundColor: '#F0F0F0',
    width: 70,
    height: 30,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: -25,
    flexWrap: 'nowrap',
    marginLeft: 100,
  },
  sectionTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionText: {
    fontSize: 11,
    color: '#303030',
    marginTop: 7,
  },
  likeCount: {
    fontSize: 16,
    marginLeft: 30,
    marginTop: -27,
    color: '#303030',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  heartIcon: {
    marginLeft: 0,
  },
  hostContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 20,
  },
  hostTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  participantText: {
    fontSize: 14,
    color: '#303030',
    marginLeft: 7,
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 14,
    color: '#303030',
    marginLeft: 20,
    marginTop: -7,
    marginRight: 90,
    fontWeight: 'bold',
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -60,
  },
  hostText: {
    color: '#303030',
    fontSize: 14,
    marginLeft: 330,
    marginTop: -30,
  },
  limitText: {
    color: '#303030',
    fontSize: 14,
    marginLeft: -37,
  },
  participantInfo: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  limitItem: {
    marginLeft: -17,
    marginTop: 100,
    color: '#303030',
  },
  clubInfoContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  clubInfoTitle: {
    color: '#303030',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clubInfoText: {
    color: '#303030',
    fontSize: 14,
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    padding: 15,
  },
  locationContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 15,
  },
  clubLocationText: {
    color: '#D9D9D9',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 15,
    padding: 15,
    width: 326,
    marginBottom: 20,
    marginLeft: 30,
  },
  locationImage: {
    marginLeft: 30,
    marginBottom: 20,
  },
  qaContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  qaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  qaProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginTop: -15,
  },
  qaContent: {
    flex: 1,
  },
  qaText: {
    fontSize: 13,
    color: '#303030',
    marginBottom: 5,
  },
  qaDateTime: {
    fontSize: 12,
    color: '#888888',
  },
  qaNickname: {
    fontSize: 14,
    color: '#303030',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  seeAllButton: {
    fontSize: 14,
    color: '#303030',
    marginBottom: 15,
  },
  reviewContainer:{
    marginTop: 20,
  },
  joinButton: {
    width: 110,
    height: 50,
    backgroundColor: '#58C047',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    width: 110,
    height: 50,
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  joinContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 60,
    width: 300,
    padding: 50,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#303030',
  },
  green: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#58C047',
  },
});
export default ClubDetail;