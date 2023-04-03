import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import PollenGraph from '../graph/pollen-graph';
import { theme } from '../../theme';
import { addDays, format } from 'date-fns';
import LegendContainer from '../legend/legendContainer';

export default function MainScreen() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayPlusFive = format(addDays(new Date(), 4), 'yyyy-MM-dd');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <PollenGraph
          {...{ latitude: 49.12, longitude: 6.17, startDate: today, endDate: todayPlusFive, location: 'Metz' }}
        />
        <PollenGraph
          {...{ latitude: 48.68, longitude: 6.18, startDate: today, endDate: todayPlusFive, location: 'Nancy' }}
        />
        <PollenGraph
          {...{ latitude: 48.3, longitude: 4.05, startDate: today, endDate: todayPlusFive, location: 'Troyes' }}
        />
        <PollenGraph
          {...{ latitude: 43.7, longitude: 7.27, startDate: today, endDate: todayPlusFive, location: 'Nice' }}
        />
      </ScrollView>
      <LegendContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.darkest,
  },
  scrollView: {
    alignItems: 'center',
    paddingBottom: 10,
    width: Dimensions.get('window').width,
  },
});
