import { Dimensions, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import Legend from './legend';

const LegendContainer = () => {
  return (
    <View style={styles.legendContainer}>
      <Legend {...{ name: 'Birch', color: theme.birch }} />
      <Legend {...{ name: 'Alder', color: theme.alder }} />
      <Legend {...{ name: 'Olive', color: theme.olive }} />
      <Legend {...{ name: 'Grass', color: theme.grass }} />
      <Legend {...{ name: 'Mugwort', color: theme.mugwort }} />
      <Legend {...{ name: 'Ragweed', color: theme.ragweed }} />
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: theme.darker,
    paddingVertical: 5,
  },
});

export default LegendContainer;
