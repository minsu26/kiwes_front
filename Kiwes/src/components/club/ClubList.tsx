import React from 'react';
import {Image, View, Modal, StyleSheet, Pressable} from 'react-native';
import Text from '@components/atoms/Text';
import {height, width} from '../../global';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  allCategoryList as categories,
  categoryIcon,
  langList,
} from '../../utils/utils';
import {useState} from 'react';
import {apiServer} from '../../utils/metaData';
import {RESTAPIBuilder} from '../../utils/restapiBuilder';
import {BoardPost} from '../../utils/commonInterface';
import BoardDefaultList from '../BoardDefaultList';

export default function ClubList({navigation, selectedItem, type}: any) {
  const [selected, setSelected] = useState(selectedItem);
  const [modalVisible, setModalVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [data, setData] = useState<BoardPost[]>([]);

  const renderItems = () => {
    if (type === 'category') return renderCategories();
    else if (type === 'language') return renderLangagues();
  };

  const renderLangagues = () => {
    return langList.map(lang => (
      <TouchableOpacity
        key={`language_${lang.key}`}
        style={[
          styles.categoryItem,
          lang.key === selected ? styles.selectedCategory : null,
        ]}
        onPress={() => setSelected(lang.key)}>
        <Text
          style={[
            lang.key === selected ? styles.selectedText : {color: '#303030'},
            styles.scrollText,
          ]}>
          {lang.text}
        </Text>
      </TouchableOpacity>
    ));
  };
  const renderCategories = () => {
    return categories.map(category => (
      <TouchableOpacity
        key={`category_${category.key}`}
        style={[
          styles.categoryItem,
          category.key === selected ? styles.selectedCategory : null,
          styles.scrollText,
        ]}
        onPress={() => setSelected(category.key)}>
        {category.key !== 'ALL' && (
          <Image
            resizeMode="contain"
            source={categoryIcon[category.key]}
            style={styles.image}
          />
        )}
        <Text
          style={[
            category.key === selected
              ? styles.selectedText
              : {color: '#303030'},
          ]}>
          {category.simple}
        </Text>
      </TouchableOpacity>
    ));
  };

  const navigateToClub = (clubId: any) => {
    navigation.navigate('ClubDetail', {clubId});
  };

  const fetchCategory = (cursor: number) => {
    if (selected === 'ALL') {
      return getAllClub(cursor);
    } else {
      return getSpecifiedClub(cursor);
    }
  };
  const getAllClub = async (cursor: number) => {
    const url = `${apiServer}/api/v1/club/getClubs?cursor=${cursor}`;
    const {data} = await new RESTAPIBuilder(url, 'GET')
      .setNeedToken(true)
      .build()
      .run()
      .catch(err => console.error('get All club : ', err));
    setData(data);
    console.log(data);
    return data;
  };
  const getSpecifiedClub = async (cursor: number) => {
    const url = `${apiServer}/api/v1/club/category?cursor=${cursor}`;
    const postData = {sortedBy: [selected]};
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(postData)
      .build()
      .run()
      .catch(error => {
        console.error('get Specified club - catgory : ', error);
      });
    console.log(data);
    setData(data);
    return data;
  };
  const fetchLanguage = async (cursor: number) => {
    const postData = {sortedBy: [selected]};
    const url = `${apiServer}/api/v1/club/language?cursor=${cursor}`;
    const {data} = await new RESTAPIBuilder(url, 'POST')
      .setNeedToken(true)
      .setBody(postData)
      .build()
      .run()
      .catch(error => {
        console.error('get Specified club - language: ', error);
      });
    setData(data);
    return data;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.addButtonContainer}>
          <Image
            source={require('../../../assets/images/categoryAdd.png')}
            style={styles.addButton}
          />
        </TouchableOpacity>

        <View style={styles.scrollView}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}>
            {renderItems()}
          </ScrollView>
        </View>
      </View>
      <BoardDefaultList
        fetchData={type === 'category' ? fetchCategory : fetchLanguage}
        data={data}
        selected={selected}
        navigateToClub={navigateToClub}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal closed');
          setModalVisible(false);
        }}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                console.log('close button');
                setModalVisible(false);
              }}>
              {type === 'category' ? (
                <Text style={styles.selectionText}>카테고리 선택</Text>
              ) : (
                <Text style={styles.selectionText}>언어 선택</Text>
              )}
              <Image source={require('../../../assets/images/close.png')} />
            </Pressable>
            <View style={styles.modalCategoriesContainer}>
              <FlatList
                data={type == 'category' ? categories : langList}
                onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
                renderItem={({item}) => (
                  <View style={{width: containerWidth / 2}}>
                    {item.key === selected ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            styles.modalCategoryText,
                            styles.modalCategorySelectedText,
                          ]}>
                          {item.simple}
                        </Text>
                        <Image
                          source={require('../../../assets/images/check.png')}
                          style={styles.checkImage}
                        />
                      </View>
                    ) : (
                      <Pressable
                        key={item.key}
                        onPress={() => {
                          setSelected(item.key);
                          setModalVisible(false);
                        }}>
                        <Text style={styles.modalCategoryText}>
                          {item.simple}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                )}
                numColumns={2}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
  },
  alarm: {
    marginRight: 10,
  },
  addButton: {
    left: width * -11,
    top: height * 16,
    width: width * 28,
    height: height * 28,
  },
  addButtonContainer: {
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  scrollContainer: {
    paddingBottom: height * 10,
    height: height * 50,
    marginTop: height * 10,
  },
  scrollView: {
    paddingLeft: width * 40,
  },
  lastNewCategoryItem: {
    marginRight: width * 20,
  },
  categoryItem: {
    paddingHorizontal: height * 20,
    paddingVertical: width * 10,
    marginHorizontal: height * 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9BD23C',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  categoryText: {
    fontSize: height * 12,
    color: '#303030',
  },
  scrollText: {
    fontWeight: '300',
    fontSize: height * 13,
  },
  selectedCategory: {
    backgroundColor: '#9BD23C',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: height * 15,
  },
  modalCategoryText: {
    paddingVertical: height * 18,
    paddingLeft: width * 30,
    fontSize: height * 17,
    fontWeight: '500',
    color: '#8A8A8A',
  },
  modalCategorySelectedText: {
    color: '#000',
  },
  selectionText: {
    marginTop: height * 15,
    fontSize: height * 13,
    color: '#000',
  },
  modalCategory: {
    fontSize: 16,
    marginBottom: 50,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 30,
    justifyContent: 'space-between',
  },
  checkImage: {
    width: width * 15,
    height: height * 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 30,
  },
  modalCategoriesContainer: {
    marginTop: height * 20,
    marginBottom: height * 40,
    paddingHorizontal: width * 10,
  },
  image: {
    marginRight: width * 3,
    width: width * 16,
    height: width * 16,
  },
});
