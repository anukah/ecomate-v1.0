import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import home from './../../assets/icons/home.png'
import history from './../../assets/icons/bookmark.png'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor:"#FFA001",
          tabBarInactiveTintColor:"#CDCDE0",
          tabBarStyle : {
            backgroundColor : "#161622",
            borderTopWidth:1,
            borderTopColor : "#232533",
            height:80
          }
        }}
      >
        <Tabs.Screen
          name="detail"
          options={{
            title: "Details",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={history}
                color={color}
                name="History"
                focused={focused}
              />
            ),
          }}
        />

        
      </Tabs>

    </>
  );
};

export default TabLayout;