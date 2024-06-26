import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {width, height, DeviceHeight, DeviceWidth} from '../global';
import {apiServer} from '../utils/metaData';
import {RESTAPIBuilder} from '../utils/restapiBuilder';
import Clipboard from '@react-native-clipboard/clipboard';
import TranslateModal from './TranslateModal';
import Text from '@components/atoms/Text';
// import TranslateModal from './translateModal2';

const messageLongpressModal = ({
  isVisible,
  onClose,
  chatBubbleData,
  modalPosition,
  backgroundPosition,
  setBubbleData,
  isHost,
  setNotification,
}) => {
  const [isTranslateModalVisible, setTranslateModalVisible] = useState(false);
  const toggleTranslateModal = () => {
    setTranslateModalVisible(!isTranslateModalVisible);
  };

  const translate = ({source, target}) => {
    const url = `${apiServer}/translate`;
    const data = {
      source: source,
      target: target,
      text: chatBubbleData,
    };
    new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(data)
      .build()
      .run()
      .then(({data}) => {
        console.log(data);
        setBubbleData(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  ///////////////////////////// 에러 수정 이후 지울 예정
  const selectLanguages = () => {
    toggleTranslateModal();
  };
  ///////////////////////////// 에러 수정 이후 지울 예정

  const getAnimationIn = () => {
    return DeviceHeight / 2 >= backgroundPosition.y ? 'fadeInDown' : 'fadeInUp';
  };
  const getAnimationOut = () => {
    return DeviceHeight / 2 >= backgroundPosition.y
      ? 'fadeOutUp'
      : 'fadeOutDown';
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    onClose(0);
  };
  // 복사한 내용 쓸일 있을 경우 사용
  // const [copiedText, setCopiedText] = useState('');
  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getString();
  //   setCopiedText(text);
  // };

  return (
    <>
      <Modal
        style={{
          position: 'absolute',
          top: modalPosition.top,
          left: DeviceWidth - width * 180,
        }}
        backdropOpacity={0}
        isVisible={isVisible}
        animationInTiming={100}
        animationOutTiming={100}
        animationIn={getAnimationIn()}
        animationOut={getAnimationOut()}
        onBackdropPress={onClose}>
        <View
          style={{
            ...styles.modalContainer,
            height: isHost ? height * 90 : height * 60,
          }}>
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                copyToClipboard(chatBubbleData);
                // fetchCopiedText();
              }}>
              <Text style={styles.modalText}>복사하기</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                selectLanguages();
                onClose();
              }}>
              <Text style={styles.modalText}>번역하기</Text>
            </TouchableOpacity>
            {isHost && (
              <>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setNotification(chatBubbleData);
                    onClose();
                  }}>
                  <Text style={styles.modalText}>공지</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
      <TranslateModal
        isVisible={isTranslateModalVisible}
        onClose={toggleTranslateModal}
        translate={translate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    width: width * 150,
    height: height * 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#5F5F5F',
    borderWidth: 1.5,
  },
  separator: {
    borderBottomColor: '#8A8A8A',
    borderBottomWidth: 1,
    width: width * 150,
  },
  modalText: {
    textAlign: 'center',
    color: '#303030',
    fontWeight: '600',
    fontSize: height * 12,
  },
  modalButtonGroup: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: width * 150,
  },
  modalButton: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default messageLongpressModal;
