import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { PollenResponse } from '../../interfaces/pollen-response';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { theme } from '../../theme';
import { PollenGraphProps } from './pollen-graph-props';

function hiddenIndexes(length: number): number[] {
  const indexes = [];
  for (let i = 0; i < length; i++) {
    if (i % 24 !== 0) {
      indexes.push(i);
    }
  }
  return indexes;
}

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: theme.dark,
  backgroundGradientTo: theme.dark,
  decimalPlaces: 0,
  color: () => theme.lightest,
  labelColor: () => theme.lightest,
  propsForDots: {
    r: '0',
  },
};

const getData = (response: PollenResponse): LineChartData => {
  return {
    labels: response.hourly.time.map((string) => format(parseISO(string), 'dd/MM')),
    datasets: [
      {
        data: response.hourly.birch_pollen.map((value) => value ?? 0),
        color: () => theme.birch,
      },
      {
        data: response.hourly.grass_pollen.map((value) => value ?? 0),
        color: () => theme.grass,
      },
      {
        data: response.hourly.alder_pollen.map((value) => value ?? 0),
        color: () => theme.alder,
      },
      {
        data: response.hourly.mugwort_pollen.map((value) => value ?? 0),
        color: () => theme.mugwort,
      },
      {
        data: response.hourly.olive_pollen.map((value) => value ?? 0),
        color: () => theme.olive,
      },
      {
        data: response.hourly.ragweed_pollen.map((value) => value ?? 0),
        color: () => theme.ragweed,
      },
    ],
  };
};

function PollenGraph(props: PollenGraphProps) {
  const [data, setData] = useState<LineChartData | undefined>();

  const width = Math.min(1200, Dimensions.get('window').width - 16);
  const height = (width * 9) / 16;

  const styles = StyleSheet.create({
    graphPlaceholder: {
      width: width,
      height: height,
      color: theme.lighter,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: theme.darker,
    },
    graphPlaceholderText: {
      color: theme.lighter,
    },
    location: {
      margin: 8,
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.lighter,
    },
  });

  const fetchData = async (): Promise<PollenResponse> => {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?` +
        `latitude=${props.latitude}&` +
        `longitude=${props.longitude}&` +
        `hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&` +
        `timezone=auto&` +
        `start_date=${props.startDate}&` +
        `end_date=${props.endDate}`
    );

    return (await res.json()) as PollenResponse;
  };
  useEffect(() => {
    const loadGraph = async () => {
      const response = await fetchData();
      const data: LineChartData = getData(response);
      setData(data);
    };

    loadGraph();
  }, []);

  return (
    <>
      <Text style={styles.location}>{props.location}</Text>
      {data ? (
        <LineChart
          data={data}
          width={width}
          height={height}
          yAxisSuffix="g/M³"
          yAxisInterval={24}
          chartConfig={chartConfig}
          fromZero={true}
          hidePointsAtIndex={hiddenIndexes(data.datasets[0].data.length)}
          bezier
          style={{
            borderRadius: 8,
          }}
        />
      ) : (
        <View style={styles.graphPlaceholder}>
          <Text style={styles.graphPlaceholderText}>Loading ...</Text>
        </View>
      )}
    </>
  );
}

export default PollenGraph;
