import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { HomeStack } from './HomeStack'
import { SettingStack } from './SettingStack'
import ProfileStack  from './ProfileStack'

export default createAppContainer(createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={'home'} size={25} color={focused ? 'tomato' : 'gray'} />
                )
            }
        },
        Setting: {
            screen: SettingStack,
            navigationOptions: {
                tabBarLabel: 'Setting',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={'cog'} size={25} color={focused ? 'tomato' : 'gray'} />
                )
            }
        },
        Profile: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name={'user'} size={25} color={focused ? 'tomato' : 'gray'} />
                )
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
));