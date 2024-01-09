import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../pages/Home';
import Event from '../../pages/Event';
import Club from '../../pages/Club';
import { Image } from 'react-native';

const CustomHeader = () => (
  <Image
    source={require('../../../assets/images/logo.png')}
    style={{ width: 130, height: 60 }}
  />
);

const EventStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: (props) => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          headerShown: true,
          headerTitle: '이벤트',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Club"
        component={Club}
        options={{
          headerShown: true,
          headerTitle: '카테고리별 모임',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default EventStack;
