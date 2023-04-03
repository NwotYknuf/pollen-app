import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../theme';
import { LegendProps } from './legend-props';

const Legend = (props: LegendProps) => {
  return (
    <View style={styles.legend}>
      <View style={{ ...styles.square, backgroundColor: props.color }} />
      <Text style={styles.legendText}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  legend: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendText: {
    fontSize: 16,
    color: theme.lighter,
  },
  square: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
});

export default Legend;
