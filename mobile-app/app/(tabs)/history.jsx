import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../contaxt/GlobalProvider';
import ListItem from '../../components/ListItem';
import { getAllTestDocs } from '../../db/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { form } = useGlobalContext();

const fetchData = async () => {
  try {
    const result = await getAllTestDocs();

    const search = result.filter(data => data.vehicleNumber === form.vehicleNumber);

    search.sort((a, b) => {
      const dateA = a.time.toDate(); 
      const dateB = b.time.toDate(); 
      return dateB - dateA; 
    });

    setHistoryData(search);
    console.log("history data fetched");

  } catch (error) {
    console.error('Error fetching test history:', error.message);
    setHistoryData([]);
  }
};


  // Use useFocusEffect to fetch data when the tab is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [form.vehicleNumber]) 
  );

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); 
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text className="text-3xl text-secondary-200 font-psemibold my-8 text-center">
            Your Test History
          </Text>

          {historyData.length > 0 ? (
            historyData.map((data) => (
              <ListItem key={data.id} data={data} />
            ))
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#666', marginBottom: 20 }}>
                No test history found for this vehicle number.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default History;
